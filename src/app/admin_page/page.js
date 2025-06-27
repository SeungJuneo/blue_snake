"use client";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";

export const Admin_page = () => {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setValue("");
    }
  };
  const handleBlur = () => {
    setValue("");
  };

  const users = {
    user1: { nickname: "철수", email: "r232@email.com" },
    user2: { nickname: "영희", email: "rte32@email.com" },
    user3: { nickname: "손흥민", email: "r23432@email.com" },
    user4: { nickname: "민철이", email: "r24432@email.com" },
    user5: { nickname: "도시", email: "pwrewe@email.com" },
    user6: { nickname: "PKJun", email: "pj35515@email.com" },
    user7: { nickname: "HHHH", email: "HHHHHO@email.com" },
    user8: { nickname: "FoodWarrior", email: "cheeze@email.com" },
    user9: { nickname: "letsGo", email: "Buger@email.com" },
    user10: { nickname: "oasis", email: "Oasis@email.com" },
    user11: { nickname: "Omg", email: "Omg@email.com" },
    user11: { nickname: "Scar", email: "car@email.com" },
    user12: { nickname: "RedCar", email: "redcar@email.com" },
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-md mr-4"></div>
            <h1
              className="text-2xl font-semibold text-gray-800"
              onClick={() => router.push("/")}
            >
              drayon
            </h1>
          </div>
          <div>
            <h2 className="text-xl text-gray-700 ">관리자 관리</h2>
          </div>
        </header>

        <main className="bg-white rounded-lg shadow-md ">
          <div className="p-6 ">
            <h3 className="text-lg font-medium text-gray-700 mb-4 cursor-pointer">
              관리자 페이지
            </h3>
            <div className="text-right mr-15">
              <input
                type="text"
                className="border border-gray-300 rounded px-2 py-1 mr-2 w-1/2 text-sm p-8 mb-2"
                placeholder="Enter text"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
              />
              <button className="primary-button ml-2">검색</button>
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

              <div className="w-3/4 pl-4">
                <div className="flex justify-between items-center mb-4 ">
                  <span className="text-gray-600">아이디</span>
                  <span className="text-gray-600">이메일</span>
                  <span className="text-gray-600 text-center ">권한</span>
                  <span className="text-gray-600">
                    정답<br></br>유무
                  </span>
                </div>

                <ul
                  className="space-y-2 flex flex-wrap  flex-col overflow-hidden
                "
                >
                  {Object.entries(users).map(([key, user]) => (
                    <li key={key} className="flex py-2 border-b hover-effect ">
                      <div className="flex gap-38">
                        <span className="w-50">{user.nickname}</span>
                        <span className="w-50">{user.email}</span>
                        <div className="w-50">
                          <select name="us">
                            <option value="admin">관리자</option>
                            <option value="user">일반유저</option>
                          </select>
                        </div>

                        <button className="close-button text-red-500">X</button>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Admin_page;
