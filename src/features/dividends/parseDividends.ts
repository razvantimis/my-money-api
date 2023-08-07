import { XMLParser } from "fast-xml-parser";

const parserXml = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
});

export type IBKRDividend = {
  "@accountId": string;
  "@symbol": string;
  "@exDate": string;
  "@payDate": string;
  "@currency": string;
  "@quantity": string;
  "@fee": string;
  "@description": string;
  "@reportDate": string;
  "@netAmount": string;
  "@grossAmount": string;
};

const parseDividends = (xmlData: string) => {
  const jsonData = parserXml.parse(xmlData);

  if (!jsonData.FlexQueryResponse?.FlexStatements) {
    throw new Error("Failed to fetch flex statement data");
  }
  const statmentData = jsonData.FlexQueryResponse.FlexStatements.FlexStatement;
  return statmentData.ChangeInDividendAccruals
    .ChangeInDividendAccrual as IBKRDividend[];

};

export default parseDividends;