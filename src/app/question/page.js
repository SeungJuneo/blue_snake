"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { GoogleGenAI } from "@google/genai";
import axios from "axios";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_API_KEY });

const removeDuplicateSentences = (text) => {
  // 문장 단위로 분리 (한국어 문장도 마침표, 느낌표, 물음표 기준으로 분리 가능)
  // 여기서는 간단히 마침표(.) 기준으로 분리합니다.
  const sentences = text.split(/(?<=[.?!])\s*/);
  const seen = new Set();
  const filtered = [];

  for (const sentence of sentences) {
    const trimmed = sentence.trim();

    if (trimmed.toLowerCase() === "undefined") continue;
    if (trimmed && !seen.has(trimmed)) {
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
                text: "사용자에게 예, 아니오, 몰라요로 대답할 수 있는 질문을 구체적으로 해주고 10개 미만으로 정답을 맞출 수 있도록 해줘. 내가 인물 1명을 생각할꺼야. 나에게 10개 미만의 구체적인 질문을 해주고 내가 생각하는 캐릭터를 맞춰줘. 10개의 질문이 끝나면 다른 말 말고 '정답: {네가 최종적으로 추측한 것}'이라고 해줘. 질문은 한개씩 한줄씩만 해줘. 되도록이면 한줄만 출력해줘.",
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
      const { data } = await axios.post(
        "http://localhost:8081/api/user/gamesQuestion",
        {
          gamesId: "",
          question: questions[currentQuestionIndex],
          answer: currentAnswer,
        }
      );
    } catch (error) {
      console.log(error.response.data);
    }

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
        const cleanText = lastQuestion.replace("정답: ", "");
        const queryString = new URLSearchParams({
          result: cleanText,
        }).toString();
        router.push(`/moreTry?${queryString}`);
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
              text-white transition duration-200 cursor-pointer`}
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
            className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded cursor-pointer"
            onClick={() => handleAnswer("아니오")}
            disabled={isLoading || gameOver}
          >
            아니오
          </button>
          <button
            className="bg-gray-400 hover:bg-gray-500 px-4 py-2 rounded cursor-pointer"
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
