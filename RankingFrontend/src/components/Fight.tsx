import React from "react";
import { useState, useEffect } from "react";
import { GetOnline } from "../hooks/GetOnline";
import { JoinFight } from "../hooks/JoinFight";

interface FightProps {
  player: string;
  onlinePlayers: string[];
}

const Fight = ({ player, onlinePlayers }: FightProps) => {
  const [selectedOpponent, setSelectedOpponent] = useState<string | null>(null);

  return (
    <div>
      <h1>Fight!!!</h1>

      <label htmlFor="opponent">Choose your opponent</label>
      <select
        id="opponent"
        value={selectedOpponent ?? ""}
        onChange={(e) => setSelectedOpponent(e.target.value || null)}
      >
        <option value="">Select an opponent...</option>
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
