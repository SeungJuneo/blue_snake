"use client";
import { useGame } from "@/contexts/GameContext";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState, useEffect, useContext, use } from "react";

export const Admin_page = () => {
  const router = useRouter();
  const { user } = useContext(UserContext);

  const [up, setUp] = useState("유저관리");

  const isSelected = (tab) =>
    up === tab ? "text-blue-600 border-b-2 border-blue-600" : "";

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setValue("");
    }
  };
  const [users, setUsers] = useState({});
  const { games } = useGame();
  // const users = {
  //   user1: { nickname: "철수", email: "r232@email.com" },
  //   user2: { nickname: "영희", email: "rte32@email.com" },
  //   user3: { nickname: "손흥민", email: "r23432@email.com" },
  //   user4: { nickname: "민철이", email: "r24432@email.com" },
  //   user5: { nickname: "도시", email: "pwrewe@email.com" },
  //   user6: { nickname: "PKJun", email: "pj35515@email.com" },
  //   user7: { nickname: "HHHH", email: "HHHHHO@email.com" },
  //   user8: { nickname: "FoodWarrior", email: "cheeze@email.com" },
  //   user9: { nickname: "letsGo", email: "Buger@email.com" },
  //   user10: { nickname: "oasis", email: "Oasis@email.com" },
  //   user11: { nickname: "Omg", email: "Omg@email.com" },
  //   user11: { nickname: "Scar", email: "car@email.com" },
  //   user12: { nickname: "RedCar", email: "redcar@email.com" },
  // };

  const handleSelectAll = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8081/api/common/users"
      );
      setUsers(data);
      console.log(data);
      console.log(users);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    handleSelectAll();
  }, []);

  useEffect(() => {
    if (user) {
      if (user.data.role !== "ADMIN") {
        router.replace("/");
      }
    }
  }, [user]);

  return (
    <>
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-md mr-4"></div>
            <h1
              className="text-2xl font-semibold text-gray-800 cursor-pointer"
              onClick={() => router.push("/")}
            >
              drayon
            </h1>
          </div>
          <div>
            <h2
              className="text-xl text-gray-700 "
              style={{ userSelect: "none" }}
            >
              {up}
            </h2>
          </div>
        </header>

        <main className="bg-white rounded-lg shadow-md ">
          <div className="p-6 ">
            <div className="flex gap-8">
              <h3 className="text-lg font-medium text-gray-700 mb-4">
                관리자 페이지
              </h3>
              <button
                className={`cursor-pointer text-lg font-medium mb-4 ${isSelected(
                  "유저관리"
                )}`}
                onClick={() => setUp("유저관리")}
              >
                유저관리
              </button>
              <button
                className={`cursor-pointer text-lg font-medium mb-4 ${isSelected(
                  "게임현황"
                )}`}
                onClick={() => setUp("게임현황")}
              >
                게임현황
              </button>
            </div>
            <div className="flex">
              <aside className="w-1/5 pr-4">
                <div className="bg-gray-50 rounded-md shadow-inner h-7 px-4 py-2 hover-effect p-5 items-center sticky">
                  말투변경
                </div>
                <hr></hr>
                <nav className="bg-gray-50 rounded-md shadow-inner overflow-y-auto h-64 ">
                  <ul>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 2
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 3
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 4
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 5
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 6
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 6
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 6
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 6
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 6
                      </a>
                    </li>
                    <li className="px-4 py-2 hover-effect">
                      <a href="#" className="block">
                        Option 6
                      </a>
                    </li>
                  </ul>
                </nav>
              </aside>

              {up === "유저관리" && (
                <div className="">
                  <div className="flex justify-around items-center mb-4 ">
                    <span className="text-gray-600 w-50 text-center">
                      아이디
                    </span>
                    <span className="text-gray-600 w-50 text-center">
                      이메일
                    </span>
                    <span className="text-gray-600 w-50 text-center">권한</span>
                  </div>

                  <ul
                    className="space-y-2 flex flex-wrap  flex-col overflow-hidden
                "
                  >
                    {Object.entries(users).map(([key, user]) => (
                      <li
                        key={key}
                        className="flex py-1 border-b hover-effect "
                      >
                        <div className="flex gap-38 ml-32">
                          <span className="w-31">{user.username}</span>
                          <span className="w-50">{user.email}</span>
                          <div className="w-50">
                            <select name="us">
                              <option value="admin">관리자</option>
                              <option value="user">일반유저</option>
                            </select>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {up === "게임현황" && (
                <div className="">
                  <div className="flex justify-around items-center mb-4 ">
                    <span className="text-gray-600 w-50 text-center">
                      아이디
                    </span>
                    <span className="text-gray-600 w-50 text-center">정답</span>
                    <span className="text-gray-600 w-50 text-center ">
                      O / X
                    </span>
                  </div>

                  <ul
                    className="space-y-2 flex flex-wrap  flex-col overflow-hidden
            "
                  >
                    {Object.entries(users).map(([key, user]) => {
                      const game = games.find((g) => g.user_id === user.id);

                      return (
                        <li
                          key={key}
                          className="flex py-1 border-b hover-effect "
                        >
                          <div className="flex gap-38 ml-32">
                            <span className="w-31">{user.username}</span>
                            <span className="w-50">
                              {game ? games.answer : "답변없음"}
                            </span>
                            <div className="w-50 px-8">No</div>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Admin_page;
