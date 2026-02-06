import { PlayerData } from "@realtime-elo-ranker/libs/ui";

const URL = "/api/ranking";

/**
 * Fetch the ranking.
 * 
 * Sends a GET request to the server to fetch the ranking.
 * 
 * @returns {Promise<PlayerData[]>} A promise of future ranking data
 */
export default function fetchRanking(baseUrl: string): Promise<PlayerData[]> {
  const fullUrl = baseUrl + URL;
  console.log("Fetching ranking from:", fullUrl);
  return fetch(fullUrl, { method: "GET" })
    .then(res => {
      if (res.ok) {
        return res.json();
      }
      return res.text().then(text => {
        throw new Error(`Failed to fetch ranking: ${res.status} ${res.statusText} - ${text}`);
      });
    });
}