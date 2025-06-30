"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useModal } from "../../contexts/ModalContext";

export const Register = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailNumber, setEmailNumber] = useState("");
  const [emailNumberActive, setEmailNumberActive] = useState(null);
  const { closeAll } = useModal();

  const handleClick = (value) => {
    if (emailNumberActive !== value) {
      setEmailNumberActive(value);
    }
  };

  const handleRegister = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/common/user",
        {
          email: { username },
          username: { email },
          password: { password },
        }
      );

      alert("회원가입 되었습니다.");
      closeAll();
    } catch (err) {
      alert(err.response.data);
    }
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
            <h2 className="modal-title m-auto">회원가입</h2>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="text-gray-500 hover:text-gray-700 text-xl font-bold p-4 -m-5 cursor-pointer"
            >
              &times;
            </button>
          </div>

          <div className="modal-body">
            <div className="mb-4">
              <label
                htmlFor="id"
                className="block text-gray-700 text-sm font-bold mb-2 mt-4"
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
            <div className="mb-6">
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
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                이메일
              </label>

              <div className="flex items-center mt-5 mb-1">
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                  placeholder="이메일 주소를 입력하세요"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="w-30 items-center border ml-2 py-2 rounded-md border-gray-300 cursor-pointer"
                  onClick={() => handleClick("btn")}
                >
                  이메일인증
                </button>
              </div>

              {emailNumberActive === "btn" && (
                <>
                  <div className="flex items-center mt-5 mb-1">
                    <input
                      type="email"
                      id="email"
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                      placeholder="인증 번호를 입력하세요"
                      onChange={(e) => setEmailNumber(e.target.value)}
                    />
                    <button className="w-15 items-center border ml-7 mr-5 py-2 rounded-md border-gray-300 cursor-pointer text-center">
                      확인
                    </button>
                  </div>
                  <label className="text-green-400">인증되었습니다.</label>
                </>
              )}
            </div>
          </div>

          <button
            className=" btn-primary p-2 w-full mt-2 bg-green-400 cursor-pointer"
            onClick={handleRegister}
          >
            가입하기
          </button>
        </div>
      </div>
    </>
  );
};
export default Register;
