export async function GetOnline(): Promise<string[]> {
  try {
    const res = await fetch("api/online");
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching online players:", error);
    return [];
  }
}
