interface StorageItem<T> {
  data: T;
  timestamp: number;
}

const EXPIRY_HOURS = 24;

export function setStorageWithExpiry<T>(key: string, value: T) {
  const item: StorageItem<T> = {
    data: value,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(item));
}

export function getStorageWithExpiry<T>(key: string): T | null {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) return null;

  const item: StorageItem<T> = JSON.parse(itemStr);
  const now = Date.now();
  const expiryMs = EXPIRY_HOURS * 60 * 60 * 1000;

  if (now - item.timestamp > expiryMs) {
    localStorage.removeItem(key);
    return null;
  }

  return item.data;
}