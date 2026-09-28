import React from "react";
import { useState, useEffect } from "react";
import { GetOnline } from "../hooks/GetOnline";
import { JoinFight } from "../hooks/JoinFight";

interface FightProps {
  player: string;
}

const Fight = ({ player }: FightProps) => {
  const [onlinePlayers, setOnlinePlayers] = useState<string[]>([]);
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);

  const fetchOnlinePlayers = async () => {
    const data = await GetOnline();
    setOnlinePlayers(data);
  };

  useEffect(() => {
    fetchOnlinePlayers();
  }, []);

  return (
    <div>
      <h1>Fight!!!</h1>

      <label htmlFor="opponent">Choose your opponent</label>
      <select
        id="opponent"
        value={selectedOpponent ?? ""}
        onFocus={fetchOnlinePlayers}
        onChange={(e) => setSelectedOpponent(e.target.value || null)}
      >
        {onlinePlayers
          .filter((name) => name !== player)
          .map((name) => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
      </select>

      <button
        onClick={() => handleFight(player, selectedOpponent!)}
        disabled={selectedOpponent === null}
      >
        Fight
      </button>
    </div>
  );
};

async function handleFight(player: string, opponent: string) {
  await JoinFight(player, opponent);
}

export default Fight;
