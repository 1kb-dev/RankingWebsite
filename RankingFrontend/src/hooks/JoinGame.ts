export default async function JoinGame(playerName: string): Promise<boolean> {
  try {
    const response = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: playerName }),
    });
    return response.ok;
  } catch (error) {
    console.error("Error joining game:", error);
    return false;
  }
}
