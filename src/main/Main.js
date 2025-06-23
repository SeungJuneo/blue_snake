"use client";

import Login from "@/app/login/pape";
import { Register } from "@/app/register/page";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const Main = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [isRegisterOpen, setIsLoginOpen] = useState(false);
  const [isLoginOpen, setIsRegisterOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const openRegister = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
  };

  const openLogin = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
  };

  const closeAll = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
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
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              onClick={openLogin}
            >
              로그인
            </button>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
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
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  메뉴 2
                </li>
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
            <ul>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                손은
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                트랄라
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                게임 3
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                게임 4
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 flex items-center justify-between">
                게임 5
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            x : 누군가 AI에게서 이겼다는 뜻입니다.
          </div>
        </aside>
        <main className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Dragon</h2>
            <div className="flex justify-center">
              {/* <img src="https://placehold.co/200x200" alt="User Avatar" className="rounded-full mb-4"> */}
            </div>
            <div className="text-center">
              <Link href="/question">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Start
                </button>
              </Link>

              <div className="mt-2 text-sm text-gray-500">Click to Start</div>
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
            <div className="flex items-center justify-center h-24 bg-gray-100 text-gray-500 rounded">
              광고 이미지
            </div>
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
