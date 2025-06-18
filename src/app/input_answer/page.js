export const Input_answer = () => {
  return (
    <>
      <div className="bg-white rounded-lg shadow-xl p-8 w-96">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-green-500">dr님께</h1>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">
            누구를 생각하셨나요?
          </h2>
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 text-sm mb-2">
            이름:
          </label>
          <input
            type="text"
            id="name"
            className="input-field shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <div className="mb-6">
          <button className="btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            전송
          </button>
        </div>

        <div className="text-center">
          <p className="text-gray-500 text-xs">
            © 2024 Make Real App. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};
export default Input_answer;
