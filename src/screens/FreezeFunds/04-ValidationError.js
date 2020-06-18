/* @flow */
import React, { useCallback } from "react";
import { Linking } from "react-native";
import EStyleSheet from 'react-native-extended-stylesheet';
import SafeAreaView from "react-native-safe-area-view";
import { TrackScreen } from "../../analytics";
import colors from "../../colors";
import { urls } from "../../config/urls";
import ValidateError from "../../components/ValidateError";

const forceInset = { bottom: "always" };

type Props = {
  navigation: any,
  route: { params: RouteParams },
};

type RouteParams = {
  accountId: string,
  deviceId: string,
  transaction: any,
  error: Error,
};

export default function ValidationError({ navigation, route }: Props) {
  const onClose = useCallback(() => {
    navigation.dangerouslyGetParent().pop();
  }, [navigation]);

  const contactUs = useCallback(() => {
    Linking.openURL(urls.contact);
  }, []);

  const retry = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <SafeAreaView style={styles.root} forceInset={forceInset}>
      <TrackScreen category="FreezeFunds" name="ValidationError" />
      <ValidateError
        error={route.params.error}
        onRetry={retry}
        onClose={onClose}
        onContactUs={contactUs}
      />
    </SafeAreaView>
  );
}

const styles = EStyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});
