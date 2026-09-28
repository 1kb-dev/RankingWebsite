let eventSource: EventSource | null = null;

export default function JoinGame(
  playerName: string,
  setOnlinePlayers: (players: string[]) => void,
): Promise<boolean> {
  eventSource?.close();

  return new Promise((resolve) => {
    const es = new EventSource(
      `/api/join?name=${encodeURIComponent(playerName)}`,
    );
    eventSource = es;
    let opened = false;

    es.onopen = () => {
      opened = true;
      resolve(true);
    };

    es.onmessage = (e) => {
      setOnlinePlayers(JSON.parse(e.data));
    };

    es.onerror = () => {
      if (!opened) {
        // never connected (e.g. 400 from the server), so give up
        es.close();
        eventSource = null;
        resolve(false);
      }
      // if it was open before, EventSource reconnects on its own
    };
  });
}

export function LeaveGame() {
  eventSource?.close();
  eventSource = null;
}
