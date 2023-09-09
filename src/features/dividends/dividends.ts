import type { fetchFlexStatmentData } from "../interactiveBrokersApi";
import { parse, isEqual, format } from "date-fns";
import { zonedTimeToUtc } from "date-fns-tz";
import parseDividends from "./parseDividends";

type MyDividend = {
  uuid: string;
  exDate: Date;
  payDate: Date;
  symbol: string;
  currency: string;
  account: string;
  exchangeCode: string;
  description: string;
  /** The tax amount associated with the dividend. */
  tax: number;
  /** The fee associated with the dividend. */
  fee: number;
  /** The quantity held prior to ex date. */
  quantity: number;
  /** The dividend per share. */
  grossRate: number;
  /** Gross Rate x Quantity. */
  grossAmount: number;
  /** Calculated by adding the tax and fee amounts and then subtracting it from the gross amount. */
  netAmount: number;
};

export function getUUID(dividend: Pick<MyDividend, "payDate" | "symbol" | "exchangeCode" | "account">) {
  return `${format(dividend.payDate, 'yyyy-MM-dd')}#${dividend.symbol}#${dividend.exchangeCode}#${dividend.account}`;
}

type ExternalApi = {
  fetchStatmentData: typeof fetchFlexStatmentData;
};
const exchangeCode = "US";
const account = "INTERACTIVE_BROKERS";
const currency = "USD";

export const getDividends =
  ({ fetchStatmentData }: ExternalApi) =>
  async (token: string, flexQueryId: string) => {
    const xmlData = await fetchStatmentData(token, flexQueryId);
    const dividends = parseDividends(xmlData);

    const resultDividends: MyDividend[] = [];
 
    for (const dividend of dividends) {
      // avoid duplicate dividends
      if (dividend["@date"] !== dividend["@payDate"]) {
        continue;
      }
      const exDate = parse(dividend["@exDate"], "yyyyMMdd", new Date());
      const payDate = parse(dividend["@payDate"], "yyyyMMdd", new Date());
      const myDividend: MyDividend = {
        uuid: getUUID({
          payDate,
          symbol: dividend["@symbol"],
          exchangeCode,
          account,
        }),
        exDate: zonedTimeToUtc(exDate, "UTC"),
        payDate: zonedTimeToUtc(payDate, "UTC"),
        symbol: dividend["@symbol"],
        netAmount: Math.abs(parseFloat(dividend["@netAmount"])),
        grossAmount: Math.abs(parseFloat(dividend["@grossAmount"])),
        fee: parseFloat(dividend["@fee"]),
        currency,
        quantity: parseFloat(dividend["@quantity"]),
        grossRate: parseFloat(dividend["@grossRate"]),
        account,
        exchangeCode,
        tax: Math.abs(parseFloat(dividend["@tax"])),
        description: dividend["@description"],
      };
      resultDividends.push(myDividend);
    }
    const sortedDividends = resultDividends.sort((a, b) => a.payDate.getTime() - b.payDate.getTime());


    return sortedDividends;
  };
