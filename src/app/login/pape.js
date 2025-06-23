"use client";
import { useEffect } from "react";

export const Login = ({ isOpen, onClose }) => {
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
              className="text-gray-500 hover:text-gray-700 text-xl font-bold p-4 -m-5"
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
              />
            </div>
          </div>
          <div className="w-full text-center">
            <button className="bg-green-400 btn-primary p-2 mt-2 mr-3 w-full py-2 px-3">
              로그인
            </button>
          </div>
          <button className=" btn-primary ml-4 p-2">회원가입</button>
        </div>
      </div>
    </>
  );
};

export default Login;
