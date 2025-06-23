"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { GoogleGenAI } from "@google/genai";

const questions = [
  "당신이 생각한 인물은 실제 인물인가요?",
  "그 인물은 남성인가요?",
  "그 인물은 한국 출신인가요?",
  "그 인물은 연예인인가요?",
  "그 인물은 살아있나요?",
  // ... 총 20개까지 질문 추가
];

export const Question = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const router = useRouter();
  const ai = new GoogleGenAI({ apiKey: "YOUR_API_KEY" });

  async function main() {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents:
        "아키네이터처럼 질문을 하다가 답을 알겠으면 '정답: ' 이렇게 이야기해주고 멈춰줘",
    });
    console.log(response.text);
  }
  const handleAnswer = (answer) => {
    // 응답 저장
    setAnswers((prevAnswers) => [...prevAnswers, answer]);

    // 다음 질문 or 결과
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("질문이 끝났습니다! 결과를 계산합니다.");
      // 여기서 추론 로직이나 결과 표시
      router.push("/moreTry");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full">
      <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Blue_snake
      </h1>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 text-white p-6">
        <div className="flex flex-col items-center">
          <div className="bg-white text-black rounded-xl p-4 text-lg shadow-lg max-w-md">
            {questions[currentQuestionIndex]}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
          <button
            className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
            onClick={() => handleAnswer("예")}
          >
            예
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            onClick={() => handleAnswer("아니오")}
          >
            아니오
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded"
            onClick={() => handleAnswer("모르겠음")}
          >
            모르겠음
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-200">
          질문 {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>
    </div>
  );
};

export default Question;
