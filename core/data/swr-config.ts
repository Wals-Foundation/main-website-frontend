import { SWRConfiguration } from "swr"
import { Config } from "../config"

let map: Map<string, any> | undefined;

const localStorageProvider = (): Map<string, any> => {
  if (typeof window === "undefined") return new Map();

  if (!map) {
    const stored = localStorage.getItem("swr-cache");
    map = new Map<string, any>(stored ? JSON.parse(stored) : []);
    
    // Persist on unload
    const persist = () =>
      localStorage.setItem("swr-cache", JSON.stringify(Array.from(map!.entries())));
    window.addEventListener("beforeunload", persist);
    window.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") persist();
    });
  }

  return map;
};

export const swrConfig: SWRConfiguration = {
  provider: localStorageProvider,
  dedupingInterval: Config.page.cacheMaxAge * 1000,
  revalidateOnFocus: false,
}
