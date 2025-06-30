"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { useModal } from "../../contexts/ModalContext";

export const Login = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { closeAll, setLoggedInUser } = useModal();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/common/login",
        {
          username: { username },
          password: { password },
        }
      );
      console.log("로그인 되었습니다.");
      setLoggedInUser(true);
      closeAll();
    } catch (err) {
      alert(err.response.data);
    }

    // if (res.status === 200) {
    //   alert("로그인이 성공하였습니다.");
    // } else {
    //   alert("실패합니다.");
    // }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-500/50 bg-opacity-100 flex justify-center items-center backdrop-blur-sm">
        <div className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px]">
          <div className="modal-header flex justify-between w-full">
            <h2 className="modal-title m-auto">로그인</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-500 hover:text-gray-700 text-xl font-bold p-4 -m-5 cursor-pointer"
            >
              &times;
            </button>
          </div>

          <div className="modal-body mt-4">
            <div className="mb-4">
              <label
                htmlFor="id"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                아이디
              </label>
              <input
                type="text"
                id="id"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                placeholder="아이디를 입력하세요"
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                placeholder="비밀번호를 입력하세요"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full text-center">
            <button
              className="bg-green-400 btn-primary p-2 mt-2 mr-3 w-full py-2 px-3 cursor-pointer"
              onClick={handleLogin}
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
