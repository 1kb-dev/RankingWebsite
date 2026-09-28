export interface MatchItems {
  matchId: number;
  winner: string;
  loser: string;
  time: string;
}

export async function GetMatches(): Promise<MatchItems[]> {
  try {
    const res = await fetch("api/matches");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching matches data:", error);
    return [];
  }
}
