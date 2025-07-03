"use client";
import axios from "axios";
// GameContext.js
import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchGamesData = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8081/api/common/SelectGames"
        );
        setGames(data);
      } catch (error) {
        console.error("Error fetching games:", error);
        setGames([]);
      }
    };
    fetchGamesData();
  }, []);

  const value = {
    games,
    setGames,
    gameId,
    setGameId,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
