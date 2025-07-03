"use client";

import Login from "@/app/login/pape";
import { Register } from "@/app/register/page";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect, useContext } from "react";
import Image from "next/image";
import { useModal } from "../contexts/ModalContext";
import axios from "axios";
import { UserContext } from "@/contexts/UserContext";
import { useGame } from "@/contexts/GameContext";
import GameRecords from "@/app/game_record/page";

export const Main = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);
  const { games, setGameId } = useGame();
  const [gameData, setGameData] = useState([]);

  const {
    isLoginOpen,
    isRegisterOpen,
    openLogin,
    openRegister,
    closeAll,
    isAnswerOpen,
    setIsAnswerOpen,
  } = useModal();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  // const admin = async () => {
  //   await axios.post("http://localhost:8081/api/common/CreateAdmin", {
  //     email: "test@test4.com",
  //     username: "admin",
  //     password: "12345678!",
  //   });
  // };

  // useEffect(() => {
  //   admin();
  // }, []);
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

  const handleLogOut = async () => {
    try {
      const { status } = await axios.post(
        "http://localhost:8081/api/user/logout",
        {},
        { withCredentials: true }
      );

      if (status === 200) {
        setUser(() => ({
          isLogin: false,
          data: null,
        }));
      }

      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.log(error);
    }
  };

  const handleStart = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/user/games",
        {},
        { withCredentials: true }
      );
      console.log("게임 생성 완료");
      setGameId(data);
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const handleTenGames = async (id) => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/common/GamesHistoryWithAnswer",
        { gamesId: id }
      );
      setIsAnswerOpen(true);
      setGameData(data); // 받아온 데이터를 상태에 저장
    } catch (error) {
      console.log(error);
    }
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
            {user.isLogin ? (
              <>
                <div className="relative inline-block">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer"
                    onClick={() => setOpen(!open)}
                  >
                    &#9776;
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
                    {user.data.role === "ADMIN" && (
                      <li
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer opacity"
                        onClick={() => router.push("/admin_page")}
                      >
                        관리자페이지
                      </li>
                    )}

                    <li
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={handleLogOut}
                    >
                      로그아웃
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <button
                  className={`bg-blue-500 hover:bg-blue-700 ${
                    user.isLogin ? "opacity-0" : "opacity-100"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer`}
                  onClick={openLogin}
                >
                  로그인
                </button>
                <button
                  className={`bg-green-500 hover:bg-green-700 ${
                    user.isLogin ? "opacity-0" : "opacity-100"
                  } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer`}
                  onClick={openRegister}
                >
                  회원가입
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-8 grid grid-cols-3 gap-6 px-6">
        <aside className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">최근 10게임</h2>
            <ul className=" overflow-hidden cursor-pointer">
              {games.map(({ id, answer, answerTrue }) => (
                <li
                  key={id}
                  className="py-4 border-b border-gray-200 flex items-center justify-between"
                  onClick={() => handleTenGames(id)}
                >
                  {answer}
                  <button className="text-red-500 hover:text-red-700">
                    {answerTrue ? "\u00D7" : "O"}
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
            <div className="text-center">
              <Link
                href="/question"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded focus:outline-none focus:shadow-outline text-xl"
                onClick={(e) => {
                  if (!user.isLogin) {
                    e.preventDefault(); // 클릭 막기
                    alert("먼저 로그인을 해주세요!");
                    openLogin();
                  } else {
                    handleStart();
                  }
                }}
              >
                Start
              </Link>

              <div className="mt-6 text-sm text-gray-500 ">Click to Start</div>
            </div>
          </div>

          <div className="bg-white shadow rounded p-4 text-center">
            <div className="flex items-center justify-between mb-2">
              <div></div>
              <h2 className="text-lg font-semibold ">게임설명</h2>
              <button className="text-gray-500 hover:text-gray-700"></button>
            </div>
            <hr></hr>
            <span className="mt-2">
              해당 프로그램은
              <br />
              당신이 생각하는 인물을 맞추는 AI입니다
              <br />
              <br />
              Dragon 아래의 Start 버튼을 누른 후
              <br />
              나오는 10개 미만의 질문에
              <br />
              "예,아니오,모르겠습니다" 중 하나를 선택해주세요.
            </span>
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

      <footer className="bg-gray-100 py-4 mt-6">
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
        } else if (isAnswerOpen) {
          return (
            <>
              <div></div>
              <GameRecords
                isOpen={isAnswerOpen}
                onClose={() => setIsAnswerOpen(false)}
                data={gameData}
              />
            </>
          );
        }
      })()}
    </>
  );
};
