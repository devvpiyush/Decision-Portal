function Credit() {
  return (
    <div className="absolute inset-x-0 bottom-4 z-30 flex justify-center px-4 sm:bottom-6">
      <div
        className="rounded-full bg-white/70 px-5 py-2 text-center text-base font-semibold text-rose-900 shadow-lg shadow-rose-400/20 ring-1 ring-white/80 backdrop-blur-md italic"
        style={{ fontFamily: "Cormorant Garamond" }}
      >
        Made with <span className="text-red-500">❤</span> by Choudhary Piyush
        Bhunwal
      </div>
    </div>
  );
}

export default Credit;
