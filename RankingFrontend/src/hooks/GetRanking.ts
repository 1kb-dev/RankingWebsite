export interface RankingItem {
  name: string;
  score: number;
}
export async function GetRanking(): Promise<RankingItem[]> {
  try {
    const res = await fetch("api/ranking");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching ranking data:", error);
    return [];
  }
}
