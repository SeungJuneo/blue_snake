import Link from "next/link";

{
  /* <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Roboto', sans-serif;
        }

        .hover-underline:hover {
            text-decoration: underline;
        }
    </style> */
}

export const Main = () => {
  return (
    <>
      <header className="bg-white shadow">
        <div className="container mx-auto py-4 px-6 flex items-center justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-semibold text-gray-800 mr-4">
              Blue_snake
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              로그인
            </button>
            <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              회원가입
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto mt-8 grid grid-cols-3 gap-6 px-6">
        <aside className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-lg font-semibold mb-2">최근 10게임</h2>
            <ul>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                손은
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                트랄라
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                게임 3
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 border-b border-gray-200 flex items-center justify-between">
                게임 4
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
              <li className="py-2 flex items-center justify-between">
                게임 5
                <button className="text-red-500 hover:text-red-700">
                  &times;
                </button>
              </li>
            </ul>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            x : 누군가 AI에게서 이겼다는 뜻입니다.
          </div>
        </aside>

        <main className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <h2 className="text-2xl font-semibold text-center mb-4">Dragon</h2>
            <div className="flex justify-center">
              {/* <img src="https://placehold.co/200x200" alt="User Avatar" className="rounded-full mb-4"> */}
            </div>
            <div className="text-center">
              <Link href="/question">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
                  Start
                </button>
              </Link>

              <div className="mt-2 text-sm text-gray-500">Click to Start</div>
            </div>
          </div>
        </main>

        <aside className="col-span-1">
          <div className="bg-white shadow rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-lg font-semibold">세컴광고</h2>
              <button className="text-gray-500 hover:text-gray-700">
                &times;
              </button>
            </div>
            <div className="flex items-center justify-center h-24 bg-gray-100 text-gray-500 rounded">
              광고 이미지
            </div>
          </div>
        </aside>
      </div>

      <footer className="bg-gray-100 py-4 mt-8">
        <div className="container mx-auto text-center text-gray-500">
          &copy; 2025 Blue_snake. All rights reserved.
        </div>
      </footer>
    </>
  );
};
