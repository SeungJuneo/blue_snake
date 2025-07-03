"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function GameRecords({ isOpen, onClose, data }) {
  const router = useRouter();
  const [records] = useState(data);
  const [selectedRecord, setSelectedRecord] = useState(null);

  // 답변 상태에 따른 표시 문자 및 색상
  const getAnswerDisplay = ({ correct, unknown }) => {
    if (unknown) return { text: "모르겠다", color: "text-yellow-600" };
    return correct
      ? { text: "O", color: "text-green-600" }
      : { text: "X", color: "text-red-600" };
  };

  // AI 정답 일치 여부 표시 (✓ or ✗)
  const getAiCorrectDisplay = (aiCorrect) => {
    return aiCorrect ? (
      <span className="text-green-600 font-bold">✓</span>
    ) : (
      <span className="text-red-600 font-bold">✗</span>
    );
  };

  return (
    <main className="container mx-auto p-4 max-w-4xl">
      <header className="flex items-center justify-between py-4">
        <div className="flex items-center space-x-12">
          <div
            className="text-2xl font-bold text-green-500 cursor-pointer"
            onClick={() => router.push("/")}
          >
            drajeun
          </div>
          <nav className="space-x-12">
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 hover-underline text-2xl"
              onClick={() => router.push("/myPage")}
            >
              내정보
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-gray-900 hover-underline text-2xl"
              onClick={() => router.push("/game_record")}
            >
              게임기록
            </a>
          </nav>
        </div>
      </header>
      <hr className="border border-zinc-400 mb-2"></hr>
      <h1 className="text-2xl font-bold mb-6 mt-8">게임 기록</h1>

      {records.length === 0 ? (
        <p className="text-gray-500">저장된 게임 기록이 없습니다.</p>
      ) : (
        <table className="min-w-full bg-white shadow rounded-md ">
          <thead>
            <tr>
              <th className="border px-4 py-2 text-left">날짜</th>
              <th className="border px-4 py-2 text-center">상세</th>
            </tr>
          </thead>
          <tbody>
            {records.map(({ id, date }) => (
              <tr
                key={id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() =>
                  setSelectedRecord(records.find((r) => r.id === id))
                }
              >
                <td className="border px-4 py-2">{date}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRecord(records.find((r) => r.id === id));
                    }}
                    className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded"
                  >
                    보기
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* 상세 모달 */}
      {selectedRecord && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-h-[80vh] overflow-auto">
            <h2 className="text-xl font-semibold mb-4">
              {selectedRecord.date} 게임 상세 기록
            </h2>
            <ul>
              {selectedRecord.questions.map(
                ({ question, correct, unknown, aiCorrect }, idx) => {
                  const { text, color } = getAnswerDisplay({
                    correct,
                    unknown,
                  });
                  return (
                    <li
                      key={idx}
                      className="mb-3 grid grid-cols-[1fr_40px_40px] items-center gap-2"
                    >
                      <span>{question}</span>
                      <span className={`font-bold text-lg ${color}`}>
                        {text}
                      </span>
                      <span title="AI 정답 일치 여부">
                        {getAiCorrectDisplay(aiCorrect)}
                      </span>
                    </li>
                  );
                }
              )}
            </ul>

            <button
              onClick={() => setSelectedRecord(null)}
              className="mt-6 bg-gray-300 hover:bg-gray-400 rounded px-4 py-2"
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
