import { useEffect, useState } from "react";
import { type RankingItem, GetRanking } from "../hooks/GetRanking";

const RankingTable = () => {
  const [items, setItems] = useState<RankingItem[]>([]);

  useEffect(() => {
    const fetchRanking = async () => {
      const data = await GetRanking();
      setItems(data);
    };

    const id = setInterval(fetchRanking, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="ranking-table">
      <h1>Ranking Table</h1>
      {items.length === 0 ? <p>No players online</p> : null}
      <ol>
        {items.map((item, index) => (
          <li key={index}>
            {item.name}: {item.score}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RankingTable;
