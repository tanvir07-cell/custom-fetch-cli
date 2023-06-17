import http from "node:http";
import fs from "node:fs/promises";

const DB_PATH = new URL("../db.json", import.meta.url);

export const server = http.createServer(async (req, res) => {
  if (req.url === "/") {
    try {
      const readFileJSON = await fs.readFile(DB_PATH, "utf-8");
      res.writeHead(200, { "content-type": "application/json" });
      res.end(readFileJSON);
    } catch (err) {
      console.log(err);
    }
  }
});

server.listen(4000, () => {
  console.log(`http://localhost:4000`);
});
