import { Hono } from "hono";
import { HTTPException } from "hono/http-exception";
import { getDividends } from "./features/dividends/dividends";
import { fetchFlexStatmentData } from "./features/interactiveBrokersApi";
import { basicAuth } from "hono/basic-auth";

type Bindings = {
  INTERACTIVE_BROKERS_FLEX_DIVIDENDS_QUERY_ID: string;
  INTERACTIVE_BROKERS_FLEX_WEB_TOKEN: string;
  AUHT_BASIC_USERNAME: string;
  AUTH_BASIC_PASSWORD: string;
};
type MyEnv = {
  Bindings: Bindings;
};
const app = new Hono<MyEnv>();

app.use("*", (...params) => {
  return basicAuth({
    username: params[0].env.AUHT_BASIC_USERNAME,
    password: params[0].env.AUTH_BASIC_PASSWORD,
  })(...params);
});

app.get("/dividends", async (c) => {
  try {
    const dividens = await getDividends({
      fetchStatmentData: fetchFlexStatmentData,
    })(
      c.env.INTERACTIVE_BROKERS_FLEX_WEB_TOKEN,
      c.env.INTERACTIVE_BROKERS_FLEX_DIVIDENDS_QUERY_ID
    );
    return c.json(dividens);
  } catch (e) {
    throw new HTTPException(500, { message: (e as Error).message });
  }
});

app.notFound(() => {
  throw new HTTPException(404, { message: "Not found" });
});

export default app;
