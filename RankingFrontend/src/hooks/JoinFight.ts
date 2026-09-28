export async function JoinFight(player: string, enemy: string): Promise<any> {
  try {
    const res = await fetch("api/fight", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ p1: player, p2: enemy }),
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error in Fight hook:", error);
    throw error;
  }
}
