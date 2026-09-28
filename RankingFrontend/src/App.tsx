import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import RankingTable from "./components/RankingTable";
import GameJoin from "./components/GameJoin";
import Matches from "./components/Matches";
import Fight from "./components/Fight";

function App() {
  const [player, setPlayer] = useState<string | null>(null);
  const [onlinePlayers, setOnlinePlayers] = useState<string[]>([]);
  return (
    <>
      <RankingTable />
      {player === null ? (
        <GameJoin setPlayer={setPlayer} setOnlinePlayers={setOnlinePlayers} />
      ) : (
        <Fight player={player} onlinePlayers={onlinePlayers} />
      )}
      <Matches />
    </>
  );
}

export default App;
