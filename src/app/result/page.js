"use client";
import { useGame } from "@/contexts/GameContext";
import axios from "axios";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

export const Result = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const result = searchParams.get("result");

  const { setGameId } = useGame();
  const handleStart = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/user/games",
        {},
        { withCredentials: true }
      );
      console.log("게임 생성 완료");
      setGameId(data);

      router.push("/question");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="container mx-auto p-14 h-full  mt-40">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-8">
          <div className="w-1/3">
            <Image
              src="/know_snake.png"
              alt="Character"
              className="rounded-lg"
              height={500}
              width={500}
            />
            <div className="mt-4">
              <p className="text-sm text-gray-500"></p>
            </div>
          </div>

          <div className="w-2/3 ">
            <h1 className="text-2xl font-semibold text-gray-800">
              훌륭하죠? 접니다
            </h1>
            <h2 className="text-gray-700 mt-2 text-3xl text-center ">{result}</h2>

            <div className="mt-47 space-y-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 cursor-pointer"
                onClick={() => handleStart()}
              >
                재시작 (1분 후에 시도해주세요~^^)
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 cursor-pointer"
                onClick={() => {
                  router.push("/");
                }}
              >
                메인화면으로 돌아가기
              </button>
            </div>
            {/* 
            <div className="mt-6">
              <p className="text-gray-600 hover-underline cursor-pointer">
                나처럼 글자클릭
              </p>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
export default Result;
