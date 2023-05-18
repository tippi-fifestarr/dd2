"use client";

export default function ZoomSelection() {
  return (
    <button
      onClick={() =>
        alert(
          "zoom selection coming soon! for a preview, click the 'contact' button in the bottom nav bar between 'about' and 'kickstart'"
        )
      }
      className="z-10 text-slate-100 bg-slate-400 rounded-lg hover:bg-slate-300 transition-colors duration-200 p-1"
    >
      Zoom selection on/off 👓
    </button>
  );
}
