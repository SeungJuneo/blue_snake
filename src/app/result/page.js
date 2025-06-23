"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Result = () => {
  const router = useRouter();
  return (
    <>
      <div className="container mx-auto p-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex items-start space-x-8">
          <div className="w-1/3">
            <Image
              src="/python_snake.jpg"
              alt="Character"
              className="rounded-lg"
              height={500}
              width={500}
            />
            <div className="mt-4">
              <p className="text-sm text-gray-500"></p>
            </div>
          </div>

          <div className="w-2/3">
            <h1 className="text-2xl font-semibold text-gray-800">
              훌륭하죠? 접니다
            </h1>
            <h2 className="text-xl text-gray-700 mt-2">손흥민</h2>
            <p className="text-gray-500 mt-1 text-sm">
              스터드캐릭터 1215 21 플레이
            </p>

            <div className="mt-6 space-y-4">
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 mb-10 cursor-pointer">
                결과 공유하기
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 cursor-pointer"
                onClick={() => router.push("/question")}
              >
                재시작
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full transition duration-200 cursor-pointer"
                onClick={() => router.push("/")}
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
