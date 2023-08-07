import { getDividends } from "./dividends";
import fs from "fs";
import path from "path";

describe("Dividends feature", () => {
  const mockXmlData = fs.readFileSync(
    path.join(__dirname, "/mocks/dividends.xml"),
    "utf-8"
  );

  it.only("should map data correctly", async () => {
    const fetchFlexStatmentData = async () => mockXmlData;
    const dividends = await getDividends({
      fetchStatmentData: fetchFlexStatmentData,
    })("", "");

    expect(dividends).toEqual([
      {
        exDate: new Date("2023-02-10T00:00:00.000Z"),
        payDate: new Date("2023-02-16T00:00:00.000Z"),
        symbol: "AAPL",
        netAmount: 5.59,
        fee: 0,
        grossAmount: 6.21,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-02-10T00:00:00.000Z"),
        payDate: new Date("2023-02-16T00:00:00.000Z"),
        symbol: "AAPL",
        netAmount: -5.59,
        fee: 0,
        grossAmount: -6.21,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-05-12T00:00:00.000Z"),
        payDate: new Date("2023-05-18T00:00:00.000Z"),
        symbol: "AAPL",
        netAmount: 5.83,
        fee: 0,
        grossAmount: 6.48,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-02-16T00:00:00.000Z"),
        payDate: new Date("2023-03-06T00:00:00.000Z"),
        symbol: "ATO",
        netAmount: -2.66,
        fee: 0,
        grossAmount: -2.96,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-05-19T00:00:00.000Z"),
        payDate: new Date("2023-06-05T00:00:00.000Z"),
        symbol: "ATO",
        netAmount: 2.66,
        fee: 0,
        grossAmount: 2.96,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-05-19T00:00:00.000Z"),
        payDate: new Date("2023-06-05T00:00:00.000Z"),
        symbol: "ATO",
        netAmount: -2.66,
        fee: 0,
        grossAmount: -2.96,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-03-21T00:00:00.000Z"),
        payDate: new Date("2023-03-31T00:00:00.000Z"),
        symbol: "AVGO",
        netAmount: 8.28,
        fee: 0,
        grossAmount: 9.2,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-03-21T00:00:00.000Z"),
        payDate: new Date("2023-03-31T00:00:00.000Z"),
        symbol: "AVGO",
        netAmount: -8.28,
        fee: 0,
        grossAmount: -9.2,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-06-21T00:00:00.000Z"),
        payDate: new Date("2023-06-30T00:00:00.000Z"),
        symbol: "AVGO",
        netAmount: 8.28,
        fee: 0,
        grossAmount: 9.2,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-06-21T00:00:00.000Z"),
        payDate: new Date("2023-06-30T00:00:00.000Z"),
        symbol: "AVGO",
        netAmount: -8.28,
        fee: 0,
        grossAmount: -9.2,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-03-06T00:00:00.000Z"),
        payDate: new Date("2023-03-23T00:00:00.000Z"),
        symbol: "BLK",
        netAmount: 4.5,
        fee: 0,
        grossAmount: 5,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-03-06T00:00:00.000Z"),
        payDate: new Date("2023-03-23T00:00:00.000Z"),
        symbol: "BLK",
        netAmount: -4.5,
        fee: 0,
        grossAmount: -5,

        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
      {
        exDate: new Date("2023-06-07T00:00:00.000Z"),
        payDate: new Date("2023-06-23T00:00:00.000Z"),
        symbol: "BLK",
        netAmount: 4.5,
        fee: 0,
        grossAmount: 5,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      },
    ]);
  });
});
