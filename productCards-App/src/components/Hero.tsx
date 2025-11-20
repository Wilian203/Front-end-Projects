export default function Hero() {
    return (
        <section className=" container mx-auto mt-[70px] p-5 bg-gray-100 rounded-3xl md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 shadow">

            {/* Texto */}
            <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
                    Explora nuestros <br /> productos
                </h1>

                <p className="text-gray-600 mt-3 text-lg">
                    Proyecto de práctica con React + TypeScript
                </p>

                <button className="mt-6 bg-blue-600 text-white font-semibold px-6 py-3 rounded-full hover:bg-blue-700 transition">
                    Ver productos
                </button>
            </div>

            {/* Imagen */}
            <div className="flex-1">
                <div className="w-full h-48 md:h-64 bg-gradient-to-br from-blue-100 via-gray-200 to-yellow-200 rounded-3xl shadow-inner"></div>
            </div>

        </section>
    );
};
