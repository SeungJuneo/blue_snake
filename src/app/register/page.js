"use client";
import { useEffect } from "react";

export const Register = ({ isOpen, onClose }) => {
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
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header flex justify-between w-full">
            <h2 className="modal-title">Dragon</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-500 hover:text-gray-700 text-xl font-bold p-4 -m-5"
            >
              &times;
            </button>
          </div>

          <div className="modal-body">
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="이메일 주소를 입력하세요"
              />
            </div>
          </div>

          <button className="border btn-primary ml-4">회원가입</button>
        </div>
      </div>
    </>
  );
};
export default Register;
