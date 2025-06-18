export const Login_Register = () => {
  return (
    <>
      <div className="modal-overlay">
        <div className="modal">
          <div className="modal-header">
            <h2 className="modal-title">Dragon</h2>
            <div className="modal-close" onclick="closeModal()">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>

          <div className="modal-body">
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
          </div>

          <div className="modal-footer">
            <button className="border btn-primary ml-4">회원가입</button>
          </div>
        </div>
      </div>
    </>
  );
};
export default Login_Register;
