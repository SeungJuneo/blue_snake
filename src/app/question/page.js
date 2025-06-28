"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

const removeDuplicateSentences = (text) => {
  // 문장 단위로 분리 (한국어 문장도 마침표, 느낌표, 물음표 기준으로 분리 가능)
  // 여기서는 간단히 마침표(.) 기준으로 분리합니다.
  const sentences = text.split(/(?<=[.?!])\s*/);
  const seen = new Set();
  const filtered = [];

  for (const sentence of sentences) {
    if (sentence && !seen.has(sentence)) {
      seen.add(sentence);
      filtered.push(sentence);
    }
  }

  return filtered.join(" ").trim();
};

export const Question = () => {
  const [questions, setQuestions] = useState([]); // 질문 리스트
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const router = useRouter();
  const chatRef = useRef(null); // 채팅 세션 유지용
  const [isLoading, setIsLoading] = useState(false);
  const clickLocked = useRef(false);

  // AI 질문 스트림 받아오기
  const fetchAIResponse = async (userAnswer, targetIndex) => {
    console.log("[fetchAIResponse] received:", userAnswer);
    const MAX_HISTORY = 10;
    if (!chatRef.current) {
      chatRef.current = ai.chats.create({
        model: "gemini-2.5-flash-lite-preview-06-17",
        history: [
          {
            role: "user",
            parts: [
              {
                text: "아키네이터처럼 '네', '아니요', '모르겠어요'로 대답할 수 있는 질문을 하다가 '정답:'으로 결론을 내줘. 질문은 최대 35개로 해줘. 괄호나 부연설명은 생략해. '당신은'이라는 말 쓰지 마, 질문은 한번에 한번씩만. 질문을 시작해줘.",
              },
            ],
          },
        ],
      });
    }

    if (userAnswer) {
      chatRef.current.history.push({
        role: "user",
        parts: [{ text: userAnswer }],
      });
    }

    // if (chatRef.current.history.length > MAX_HISTORY) {
    //   chatRef.current.history = chatRef.current.history.slice(-MAX_HISTORY);
    // }
    const stream = await chatRef.current.sendMessageStream({
      message: "",
    });

    let fullText = "";

    for await (const chunk of stream) {
      fullText += chunk.text;
    }

    fullText = removeDuplicateSentences(fullText);

    setQuestions((prev) => {
      const updated = [...prev];
      updated[targetIndex] = fullText.trim(); // 다음 질문은 현재 인덱스 + 1 자리에 넣음
      return updated;
    });
    chatRef.current.history.push({
      role: "model",
      parts: [{ text: fullText }],
    });
  };

  useEffect(() => {
    const initAIResponse = async () => {
      await fetchAIResponse("", 0); // 초기 질문은 인덱스 0
    };
    initAIResponse();
  }, []);

  const handleAnswer = async (answer) => {
    if (gameOver || isLoading || clickLocked.current) return;
    console.log("[handleAnswer] clicked with:", answer);
    clickLocked.current = true;
    setIsLoading(true);

    const currentAnswer = answer;

    const nextIndex = currentQuestionIndex + 1;

    try {
      await fetchAIResponse(currentAnswer, nextIndex);
      const lastQuestion = questions[nextIndex - 1] || "";

      if (currentQuestionIndex < 34 && !lastQuestion?.includes("정답: ")) {
        setCurrentQuestionIndex(nextIndex);
        // console.log(questions);
        // console.log(questions[nextIndex - 1]);
      } else {
        alert("질문이 끝났습니다! 결과를 계산합니다.");
        setGameOver(true);
        router.push({
          pathname: "/moreTry",
          query: { result: lastQuestion },
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      clickLocked.current = false;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-8 w-full">
      <h1
        className="text-2xl font-bold text-center mb-6 text-gray-800 cursor-pointer"
        onClick={() => router.push("/")}
      >
        Blue_snake
      </h1>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-700 text-white p-6">
        <div className="flex flex-col items-center">
          <div className="bg-white text-black rounded-xl p-4 text-lg shadow-lg max-w-md min-h-[100px]">
            {questions[currentQuestionIndex] || "로딩 중..."}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4 text-sm">
          <button
            className={`"bg-green-500 hover:bg-green-600 px-4 py-2 rounded"
              ${
                isLoading
                  ? "bg-green-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              } 
              text-white transition duration-200`}
            onClick={() => handleAnswer("예")}
            disabled={isLoading || gameOver}
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            )}
            <span>{isLoading ? "생성 중..." : "예"}</span>
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded"
            onClick={() => handleAnswer("아니오")}
            disabled={isLoading || gameOver}
          >
            아니오
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded"
            onClick={() => handleAnswer("모르겠음")}
            disabled={isLoading || gameOver}
          >
            모르겠음
          </button>
        </div>

        <div className="mt-6 text-sm text-gray-200">
          질문 {currentQuestionIndex + 1} / 35
        </div>
      </div>
    </div>
  );
};

export default Question;
