# Synthesis System Map

## Účel
System Map slouží jako machine-readable registry (strojově čitelný registr) všech významných systémových a UI prvků. Umožňuje plnou zpětnou dohledatelnost a transparentní audit celého systému.

Tento registr je definován jako verzovaný kontrakt.

## System Map Target Chain
Architektura dohledatelnosti:
Project
→ App Identity
→ Route
→ Surface
→ Region
→ Component
→ Element
→ Action
→ Module
→ Permission
→ API/Event/Job
→ Data Owner
→ Test

## Základní Invarianty
- **Technický Source-of-Truth:** Tento repozitář je primárním technickým zdrojem pravdy. Notion je pouze index/souhrn projektu, nikoliv technická databáze.
- **Lokalizace:** Výchozí (default) locale produktu je `cs-CZ`.
- **Identifikátory:** Technické IDs jsou stabilní a jazykově neutrální (language-neutral). Nesmí obsahovat lokalizovaný text (např. nepoužívat `tlacitko-koupit`, ale `purchase.action.submit`).
- **Data-Driven Content:** Uživatelský text není hardkódován; používá se odkazování pomocí `contentKey` a `helpKey`.
- **Token/Asset-Driven Design:** Designové hodnoty (barvy, stíny, fonty) nejsou hardkódovány; odkazují se přes `themeTokens` a `assetRefs`.
- **Stav PLANNED:** Prvky se stavem `PLANNED` musí být "disabled-first" a nesmí vyžadovat běžící API route. Vynucují přítomnost `disabledReasonKey`.
- **Extensibility Seams (Audit / AI):** Integrace s auditem nebo AI probíhá výhradně referenčně pomocí `auditEventKey` a `aiToolKey`. Tím je zaručen volný coupling, takže nové implementace auditu/AI nepotřebují měnit Core systému.
- **Verzování Schema:** Jakákoliv breaking změna v tomto schématu vyžaduje vydání nové major verze a schválení pomocí ADR (Architecture Decision Record).

## Strict Contract Invariants
- Všechny kolekce (apps, routes, atd.) jsou plně typované.
- Každý objekt striktně zakazuje neznámá pole (`additionalProperties: false`).
- Defaultní locale je `cs-CZ`, ale seznam `supportedLocales` je v budoucnu rozšiřitelný.
- Blueprint může existovat ještě předtím, než má runtime definovanou konkrétní API routu (`path` a `sourcePath` mohou být volitelné v některých fázích).
- Objekty ve stavu `PLANNED` nemohou být `enabled`.
- Surové (raw) texty pro uživatele (label, displayText atd.) jsou v tomto schématu zakázané, aby System Map neobsahoval duplicitní obsah vůči CMS.
- Designové hodnoty (barvy v HEX, pixely, stíny) jsou v diesem schématu zakázány; odkazují se zásadně pomocí tokenů nebo referencí.
- Křížovou (cross-reference) integritu zajišťuje navazující proces (executable validator); JSON Schema řeší jen syntaxi a jednoduchá validační pravidla. Schema validace a referenční validace jsou navržené jako dvě různé vrstvy.
