// @flow
import { useEffect, useState, useCallback } from "react";
import AsyncStorage from "@react-native-community/async-storage";

const rawURL =
  "https://raw.githubusercontent.com/LedgerHQ/ledger-live-mobile/master/TERMS.md";
export const url =
  "https://github.com/LedgerHQ/ledger-live-mobile/blob/master/TERMS.md";

// @TODO fill in the condition terms
export const LendingUrl = "";

const currentTermsRequired = "2019-12-04";
const currentLendingTermsRequired = "2020-12-08";

export async function isAcceptedTerms() {
  const acceptedTermsVersion = await AsyncStorage.getItem(
    "acceptedTermsVersion",
  );
  return acceptedTermsVersion === currentTermsRequired;
}

export async function acceptTerms() {
  await AsyncStorage.setItem("acceptedTermsVersion", currentTermsRequired);
}

export async function isAcceptedLendingTerms() {
  const acceptedLendingTermsVersion = await AsyncStorage.getItem(
    "acceptedLendingTermsVersion",
  );
  return acceptedLendingTermsVersion === currentLendingTermsRequired;
}

export async function acceptLendingTerms() {
  await AsyncStorage.setItem(
    "acceptedLendingTermsVersion",
    currentLendingTermsRequired,
  );
}

export async function load() {
  const r = await fetch(rawURL);
  const markdown = await r.text();
  return markdown;
}

export const useTerms = () => {
  const [terms, setTerms] = useState(null);
  const [error, setError] = useState(null);

  const loadTerms = () => load().then(setTerms, setError);

  useEffect(() => {
    loadTerms();
  }, []);

  return [terms, error, loadTerms];
};

export const useTermsAccept = () => {
  const [accepted, setAccepted] = useState(true);

  const accept = useCallback(() => {
    acceptTerms().then(() => {
      setAccepted(true);
    });
  }, []);

  useEffect(() => {
    isAcceptedTerms().then(setAccepted);
  }, []);

  return [accepted, accept];
};
