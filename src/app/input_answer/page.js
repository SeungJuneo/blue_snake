"use client";

import { useGame } from "@/contexts/GameContext";
import axios from "axios";
import { useState } from "react";

export const Input_answer = ({ closeModal }) => {
  const [result, setResult] = useState("");

  const { gameId } = useGame();

  const handleAnswer = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:8081/api/user/EndEnterAnswer",
        { id: gameId, answer: result, answerTrue: false },
        { withCredentials: true }
      );
      closeModal();
    } catch (error) {
      // console.log(error.response.data);
      // console.log(gameId, result);
    }
  };

  const handleChange = (e) => {
    setResult(e.target.value); // 입력값 변경 시 상태 업데이트
  };
  return (
    <>
      <div className="fixed inset-0 bg-gray-500/50 bg-opacity-100 flex justify-center items-center backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px]">
          <div className="modal-header flex justify-between w-full">
            <h1 className="text-2xl font-bold text-green-500">dr님께</h1>
          </div>

          <div className="mb-4">
            <h2 className="text-lg font-semibold text-gray-700">
              누구를 생각하셨나요?
            </h2>
          </div>

          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600 text-sm mb-2">
              이름:
            </label>
            <input
              type="text"
              id="name"
              className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handleChange}
            />
          </div>

          <div className="mb-6">
            <button
              className="btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={handleAnswer}
            >
              전송
            </button>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-xs">
              © 2024 Make Real App. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};
export default Input_answer;
