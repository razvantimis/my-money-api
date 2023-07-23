import { XMLParser } from "fast-xml-parser";

const parserXml = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix : "@"
});
/**
 * Fetch https://www.interactivebrokers.com/Universal/servlet/FlexStatementService.SendRequest?t=TOKEN&q=QUERY_ID&v=3
 * @param token
 * @param flexQueryId
 */
export async function getReferenceCodeFromFlexService(
  token: string,
  flexQueryId: string
): Promise<any> {
  const url = `https://www.interactivebrokers.com/Universal/servlet/FlexStatementService.SendRequest?t=${token}&q=${flexQueryId}&v=3`;
  const response = await fetch(url);
  const xmlData = await response.text();
  const jsonData = parserXml.parse(xmlData);

  if (jsonData.FlexStatementResponse?.Status !== "Success") {
    throw new Error("Failed to fetch reference code from Flex Service");
  }
  return jsonData.FlexStatementResponse?.ReferenceCode;
}

/**
 * Fetch statement data from https://www.interactivebrokers.com/Universal/servlet/FlexStatementService.GetStatement?q=REFERENCE_CODE&t=TOKEN&v=3
 * @param token
 * @param flexQueryId
 * @returns
 */
async function fetchFlexStatmentData(
  token: string,
  flexQueryId: string
): Promise<any> {
  const referenceCode = await getReferenceCodeFromFlexService(
    token,
    flexQueryId
  );
  const url = `https://www.interactivebrokers.com/Universal/servlet/FlexStatementService.GetStatement?q=${referenceCode}&t=${token}&v=3`;
  const response = await fetch(url);
  const xmlData = await response.text();
  const jsonData = parserXml.parse(xmlData);

  if (!jsonData.FlexQueryResponse?.FlexStatements) {
    throw new Error("Failed to fetch dividens data");
  }
  return jsonData.FlexQueryResponse.FlexStatements.FlexStatement;
}

type Dividend = {
  "@accountId": string;
  "@symbol": string;
  "@exDate": number;
  "@payDate": number;
  "@fee": number;
  "@netAmount": number;
  "#text": null | string;
};

type MyDividend = {
  // date: Date;
  // displayDate: string;
  symbol: string;
  netAmount: number;
  currency: string;
  account: string;
  exchangeCode: string;
};
export async function getDividends(token: string, flexQueryId: string) {
  try {
    const data = await fetchFlexStatmentData(token, flexQueryId);
    const dividends = data.OpenDividendAccruals
      .OpenDividendAccrual as Dividend[];

    const resultDividends: MyDividend[] = [];
    for (const dividend of dividends) {
      // const date = parseDate(dividend["@payDate"].toString(), "yyyyMMdd");
      const myDividend: MyDividend = {
        // date,
        // displayDate: formatDate(date, "yyyy-MM-dd"),
        symbol: dividend["@symbol"],
        netAmount: dividend["@netAmount"],
        currency: "USD",
        account: "INTERACTIVE_BROKERS",
        exchangeCode: "US",
      };
      resultDividends.push(myDividend);
    }
    // exelDividends.sort((a, b) => a.date.getTime() - b.date.getTime());

    return resultDividends;
  } catch (e) {
    console.log(e);
  }
}
