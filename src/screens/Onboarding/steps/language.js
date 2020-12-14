// @flow

import React, { useCallback, useState } from "react";
import { StyleSheet, View, SafeAreaView, TouchableOpacity } from "react-native";
import { Trans, useTranslation } from "react-i18next";
import i18next from "i18next";
import { TrackScreen } from "../../../analytics";
import Button from "../../../components/Button";
import colors from "../../../colors";
import LText from "../../../components/LText";
import CheckBox from "../../../components/CheckBox";
import { useLocale } from "../../../context/Locale";
import { localeIds } from "../../../languages";
import { ScreenName } from "../../../const";
import ConfirmationModal from "../../../components/ConfirmationModal";
import Warning from "../../../icons/Warning";

const languages = {
  en: "English",
  fr: "Français",
  es: "Español",
  zh: "中文",
  ru: "Pусский",
};

function OnboardingStepLanguage({ navigation }: *) {
  const { t } = useTranslation();
  const next = useCallback(() => {
    navigation.navigate(ScreenName.OnboardingTermsOfUse);
  }, [navigation]);
  const { locale: currentLocale } = useLocale();

  const [isInfoModalOpen, setInfoModalOpen] = useState("");

  const onCloseInfoModal = useCallback(() => setInfoModalOpen(""), []);
  const onConfirmInfo = useCallback(() => {
    onCloseInfoModal();
    next();
  }, [onCloseInfoModal, next]);

  const changeLanguage = useCallback(
    l => {
      i18next.changeLanguage(l);
      if (l !== "en") {
        setInfoModalOpen(l);
      }
    },
    [setInfoModalOpen],
  );

  return (
    <SafeAreaView style={[styles.root, { backgroundColor: colors.white }]}>
      <View style={[styles.wrapper]}>
        <TrackScreen category="Onboarding" name="Language" />
        <LText semiBold style={styles.title}>
          <Trans i18nKey="onboarding.stepLanguage.title" />
        </LText>
        <View style={styles.localeContainer}>
          {localeIds.map((l, index) => (
            <TouchableOpacity
              key={index + l}
              onPress={() => changeLanguage(l)}
              style={[
                styles.localeButton,
                {
                  borderColor: l === currentLocale ? colors.live : colors.fog,
                },
              ]}
            >
              <CheckBox isChecked={l === currentLocale} />
              <LText semiBold style={styles.localeButtonLabel}>
                {languages[l]}
              </LText>
            </TouchableOpacity>
          ))}
        </View>
        <Button
          event="Onboarding - Language confirm"
          type="primary"
          onPress={next}
          title={<Trans i18nKey="onboarding.stepLanguage.cta" />}
        />
      </View>
      <ConfirmationModal
        isOpened={!!isInfoModalOpen}
        onClose={onCloseInfoModal}
        onConfirm={onConfirmInfo}
        confirmationTitle={
          <Trans i18nKey="onboarding.stepLanguage.warning.title" />
        }
        confirmationDesc={
          <Trans i18nKey="onboarding.stepLanguage.warning.desc" />
        }
        Icon={Warning}
        confirmButtonText={
          <Trans i18nKey="onboarding.stepLanguage.warning.cta" />
        }
        hideRejectButton
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
  languageLabel: { fontSize: 10, marginRight: 8 },
  localeContainer: {
    flex: 1,
  },
  localeButton: {
    width: "100%",
    borderRadius: 4,
    borderWidth: 1,
    marginVertical: 8,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  localeButtonLabel: { fontSize: 18, marginLeft: 10 },
});

export default OnboardingStepLanguage;
