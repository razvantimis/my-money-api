import { XMLParser } from "fast-xml-parser";

export type IBKRDividend = {
  "@accountId": string;
  "@symbol": string;
  "@exDate": string;
  "@payDate": string;
  "@fee": string;
  "@netAmount": string;
  "#text"?: null | string;
};

const parserXml = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
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
export async function fetchFlexStatmentData(
  token: string,
  flexQueryId: string
): Promise<IBKRDividend[]> {
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
  const statmentData = jsonData.FlexQueryResponse.FlexStatements.FlexStatement;
  return statmentData.OpenDividendAccruals
    .OpenDividendAccrual as IBKRDividend[];
}
