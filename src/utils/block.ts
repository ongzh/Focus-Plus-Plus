import { BlockOptions } from "./storage";
import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
import ResourceType = chrome.declarativeNetRequest.ResourceType;

export type SiteInfo = {
  id: number;
  url: string;
};

export type SiteName =
  | "facebook"
  | "youtube"
  | "twitter"
  | "instagram"
  | "reddit"
  | "tiktok"
  | "whatsapp"
  | "messenger"
  | "telegram"
  | "discord"
  | "twitch"
  | "netflix"
  | "amazon"
  | "disneyplus";

export const defaultBlockOptions: BlockOptions = {
  facebook: false,
  youtube: false,
  twitter: false,
  instagram: false,
  reddit: false,
  tiktok: false,
  whatsapp: false,
  messenger: false,
  telegram: false,
  discord: false,
  twitch: false,
  netflix: false,
  amazon: false,
  disneyplus: false,
};

const blockedSites: Record<SiteName, SiteInfo> = {
  facebook: {
    id: 1,
    url: "facebook.com",
  },
  youtube: {
    id: 2,
    url: "youtube.com",
  },
  twitter: {
    id: 3,
    url: "twitter.com",
  },
  instagram: {
    id: 4,
    url: "instagram.com",
  },
  reddit: {
    id: 5,
    url: "reddit.com",
  },
  tiktok: {
    id: 6,
    url: "tiktok.com",
  },
  whatsapp: {
    id: 7,
    url: "whatsapp.com",
  },
  messenger: {
    id: 8,
    url: "messenger.com",
  },
  telegram: {
    id: 9,
    url: "telegram.com",
  },
  discord: {
    id: 10,
    url: "discord.com",
  },
  twitch: {
    id: 11,
    url: "twitch.com",
  },
  netflix: {
    id: 12,
    url: "netflix.com",
  },
  amazon: {
    id: 13,
    url: "amazon.com",
  },
  disneyplus: {
    id: 14,
    url: "disneyplus.com",
  },
};

export function addBlockedSite(site: SiteName) {
  const siteInfo = blockedSites[site];
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: [
        {
          action: {
            type: RuleActionType.BLOCK,
          },
          condition: {
            urlFilter: siteInfo.url, // block URLs that starts with this
            resourceTypes: [ResourceType.MAIN_FRAME], // block only main frame
          },
          id: siteInfo.id,
          priority: 1,
        },
      ],
      removeRuleIds: [siteInfo.id], // this removes old rule if any
    },
    () => {
      console.log("block " + siteInfo.url + " rule added");
    }
  );
}

export function removeBlockedSite(site: SiteName) {
  const siteInfo = blockedSites[site];
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [siteInfo.id], //invalid and non-existing rules will be ignored
    },
    () => {
      console.log("block " + siteInfo.url + " rule removed");
    }
  );
}
