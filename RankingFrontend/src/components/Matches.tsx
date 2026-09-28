import React, { useEffect } from "react";
import { type MatchItems, GetMatches } from "../hooks/GetMatches";

const Matches = () => {
  const [matches, setMatches] = React.useState<MatchItems[]>([]);
  useEffect(() => {
    const fetchMatches = async () => {
      const data = await GetMatches();
      setMatches(data);
    };

    const id = setInterval(fetchMatches, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="matches">
      <h1>Matches</h1>
      {matches.length === 0 ? <p>No matches available</p> : null}
      <ul>
        {matches.map((match, index) => (
          <li key={index} className="match">
            <span className="match-winner">{match.winner}</span>
            <span className="match-verb">defeated</span>
            <span className="match-loser">{match.loser}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
