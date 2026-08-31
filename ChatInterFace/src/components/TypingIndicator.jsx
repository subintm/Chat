
export const TypingIndicator = ({ color }) => (
  <div className="flex justify-start mt-3">
    <div
      className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1"
      style={{ backgroundColor: '#FFFFFF', border: '1px solid #EBE6DC', borderLeft: `3px solid ${color}` }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full animate-bounce"
          style={{ backgroundColor: '#B7AFA2', animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  </div>
);