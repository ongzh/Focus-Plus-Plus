import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
import ResourceType = chrome.declarativeNetRequest.ResourceType;

export type SiteInfo = {
  id: number;
  url: string;
};

export type SiteName = "facebook" | "youtube" | "twitter";

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
};

export function addBlockedSite(site: SiteInfo) {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      addRules: [
        {
          action: {
            type: RuleActionType.BLOCK,
          },
          condition: {
            urlFilter: site.url, // block URLs that starts with this
            resourceTypes: [ResourceType.MAIN_FRAME], // block only main frame
          },
          id: site.id,
          priority: 1,
        },
      ],
      removeRuleIds: [site.id], // this removes old rule if any
    },
    () => {
      console.log("block " + site.url + " rule added");
    }
  );
}

export function removeBlockedSite(site: SiteInfo) {
  chrome.declarativeNetRequest.updateDynamicRules(
    {
      removeRuleIds: [site.id], //invalid and non-existing rules will be ignored
    },
    () => {
      console.log("block " + site.url + " rule removed");
    }
  );
}
