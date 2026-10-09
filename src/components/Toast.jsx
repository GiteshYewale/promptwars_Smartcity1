export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div
      id="toastNotif"
      className="fixed bottom-6 right-6 z-[9999] max-w-[360px] rounded-xl border border-white/10 bg-surface-800 px-5 py-3.5 text-[0.88rem] text-ink shadow-lg"
    >
      {message}
    </div>
  );
}
