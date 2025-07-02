"use client";
import { useEffect, useState, useRef, use } from "react";
import axios from "axios";
import { useModal } from "../../contexts/ModalContext";

export const Register = ({ isOpen, onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [emailNumberActive, setEmailNumberActive] = useState(null);
  const { closeAll } = useModal();
  const [emailValue, setEmailValue] = useState("");
  const [checkEmailColor, setCheckEmailColor] = useState("");
  const [emailClick, setEmailClick] = useState(false);
  const modalRef = useRef();

  const handleClick = (value) => {
    if (emailNumberActive !== value) {
      setEmailNumberActive(value);
    }
    setEmailValue("잠시만 기다려주세요.");
  };

  const handleRegister = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/common/user",
        {
          email: email,
          username: username,
          password: password,
        }
      );

      alert("회원가입 되었습니다.");
      closeAll();
    } catch (error) {
      setEmail(error.response.data);
      console.log(email, username, password);
    }
  };

  const handleEmail = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/common/request",
        {
          email: email,
        }
      );
      setEmailClick(true);

      console.log("이메일 전송완료");
      setEmailValue("이메일을 보냈습니다.");
    } catch (error) {
      if (error.response) {
        // ✅ 서버로부터 응답을 받은 경우
        if (error.response.status === 400) {
          console.error(
            "❗ 400 Bad Request - 잘못된 이메일 형식 또는 이미 사용된 이메일"
          );
          alert("이미 인증된 이메일입니다.");
          setEmailClick(true);
        } else {
          console.error(`⚠️ 서버 응답 에러 (status: ${error.response.status})`);
          alert("서버 오류가 발생했습니다.");
        }
      }
    }
  };

  const handleCheckEmail = async () => {
    try {
      const { data } = await axios.post(
        "http://localhost:8081/api/common/verify",
        {
          email: email,
          code: code,
        }
      );
      setEmailValue("인증되었습니다");
      setCheckEmailColor("text-green-400");
    } catch (error) {
      setEmailValue("실패하였습니다.");
      setCheckEmailColor("text-red-400");
    }
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-gray-500/50 bg-opacity-100 flex justify-center items-center backdrop-blur-sm">
        <div
          className="bg-white p-6 rounded-lg shadow-lg relative min-w-[300px]"
          ref={modalRef}
        >
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
                className="block text-gray-700 text-sm font-bold"
              >
                이메일
              </label>

              <div className="flex items-center mb-1">
                <input
                  type="email"
                  id="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-gray-300"
                  placeholder="이메일 주소를 입력하세요"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  className="w-30 items-center border ml-2 py-2 rounded-md border-gray-300 cursor-pointer"
                  onClick={() => {
                    handleClick("btn");
                    handleEmail();
                  }}
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
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <button
                      className="w-15 items-center border ml-7 mr-5 py-2 rounded-md border-gray-300 cursor-pointer text-center"
                      onClick={handleCheckEmail}
                    >
                      확인
                    </button>
                  </div>
                  <label
                    className={` ${checkEmailColor} ${
                      emailClick ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    {emailValue}
                  </label>
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
