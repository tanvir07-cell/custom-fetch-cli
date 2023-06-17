import yargs from "yargs";
import { hideBin } from "yargs/helpers";
import fetch from "node-fetch";
import fs from "node:fs/promises";
import { server } from "./server.js";
import chalk from "chalk";
import open from "open";

// ei khane yargs er sather hideBin process.argv ke array theke object e convert kore

yargs(hideBin(process.argv))
  .command(
    "get <url>",
    "fetch the contents of the URL",
    () => {},
    async (argv) => {
      const result = await fetch(argv.url);
      const response = await result.json();

      //   create a file:
      await fs.writeFile("./db.json", JSON.stringify(response));

      //   create a server:
      open("http://localhost:4000");
    }
  )
  .demandCommand(
    1,
    chalk.bold.red("You need at least one command before moving on")
  )
  .recommendCommands()
  .strict()
  .parse();
