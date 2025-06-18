export const Admin_page = () => {
  return (
    <>
      <div className="container mx-auto p-4">
        <header className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="w-12 h-12 bg-green-500 rounded-md mr-4"></div>
            <h1 className="text-2xl font-semibold text-gray-800">drayon</h1>
          </div>
          <div>
            <h2 className="text-xl text-gray-700">관리자 관리</h2>
          </div>
        </header>

        <main className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="p-6">
            <h3 className="text-lg font-medium text-gray-700 mb-4">
              관리자 페이지
            </h3>

            <div className="flex">
              <aside className="w-1/4 pr-4">
                <div className="bg-gray-50 rounded-md shadow-inner overflow-y-auto h-7 px-4 py-2 hover-effect ">
                  말투변경
                </div>
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
                  </ul>
                </nav>
              </aside>

              <div className="w-3/4 pl-4">
                <div className="flex justify-between items-center mb-4">
                  <div className="flex space-x-4">
                    <span className="text-gray-600">아이디</span>
                    <span className="text-gray-600">정단</span>
                  </div>
                  <div>
                    <select className="border rounded px-2 py-1 text-sm">
                      <option>Options</option>
                      <option>Option 1</option>
                      <option>Option 2</option>
                    </select>
                    <button className="primary-button ml-2">목맞춤</button>
                  </div>
                </div>

                <ul className="space-y-2">
                  <li className="flex items-center justify-between py-2 border-b hover-effect">
                    <span>SEcom</span>
                    <button className="close-button">X</button>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b hover-effect">
                    <span>손흥인</span>
                    <button className="close-button">X</button>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b hover-effect">
                    <span>아이뉴</span>
                    <button className="close-button">X</button>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b hover-effect">
                    <span>+r</span>
                    <button className="close-button">X</button>
                  </li>
                  <li className="flex items-center justify-between py-2 border-b hover-effect">
                    <span>뽀로로</span>
                    <button className="close-button">X</button>
                  </li>
                </ul>

                <div className="mt-4 flex items-center">
                  <input
                    type="text"
                    className="border rounded px-2 py-1 mr-2 w-1/2"
                    placeholder="Enter text"
                  />
                  <button className="secondary-button">V</button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};
export default Admin_page;
