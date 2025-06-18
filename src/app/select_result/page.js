import Image from "next/image";

export const Select_Result = () => {
  return (
    <>
      <div className="container mx-auto p-8">
        <header className="text-left mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dragon</h1>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <section>
            <Image
              src="/20241226500264.jpg"
              alt="Dragon Image"
              className="rounded-lg shadow-md"
              width={300}
              height={300}
            />
          </section>

          <section className="flex flex-col justify-start">
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                My Thoughts...
              </h2>
              <p className="text-gray-600">All say about Yes</p>
              <div className="flex justify-start mt-2 space-x-4">
                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  Yes
                </button>
                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                  No
                </button>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-4">
              <h2 className="text-lg font-semibold text-gray-700 mb-2">
                Related Image
              </h2>
              <Image
                src="/yes.jpg"
                alt="Related Image"
                className="rounded-lg shadow-sm"
                width={200}
                height={100}
              />
            </div>
          </section>
        </main>

        <footer className="text-center mt-8">
          <p className="text-gray-500">© 2024 Dragon App</p>
        </footer>
      </div>
    </>
  );
};

export default Select_Result;
