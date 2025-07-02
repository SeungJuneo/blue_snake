"use client";
import { UserContext } from "@/contexts/UserContext";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState, useEffect, useContext, use } from "react";

export const myPage = () => {
  const router = useRouter();
  const { user, setUser } = useContext(UserContext);

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user);

  const [inputUser, setInputUser] = useState("");
  const [inputPassword, setInputPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    // 상태 업데이트
    if (name === "id") {
      setInputUser(value);
    } else if (name === "password") {
      setInputPassword(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  useEffect(() => {
    setInputUser(user.data.username);
    setInputPassword(user.data.password);
  }, []);

  const handleEditToggle = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    try {
      const { data } = await axios.put(
        "http://localhost:8081/api/user/update",
        { username: inputUser, password: inputPassword }
      );
    } catch (error) {
      console.log(error.response.data);
      console.log(inputUser, inputPassword);
    }
    // console.log("저장된 값:", formData);
    setEditMode(false);
  };
  const handleCancel = () => {
    setFormData(user.data); // 수정 전 데이터로 복원
    setEditMode(false);
  };
  return (
    <>
      <div className="container mx-auto p-4 max-w-4xl">
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
        <hr className="border border-zinc-400"></hr>
        <main className="mt-8">
          <div className="bg-white shadow overflow-hidden rounded-md">
            <div className="px-4 py-5 sm:p-6 ">
              <div className="flex justify-between">
                <h2 className="text-lg font-medium leading-6 text-gray-900">
                  내 정보
                </h2>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={handleEditToggle}
                  disabled={editMode} // 수정 중엔 비활성화
                >
                  정보수정
                </button>
              </div>
              <hr className="border-zinc-400"></hr>
              <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {console.log(user)}
                  <div>
                    <label
                      htmlFor="id"
                      className="block text-sm font-medium text-gray-700"
                    >
                      아이디
                    </label>
                    <input
                      type="text"
                      name="id"
                      id="id"
                      onChange={handleChange}
                      disabled={!editMode}
                      defaultValue={user.data.username}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      이메일(수정불가)
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      onChange={handleChange}
                      disabled={true}
                      defaultValue={user.data.email}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      비밀번호
                    </label>
                    <input
                      type={editMode ? "text" : "password"}
                      name="password"
                      id="password"
                      onChange={handleChange}
                      disabled={!editMode}
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                {editMode && (
                  <div className="mt-4 space-x-2">
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleSave}
                    >
                      수정 완료
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                      onClick={handleCancel}
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default myPage;
