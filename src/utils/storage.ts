import { SiteName, resetBlockRules } from "./block";

export interface LocalStorage {
  timerStatus: LocalStorageTimerStatus;
}

export interface SyncStorage {
  options?: SyncStorageOptions;
  tasks?: string[];
  taskCompletionCount?: number;
  blockOptions?: BlockOptions;
}

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
};

export interface LocalStorageTimerStatus {
  isFocusing: boolean;
  isResting: boolean;
  timer: number;
  restTimer: number;
}

export interface SyncStorageOptions {
  focusTime: number;
  restTime: number;
  notifications: boolean;
}

export type LocalStorageKeys = keyof LocalStorage;
export type SyncStorageKeys = keyof SyncStorage;
export type BlockOptionsKeys = keyof BlockOptions;

export function getStoredTimerStatus(): Promise<LocalStorageTimerStatus> {
  const keys: LocalStorageKeys[] = ["timerStatus"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: LocalStorage) => {
      resolve(res.timerStatus);
    });
  });
}

export function setStoredTimerStatus(
  timerStatus: LocalStorageTimerStatus
): Promise<void> {
  const vals: LocalStorage = {
    timerStatus,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function setStorageOptions(options: SyncStorageOptions): Promise<void> {
  const vals: SyncStorage = {
    options,
  };

  return new Promise((resolve) => {
    chrome.storage.local.set(vals, () => {
      resolve();
    });
  });
}

export function getStorageOptions(): Promise<SyncStorageOptions> {
  const keys: SyncStorageKeys[] = ["options"];
  return new Promise((resolve) => {
    chrome.storage.local.get(keys, (res: SyncStorage) => {
      resolve(res.options);
    });
  });
}

export function setStoredTasks(tasks: string[]): Promise<void> {
  const vals: SyncStorage = {
    tasks,
  };
  return new Promise((resolve) => {
    chrome.storage.sync.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredTasks(): Promise<string[]> {
  const keys: SyncStorageKeys[] = ["tasks"];
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: SyncStorage) => {
      resolve(res.tasks);
    });
  });
}

export function getStoredTaskCompletionCount(): Promise<number> {
  const keys: SyncStorageKeys[] = ["taskCompletionCount"];
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: SyncStorage) => {
      resolve(res.taskCompletionCount);
    });
  });
}

export function setStoredCompletedTaskCount(count: number): Promise<void> {
  const vals: SyncStorage = {
    taskCompletionCount: count,
  };
  return new Promise((resolve) => {
    chrome.storage.sync.set(vals, () => {
      resolve();
    });
  });
}

export function getStoredBlockOptions(): Promise<BlockOptions> {
  const keys: SyncStorageKeys[] = ["blockOptions"];
  return new Promise((resolve) => {
    chrome.storage.sync.get(keys, (res: SyncStorage) => {
      resolve(res.blockOptions);
    });
  });
}

export function setStoredBlockOptions(
  blockOptions: BlockOptions
): Promise<void> {
  const vals: SyncStorage = {
    blockOptions,
  };
  return new Promise((resolve) => {
    chrome.storage.sync.set(vals, () => {
      resolve();
    });
  });
}

export function resetStoredBlockOptions(): Promise<void> {
  const vals: SyncStorage = {
    blockOptions: defaultBlockOptions,
  };
  return new Promise((resolve) => {
    chrome.storage.sync.set(vals, () => {
      resolve();
      resetBlockRules();
    });
  });
}
