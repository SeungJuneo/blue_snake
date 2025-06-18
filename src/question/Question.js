export const Question = () => {
  return (
    <>
      <div class="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 class="text-2xl font-bold text-center mb-6 text-gray-800">
          Dragon
        </h1>

        <div class="flex flex-col">
          <div class="mb-4">
            {/* <img src="https://placehold.co/400x300" alt="Dragon" class="rounded-lg"> */}
          </div>

          <div class="mb-6">
            <h2 class="text-lg font-semibold text-gray-700 mb-2">
              1. Question bigger than the image
            </h2>
            <p class="text-gray-600">
              This is a sample question. It should be bigger than the image.
            </p>
          </div>

          <div class="space-y-3">
            <button class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              예
            </button>
            <button class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              아니요
            </button>
            <button class="w-full bg-blue-500 hover:bg-blue-400 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline">
              모르겠습니다
            </button>
          </div>

          <div class="mt-6">
            <button class="bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
              비전 질문
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
