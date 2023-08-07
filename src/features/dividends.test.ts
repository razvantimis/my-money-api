import { getDividends } from "./dividends";
import { IBKRDividend } from "./interactiveBrokersApi";

describe("Dividends feature", () => {
  const mockIBKRDividends: IBKRDividend[] = [
    {
      "@accountId": "U5451311",
      "@symbol": "ABBV",
      "@exDate": "20230713",
      "@payDate": "20230815",
      "@fee": "0",
      "@netAmount": "9.32",
    },
    {
      "@accountId": "U5451311",
      "@symbol": "AOS",
      "@exDate": "20230728",
      "@payDate": "20230815",
      "@fee": "0",
      "@netAmount": "1.08",
    },
  ];

  it.only("should map data correctly", async () => {
    const fetchFlexStatmentData = async () => mockIBKRDividends;
    const dividends = await getDividends(fetchFlexStatmentData)("", "");

    console.log(dividends![0]!.exDate.toISOString());
    expect(dividends).toEqual([
      {
        symbol: "ABBV",
        netAmount: 9.32,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        exDate: new Date("2023-07-13T00:00:00.000Z"),
      },
      {
        symbol: "AOS",
        netAmount: 1.08,
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
        exDate: new Date("2023-07-28T00:00:00.000Z"),
      },
    ]);
  });
});
