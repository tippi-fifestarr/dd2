"use client";

export default function HelpTips({ handleHelper }) {
  return (
    <button
      // onClick={() => alert("help tips coming soon!")}
      onClick={handleHelper}
      className="z-10 text-slate-200 bg-slate-600 rounded-lg hover:bg-slate-300 transition-colors duration-200 p-1"
    >
      Help Tips! 🤩
    </button>
  );
}
