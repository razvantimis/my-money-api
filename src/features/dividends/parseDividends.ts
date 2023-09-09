import { XMLParser } from "fast-xml-parser";

const parserXml = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
});

export type IBKRDividend = {
  "@accountId": string;
  "@symbol": string;
  "@date": string;
  "@exDate": string;
  "@payDate": string;
  "@currency": string;
  "@quantity": string;
  "@fee": string;
  "@description": string;
  "@reportDate": string;
  "@netAmount": string;
  "@grossAmount": string;
  "@grossRate": string;
  "@tax": string;
};

const parseDividends = (xmlData: string) => {
  const jsonData = parserXml.parse(xmlData);
  
  console.log(jsonData);

  if(jsonData?.FlexStatementResponse?.Status && jsonData?.FlexStatementResponse?.Status !== "Success"){
    throw new Error(jsonData.FlexStatementResponse.ErrorMessage);
  }
  if (!jsonData.FlexQueryResponse?.FlexStatements) {
    throw new Error("Failed to fetch flex statement data");
  }

  console.log(jsonData.FlexQueryResponse.FlexStatements)
  const statmentData = jsonData.FlexQueryResponse.FlexStatements.FlexStatement;
  return statmentData.ChangeInDividendAccruals
    .ChangeInDividendAccrual as IBKRDividend[];

};

export default parseDividends;