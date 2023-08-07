import type { fetchFlexStatmentData } from "./interactiveBrokersApi";
import { parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";

type MyDividend = {
  exDate: Date;
  symbol: string;
  netAmount: number;
  currency: string;
  account: string;
  exchangeCode: string;
};

export const getDividends =
  (getData: typeof fetchFlexStatmentData) =>
  async (token: string, flexQueryId: string) => {
    try {
      const dividends = await getData(token, flexQueryId);

      const resultDividends: MyDividend[] = [];
      for (const dividend of dividends) {
        const myDividend: MyDividend = {
          exDate: zonedTimeToUtc(
            parse(
              dividend["@exDate"],
              "yyyyMMdd",
              new Date(),
            ),
            "UTC"
          ),
          symbol: dividend["@symbol"],
          netAmount: parseFloat(dividend["@netAmount"]),
          currency: "USD",
          account: "INTERACTIVE_BROKERS",
          exchangeCode: "US",
        };
        resultDividends.push(myDividend);
      }

      return resultDividends;
    } catch (e) {
      console.log(e);
    }
  };
