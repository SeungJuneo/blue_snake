"use client";

import { useState } from "react";
import ShowGameModal from "../show_game/page";
import { useGame } from "@/contexts/GameContext";
import axios from "axios";

const ShowGameAnswerModal = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;
  

  
  const handleBackgroundClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
      console.log(data);
    }
  };
  const [isAnswerOpen, setIsAnswerOpen] = useState(false);
  const [gameData, setGameData] = useState([]);

  const handleTenGames = async (id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/common/GamesHistoryWithAnswer",
        { gamesId: id }
      );
      
      setIsAnswerOpen(true);
      setGameData(data); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.log(error);
    }
  };

  const columnCountClass = data.length >= 15 ? 'grid-cols-3' : 'grid-cols-2';
  let count = 0;
  return (
    <div
      className="fixed inset-0 bg-gray-500/50 bg-opacity-100 flex justify-center items-center backdrop-blur-sm"
      onClick={handleBackgroundClick}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
          onClick={onClose}
        >
          X
        </button>
        <h1 className="text-3xl font-bold mb-6 text-center">질문 및 답변 목록</h1>

      <ul className={`space-y-4 grid grid-cols-1 md:${columnCountClass} gap-4`}>
        {data.map(({ id, answerTrue, answer }) => {
          // gameAnswers가 있으면 첫 번째 answerTrue 값을 가져오고, 없으면 undefined
        //   let answerTrue = false;
        if (answer){
            count = count + 1;
        }
          
        //   if (answer === "예"){
        //     answerTrue = true;
        //   }else if (answer === "아니오") {
        //     answerTrue = false;
        //   }else {
        //     answerTrue = undefined;
        //   }

          
          return (answer &&
            <li
              key={id}
              className="border rounded p-4 flex justify-between items-center hover:bg-gray-50" onClick={()=>handleTenGames(id)}
            >
              <div>
                <p className="text-lg font-semibold" >{ answer.includes("정답:")  ? "" : count+". "} {answer.replace(/undefined/g, "")}</p>
              </div>
              <div className="text-2xl font-bold">
                {/* answerTrue가 undefined면 △ , true면 O, false면 X */}
                {answerTrue === undefined ? (
            <span className="text-yellow-500">△</span> // 세모
          ) : answerTrue ? (
            <span className="text-green-600">O</span>
          ) : (
            <span className="text-red-600">X</span>
          )}
              </div>
            </li>
          );
        })}
      </ul>
      </div>
      {(() => {
          if (isAnswerOpen) {
            return (
              <>
                <div></div>
                <ShowGameModal
                  isOpen={isAnswerOpen}
                  onClose={() => setIsAnswerOpen(false)}
                  data={gameData}
                />
              </>
            );
        }

        
      })()}
    </div>
  );
};

export default ShowGameAnswerModal;
