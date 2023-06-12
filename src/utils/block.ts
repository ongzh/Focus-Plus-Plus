import { getStoredBlockOptions } from "./storage";
import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
import ResourceType = chrome.declarativeNetRequest.ResourceType;

export type SiteInfo = {
  id: number;
  url: string;
};

export type SiteName =
  | "amazon"
  | "discord"
  | "disneyplus"
  | "facebook"
  | "instagram"
  | "linkedin"
  | "messenger"
  | "netflix"
  | "reddit"
  | "telegram"
  | "tiktok"
  | "twitch"
  | "twitter"
  | "whatsapp"
  | "youtube";

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
  linkedin: {
    id: 15,
    url: "linkedin.com",
  },
};

export const defaultBlockOptions: BlockOptions = {
  amazon: false,
  discord: false,
  disneyplus: false,
  facebook: false,
  instagram: false,
  linkedin: false,
  messenger: false,
  netflix: false,
  reddit: false,
  telegram: false,
  tiktok: false,
  twitch: false,
  twitter: false,
  whatsapp: false,
  youtube: false,
};

export type BlockOptions = {
  facebook: boolean;
  youtube: boolean;
  twitter: boolean;
  instagram: boolean;
  reddit: boolean;
  tiktok: boolean;
  whatsapp: boolean;
  messenger: boolean;
  telegram: boolean;
  discord: boolean;
  twitch: boolean;
  netflix: boolean;
  amazon: boolean;
  disneyplus: boolean;
  linkedin: boolean;
};

export function updateBlockOptions(
  prevOptions: BlockOptions,
  newOptions: BlockOptions
) {
  for (const site of Object.keys(newOptions) as SiteName[]) {
    if (prevOptions[site] !== newOptions[site]) {
      if (newOptions[site]) {
        addBlockedSite(site);
      } else {
        removeBlockedSite(site);
      }
    }
  }
}

export function activateBlockRules() {
  getStoredBlockOptions().then((blockOptions) => {
    for (const site of Object.keys(blockOptions) as SiteName[]) {
      if (blockOptions[site]) {
        addBlockedSite(site);
      } else {
        removeBlockedSite(site);
      }
    }
  });
}

export function resetBlockRules() {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], //invalid and non-existing rules will be ignored
    },
    () => {
      console.log("all rules removed");
    }
  );
}

function addBlockedSite(site: SiteName) {
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
      /*
      chrome.declarativeNetRequest.getDynamicRules((rules) => {
        console.log(rules);
      });
      console.log("block " + siteInfo.url + " rule added");
      */
    }
  );
}

function removeBlockedSite(site: SiteName) {
  const siteInfo = blockedSites[site];

  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [siteInfo.id], //invalid and non-existing rules will be ignored
    },
    () => {
      /*
      chrome.declarativeNetRequest.getDynamicRules((rules) => {
        console.log(rules);
      });
      console.log("block " + siteInfo.url + " rule removed");
      */
    }
  );
}
