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
        grossAmount: 6.21,
        fee: 0,
        currency: "USD",
        quantity: 27,
        grossRate: 0.23,
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        tax: 0.62,
        description: "APPLE INC",
      },
      {
        exDate: new Date("2023-02-16T00:00:00.000Z"),
        payDate: new Date("2023-03-06T00:00:00.000Z"),
        symbol: "ATO",
        netAmount: 2.66,
        grossAmount: 2.96,
        fee: 0,
        currency: "USD",
        quantity: 4,
        grossRate: 0.74,
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        tax: 0.3,
        description: "ATMOS ENERGY CORP",
      },
      {
        exDate: new Date("2023-05-19T00:00:00.000Z"),
        payDate: new Date("2023-06-05T00:00:00.000Z"),
        symbol: "ATO",
        netAmount: 2.66,
        grossAmount: 2.96,
        fee: 0,
        currency: "USD",
        quantity: 4,
        grossRate: 0.74,
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        tax: 0.3,
        description: "ATMOS ENERGY CORP",
      },
      {
        exDate: new Date("2023-03-21T00:00:00.000Z"),
        payDate: new Date("2023-03-31T00:00:00.000Z"),
        symbol: "AVGO",
        netAmount: 8.28,
        grossAmount: 9.2,
        fee: 0,
        currency: "USD",
        quantity: 2,
        grossRate: 4.6,
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        tax: 0.92,
        description: "BROADCOM INC",
      },
      {
        exDate: new Date("2023-06-21T00:00:00.000Z"),
        payDate: new Date("2023-06-30T00:00:00.000Z"),
        symbol: "AVGO",
        netAmount: 8.28,
        grossAmount: 9.2, 
        fee: 0,
        currency: "USD",
        quantity: 2,
        grossRate: 4.6,
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        tax: 0.92,
        description: "BROADCOM INC",
      },
      {
        exDate: new Date("2023-03-06T00:00:00.000Z"),
        payDate: new Date("2023-03-23T00:00:00.000Z"),
        symbol: "BLK",
        netAmount: 4.5,
        grossAmount: 5,
        fee: 0,
        currency: "USD",
        quantity: 1,
        grossRate: 5,
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        tax: 0.5,
        description: "BLACKROCK INC",
      },
      {
        exDate: new Date("2023-06-01T00:00:00.000Z"),
        payDate: new Date("2023-06-30T00:00:00.000Z"),
        symbol: "PEP",
        netAmount: 13.66,
        grossAmount: 15.18,
        fee: 0,
        currency: "USD",
        quantity: 12,
        grossRate: 1.265,
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        tax: 1.52,
        description: "PEPSICO INC",
      },
    ]);
  });
});
