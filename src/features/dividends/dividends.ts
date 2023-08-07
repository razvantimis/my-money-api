import type { fetchFlexStatmentData } from "../interactiveBrokersApi";
import { parse } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import parseDividends from "./parseDividends";

type MyDividend = {
  exDate: Date;
  payDate: Date;
  symbol: string;
  netAmount: number;
  grossAmount: number;
  currency: string;
  account: string;
  exchangeCode: string;
  fee: number;
};

type ExternalApi = {
  fetchStatmentData: typeof fetchFlexStatmentData;
};

export const getDividends =
  ({ fetchStatmentData }: ExternalApi) =>
  async (token: string, flexQueryId: string) => {
    const xmlData = await fetchStatmentData(token, flexQueryId);
    const dividends = parseDividends(xmlData);

    const resultDividends: MyDividend[] = [];
    for (const dividend of dividends) {
      const exDate = parse(dividend["@exDate"], "yyyyMMdd", new Date());
      const payDate = parse(dividend["@payDate"], "yyyyMMdd", new Date());
      const myDividend: MyDividend = {
        exDate: zonedTimeToUtc(exDate, "UTC"),
        payDate: zonedTimeToUtc(payDate, "UTC"),
        symbol: dividend["@symbol"],
        netAmount: parseFloat(dividend["@netAmount"]),
        grossAmount: parseFloat(dividend["@grossAmount"]),
        fee: parseFloat(dividend["@fee"]),
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      };
      resultDividends.push(myDividend);
    }
    return resultDividends;
  };
