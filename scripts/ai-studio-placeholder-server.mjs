import { createServer } from "node:http";

const port = Number(process.env.PORT ?? 3000);
const host = process.env.HOST ?? "0.0.0.0";

createServer((_request, response) => {
  response.statusCode = 204;
  response.end();
}).listen(port, host);
