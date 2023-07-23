import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getDividends } from "./features/dividends";

type Bindings = {
  INTERACTIVE_BROKERS_FLEX_DIVIDENDS_QUERY_ID: string;
  INTERACTIVE_BROKERS_FLEX_WEB_TOKEN: string;
};
type MyEnv = {
  Bindings: Bindings;
};
const app = new Hono<MyEnv>();

app.get("/dividends", async (c) => {
  const dividens = await getDividends(
    c.env.INTERACTIVE_BROKERS_FLEX_WEB_TOKEN,
    c.env.INTERACTIVE_BROKERS_FLEX_DIVIDENDS_QUERY_ID
  );

  return c.json(dividens);
});

app.notFound(() => {
  throw new HTTPException(404, { message: "Not found" });
});

export default app;
