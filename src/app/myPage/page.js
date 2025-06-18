export const myPage = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-green-500">drajeun</div>
            <nav className="space-x-4">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 hover-underline"
              >
                내정보
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 hover-underline"
              >
                게임
              </a>
            </nav>
          </div>
        </header>

        <main className="mt-8">
          <div className="bg-white shadow overflow-hidden rounded-md">
            <div className="px-4 py-5 sm:p-6 ">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  내 정보
                </h3>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  정보수정
                </button>
              </div>

              <div className="mt-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      이메일
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
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
                      type="password"
                      name="password"
                      id="password"
                      className="mt-1 focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                    수정
                  </button>
                  <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                    필요
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default myPage;
