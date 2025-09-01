import { useEffect, useState } from "react";
import { Bank, Issuer } from "../types";

const UNIVERSAL_ISSUERS_NAMES = [
  "삼성카드",
  "현대카드",
  "롯데카드",
  "BC카드 (자체발급)",
];

const BANK_AFFILIATED_ISSUER_MAP: { [bankName: string]: string } = {
  신한은행: "신한카드",
  국민은행: "KB국민카드",
  우리은행: "우리카드",
  하나은행: "하나카드",
  농협은행: "NH농협카드",
  기업은행: "IBK기업은행",
  SC제일은행: "SC제일은행",
  케이뱅크: "케이뱅크",
  카카오뱅크: "카카오뱅크",
  토스뱅크: "토스뱅크",
  시티은행: "씨티은행",
  신협은행: "신협은행",
  수협은행: "수협은행",
  우체국: "우체국",
  전북은행: "전북은행",
  광주은행: "광주은행",
  부산은행: "부산은행",
  경남은행: "경남은행",
  대구은행: "대구은행",
  제주은행: "제주은행",
};

export function useFilteredIssuers(
  selectedBankId: string | null | undefined,
  allIssuers: Issuer[],
  allBanks: Bank[]
) {
  const [filteredIssuers, setFilteredIssuers] = useState<Issuer[]>([]);

  useEffect(() => {
    if (
      !selectedBankId ||
      !allBanks ||
      allBanks.length === 0 ||
      !allIssuers ||
      allIssuers.length === 0
    ) {
      setFilteredIssuers([]);
      return;
    }

    const selectedBank = allBanks.find((bank) => bank.id === selectedBankId);
    if (!selectedBank) {
      setFilteredIssuers([]);
      return;
    }

    const affiliatedIssuerName = BANK_AFFILIATED_ISSUER_MAP[selectedBank.name];

    const currentBankRelatedIssuers: Issuer[] = [];
    if (affiliatedIssuerName) {
      const issuer = allIssuers.find((i) => i.name === affiliatedIssuerName);
      if (issuer) {
        currentBankRelatedIssuers.push(issuer);
      }
    }

    const universalIssuerObjects = allIssuers.filter((issuer) =>
      UNIVERSAL_ISSUERS_NAMES.includes(issuer.name)
    );

    const combinedIssuersMap = new Map<string, Issuer>();
    currentBankRelatedIssuers.forEach((issuer) =>
      combinedIssuersMap.set(issuer.id, issuer)
    );
    universalIssuerObjects.forEach((issuer) =>
      combinedIssuersMap.set(issuer.id, issuer)
    );

    const finalFilteredList: Issuer[] = [];
    const addedIssuerIds = new Set<string>();

    currentBankRelatedIssuers.forEach((issuer) => {
      if (!addedIssuerIds.has(issuer.id)) {
        finalFilteredList.push(issuer);
        addedIssuerIds.add(issuer.id);
      }
    });

    universalIssuerObjects.forEach((issuer) => {
      if (!addedIssuerIds.has(issuer.id)) {
        finalFilteredList.push(issuer);
        addedIssuerIds.add(issuer.id);
      }
    });

    setFilteredIssuers(finalFilteredList);
  }, [selectedBankId, allIssuers, allBanks]);

  return filteredIssuers;
}
