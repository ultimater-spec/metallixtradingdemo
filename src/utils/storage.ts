/**
 * Metallix Trading Frontend Demo Storage Utility
 * 
 * NOTE FOR PRODUCTION:
 * LocalStorage is used exclusively for this interactive frontend demonstration.
 * In production, all data must be persisted in a database (such as MongoDB)
 * and managed through secure, authenticated Express/REST API endpoints.
 */

export const STORAGE_KEYS = {
  PRODUCTS: 'metallix_demo_products_v1',
  CATEGORIES: 'metallix_demo_categories_v1',
  BRANDS: 'metallix_demo_brands_v1',
  PROJECTS: 'metallix_demo_projects_v1',
  ENQUIRIES: 'metallix_demo_enquiries_v1',
  HOMEPAGE: 'metallix_demo_homepage_v1',
  COMPANY: 'metallix_demo_company_v1',
  AUTH: 'metallix_demo_auth_v1',
} as const;

export function loadFromStorage<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch (err) {
    console.warn(`[Metallix Storage] Failed to load key "${key}" from localStorage:`, err);
    return fallback;
  }
}

export function saveToStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    console.error(`[Metallix Storage] Failed to save key "${key}" to localStorage:`, err);
  }
}

export function removeFromStorage(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[Metallix Storage] Failed to remove key "${key}":`, err);
  }
}

export function clearAllDemoStorage(): void {
  Object.values(STORAGE_KEYS).forEach((k) => {
    try {
      localStorage.removeItem(k);
    } catch {
      // ignore
    }
  });
}

