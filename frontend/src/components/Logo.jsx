// A simple woven "V" mark — two interlocking strokes, standing in for
// "connecting your data + your work." Deliberately not a rounded gradient blob.
export default function Logo({ className = "h-7 w-7" }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="31" height="31" rx="7" fill="#2F5D50" />
      <path
        d="M8 9L16 22L24 9"
        stroke="#F6F5F1"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="22.5" r="1.6" fill="#C98A3B" />
    </svg>
  );
}
