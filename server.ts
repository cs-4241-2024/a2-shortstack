import { Application, Router } from "@oak/oak";
import { Handlebars } from "https://deno.land/x/handlebars/mod.ts";

const dinos = ["osaur", "T-Rex", "Deno"];
const handle = new Handlebars();
const router = new Router();

router.get("/", async (context) => {
  context.response.body = await handle.renderView("index", { dinos: dinos });
});

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: 3000 });
