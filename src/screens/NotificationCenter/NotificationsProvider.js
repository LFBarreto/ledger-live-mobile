// @flow
import React, { useCallback } from "react";
import { useSelector } from "react-redux";
import { AnnouncementProvider } from "@ledgerhq/live-common/lib/notifications/AnnouncementProvider";
import { ServiceStatusProvider } from "@ledgerhq/live-common/lib/notifications/ServiceStatusProvider";
import { useToasts } from "@ledgerhq/live-common/lib/notifications/ToastProvider/index";
import type { Announcement } from "@ledgerhq/live-common/lib/notifications/AnnouncementProvider/types";
import { getNotifications, saveNotifications } from "../../db";
import { useLocale } from "../../context/Locale";
import { cryptoCurrenciesSelector } from "../../reducers/accounts";
import { track } from "../../analytics";

type Props = {
  children: React$Node,
};

export default function NotificationsProvider({ children }: Props) {
  const { locale } = useLocale();
  const c = useSelector(cryptoCurrenciesSelector);
  const currencies = c.map(({ family }) => family);
  const { pushToast } = useToasts();

  const onLoad = useCallback(
    () =>
      getNotifications().then(dbData => {
        const {
          announcements = [],
          seenIds = [],
          lastUpdateTime = new Date().getTime(),
        } = dbData || {};
        return {
          announcements,
          seenIds,
          lastUpdateTime,
        };
      }),
    [],
  );

  const onSave = useCallback(
    ({ announcements, seenIds, lastUpdateTime }) =>
      saveNotifications({ announcements, seenIds, lastUpdateTime }),
    [],
  );

  const onNewAnnouncement = useCallback(
    (announcement: Announcement) => {
      const { uuid, content, icon, utm_campaign: utmCampaign } = announcement;

      track("Announcement Received", {
        uuid,
        utm_campaign: utmCampaign,
      });

      pushToast({
        id: uuid,
        type: "announcement",
        title: content.title,
        text: content.text,
        icon,
      });
    },
    [pushToast],
  );

  const onAnnouncementRead = useCallback(
    ({ uuid, utm_campaign: utmCampaign }) => {
      track("Announcement Viewed", {
        uuid,
        utm_campaign: utmCampaign,
      });
    },
    [],
  );

  return (
    <AnnouncementProvider
      autoUpdateDelay={15000}
      context={{
        language: locale,
        currencies,
        getDate: () => new Date(),
      }}
      handleLoad={onLoad}
      handleSave={onSave}
      onNewAnnouncement={onNewAnnouncement}
      onAnnouncementRead={onAnnouncementRead}
    >
      <ServiceStatusProvider autoUpdateDelay={15000}>
        {children}
      </ServiceStatusProvider>
    </AnnouncementProvider>
  );
}
