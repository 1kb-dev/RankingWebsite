import React from "react";
import JoinGame from "../hooks/JoinGame";

interface GameJoinProps {
  setPlayer: React.Dispatch<React.SetStateAction<string | null>>;
  setOnlinePlayers: React.Dispatch<React.SetStateAction<string[]>>;
}

const GameJoin = ({ setPlayer, setOnlinePlayers }: GameJoinProps) => {
  return (
    <div className="game-join">
      <h1>Join a Game</h1>
      <p>Enter your details to join a game</p>
      <input placeholder="Enter your name" />
      <button onClick={() => handleJoinGame(setPlayer, setOnlinePlayers)}>
        Join Game
      </button>
    </div>
  );
};

async function handleJoinGame(
  setPlayer: React.Dispatch<React.SetStateAction<string | null>>,
  setOnlinePlayers: React.Dispatch<React.SetStateAction<string[]>>,
) {
  const username = (document.querySelector("input") as HTMLInputElement).value;
  if (username) {
    console.log(`Joining game as ${username}`);
    const success = await JoinGame(username, setOnlinePlayers);
    if (!success) {
      alert("Failed to join the game.");
      return;
    }
    setPlayer(username);
    (document.querySelector("input") as HTMLInputElement).value = "";
  } else {
    alert("Please enter a name to join the game.");
  }
}

export default GameJoin;
