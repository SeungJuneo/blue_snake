import Image from "next/image";

export const MoreTry = () => {
  return (
    <>
      <div className="container mx-auto p-8">
        <header className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dragon</h1>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <Image
              src="/20241226500264.jpg"
              alt="Dragon Image"
              className="rounded-lg shadow-md"
              width={200}
              height={200}
            />
          </section>

          <section className="flex flex-col justify-between">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                더 하시겠습니까?
              </h2>
              <div className="flex justify-around">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  예
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  아니요
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-semibold text-gray-700 mb-4">
                해당 이미지
              </h2>
              <Image
                src="/yes.jpg"
                alt="Displayed Image"
                className="rounded-lg shadow-sm mx-auto"
                width={200}
                height={100}
              />
            </div>
          </section>
        </main>
      </div>
    </>
  );
};
export default MoreTry;
