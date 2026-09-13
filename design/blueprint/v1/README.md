# Design Blueprint v1

Tento adresář obsahuje autoritativní blueprint designu pro systém Táta má právo na platformě Synthesis.

## Co je blueprint
- Úplná strojově čitelná evidence (inventory) všech obrazovek, ploch a interakčních zón (D1).
- Specifikace vizuálního jazyka a tokenů (D2).
- Strukturální mapování ploch bez ohledu na finální technologii (React/Next.js/Native).
- Plán rozvoje pro System Mapu (každý design surface bude mít své místo v registru).

## Co blueprint NENÍ
- Nejde o runtime implementaci.
- Nejedná se o zdroj runtime obsahu (textů). Vlastnosti jako `workingNameCs` nebo `purposeCs` slouží pouze pro dokumentaci a designový kontext.
- Nejedná se o runtime CSS/Tailwind definice. Designové hodnoty se v runtime budou řídit Theme Enginem a sémantickými tokeny.

## Pravidla
- **Runtime text** se bude načítat dynamicky z CMS přes `contentKey`.
- **Runtime design** se aplikuje přes mapování na Theme Engine.
- **Technická IDs** (`screenId`, `moduleKey`, `appIdentity`) musí zůstat striktně jazykově neutrální (anglicky, lower-case, tečková notace).
- Hodnoty `legacyReference` slouží pouze jako referenční ukazatel na původní aplikace v repozitáři DEV3/dev3-archive a v žádném případě nesmí vést ke kopírování staré architektury.
- System Map se bude postupně plnit podle tohoto blueprintu (D9).
