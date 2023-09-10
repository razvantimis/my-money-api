import { XMLParser } from "fast-xml-parser";

const parserXml = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@",
});
/**
 * @link https://www.ibkrguides.com/reportingreference/reportguide/changeindividendaccruals_default.htm
 */
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
  "@isin": string;
  "@listingExchange": string;
  "@figi": string;
  /** The postings (with code Po) are done for new accrual additions to the account. 
   *  The reversals (with code Re) are done for the following three reasons: correction in dividend accruals, cancellation in dividend accrual, and reversal due to payout in cash. */
  "@code": "Po" | "Re" | "";
};

const parseDividends = (xmlData: string) => {
  const jsonData = parserXml.parse(xmlData);
  

  if(jsonData?.FlexStatementResponse?.Status && jsonData?.FlexStatementResponse?.Status !== "Success"){
    throw new Error(jsonData.FlexStatementResponse.ErrorMessage);
  }
  if (!jsonData.FlexQueryResponse?.FlexStatements) {
    throw new Error("Failed to fetch flex statement data");
  }

  const statmentData = jsonData.FlexQueryResponse.FlexStatements.FlexStatement;
  return statmentData.ChangeInDividendAccruals
    .ChangeInDividendAccrual as IBKRDividend[];

};

export default parseDividends;