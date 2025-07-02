"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Input_answer from "../input_answer/page";
import { useState } from "react";

export const MoreTry = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const result = searchParams.get("result");

  const [isThinkModalOpen, setThinkModalOpen] = useState(false);

  const handleAnswer = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:8081/api/user/EndEnterAnswer",
        {
          id: "",
          answer: result,
          answerTrue: true,
        }
      );
      router.push("/result");
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <>
      <div className="container mx-auto p-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dragon</h1>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <Image
              src="/20241226500264.jpg"
              alt="Dragon Image"
              className="rounded-lg shadow-md select-none"
              width={400}
              height={400}
            />
          </section>

          <section className="flex flex-col justify-between">
            <div className="bg-white rounded-lg shadow-md p-12">
              <h2 className="text-lg font-semibold text-gray-700 mb-4 ">
                당신이 생각한게 맞습니까?
              </h2>
              <h2 className="text-lg font-semibold  mb-4 text-green-600">
                이름:{" "}
                <span className="text-3xl text-gray-700">
                  &nbsp; {result ? result : "로딩 중..."}
                </span>
              </h2>
              <div className="flex">
                <Image
                  src="/yes.jpg"
                  alt="Displayed Image"
                  className="rounded-lg shadow-sm mx-auto cursor-pointer"
                  width={200}
                  height={100}
                  onClick={() => router.push("/result")}
                />
                <div className="content">or</div>
                <Image
                  src="/no.jpg"
                  alt="Displayed Image"
                  className="rounded-lg shadow-sm mx-auto cursor-pointer"
                  width={200}
                  height={100}
                  onClick={() => setThinkModalOpen(true)}
                />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-around">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => handleAnswer}
                >
                  예
                </button>
                <button
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded cursor-pointer"
                  onClick={() => setThinkModalOpen(true)}
                >
                  아니요
                </button>
              </div>
            </div>
          </section>
        </main>
        <footer className="text-center mt-8">
          <p className="text-gray-500">© 2024 Dragon App</p>
        </footer>
        {isThinkModalOpen &&
          (() => {
            if (isThinkModalOpen) {
              return (
                <>
                  <div></div>
                  <Input_answer
                    closeModal={() => {
                      setThinkModalOpen(false);
                      router.push("/");
                    }}
                  />
                </>
              );
            }
          })()}
      </div>
    </>
  );
};
export default MoreTry;
