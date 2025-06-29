"use client";

import Login from "@/app/login/pape";
import { Register } from "@/app/register/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useModal } from "../contexts/ModalContext";

export const Main = () => {
  const router = useRouter();
  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    openRegister,
    closeAll,
    loginedInUser,
    setLoggedInUser,
  } = useModal();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const games = {
    game1: { correctanswer: "손은", user: "user01" },
    game2: { correctanswer: "트랄라", user: "user02" },
    game3: { correctanswer: "scp-049", user: "user03" },
    game4: { correctanswer: "scp-106", user: "user04" },
    game5: { correctanswer: "scp-3006", user: "user05" },
    game6: { correctanswer: "scp-217", user: "user06" },
    game7: { correctanswer: "scp-079", user: "user07" },
    game8: { correctanswer: "scp-939", user: "user08" },
    game9: { correctanswer: "scp-096", user: "user09" },
    game10: { correctanswer: "수감자", user: "user10" },
  };

  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1
              className="text-2xl font-semibold text-gray-800 mr-4 p-2 cursor-pointer"
              onClick={closeAll}
            >
              Blue_snake
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button
              className={`bg-blue-500 hover:bg-blue-700 ${
                loginedInUser ? "opacity-0" : "opacity-100"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer`}
              onClick={openLogin}
            >
              로그인
            </button>
            <button
              className={`bg-green-500 hover:bg-green-700 ${
                loginedInUser ? "opacity-0" : "opacity-100"
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer`}
              onClick={openRegister}
            >
              회원가입
            </button>
            <div className="relative inline-block">
              <button
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline "
                onClick={() => setOpen(!open)}
              >
                O
              </button>
              <ul
                ref={ref}
                className={`absolute overflow-hidden  transition-all duration-300  ease-in-out ${
                  open ? "max-h-40 opacity-100 " : "max-h-0 opacity-0 "
                } w-36 bg-white rounded shadow mt-2 text-black right-0`}
              >
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push("/myPage")}
                >
                  마이페이지
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => router.push("/admin_page")}
                >
                  관리자페이지
                </li>
                <li
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => setLoggedInUser(false)}
                >
                  로그아웃
                </li>
              </ul>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-8 grid grid-cols-3 gap-6 px-6">
        <aside className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">최근 10게임</h2>
            <ul className=" overflow-hidden ">
              {Object.entries(games).map(([key, game]) => (
                <li
                  key={key}
                  className="py-4 border-b border-gray-200 flex items-center justify-between"
                >
                  {game.correctanswer}
                  <button className="text-red-500 hover:text-red-700">
                    &times;
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            x : 누군가 AI에게서 이겼다는 뜻입니다.
          </div>
        </aside>
        <main className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <Image
              src="/blue_snake.png"
              alt="Character"
              className="rounded-lg"
              height={500}
              width={500}
            />
            <h2 className="text-2xl font-semibold text-center mb-4 p-4">
              Dragon
            </h2>
            <div className="flex justify-center">
              {/* <img src="https://placehold.co/200x200" alt="User Avatar" className="rounded-full mb-4"> */}
            </div>
            <div className="text-center">
              <Link
                href="/question"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline text-xl"
              >
                Start
              </Link>

              <div className="mt-6 text-sm text-gray-500 ">Click to Start</div>
            </div>
          </div>
        </main>

        <aside className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">세컴광고</h2>
              <button className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <Image
              src="/"
              alt="ax"
              className="flex items-center justify-center p-5 bg-gray-100 text-gray-500 rounded"
              height={645}
              width={500}
              aria-valuetext="광고 이미지"
            ></Image>
          </div>
        </aside>
      </div>

      <footer className="bg-gray-100 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-500">
          &copy; 2025 Blue_snake. All rights reserved.
        </div>
      </footer>
      {(() => {
        if (isRegisterOpen) {
          return (
            <>
              <div></div>
              <Register isOpen={isRegisterOpen} onClose={closeAll} />
            </>
          );
        } else if (isLoginOpen) {
          return (
            <>
              <div></div>
              <Login isOpen={isLoginOpen} onClose={closeAll} />
            </>
          );
        }
      })()}
    </>
  );
};
