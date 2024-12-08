export const MyTypingIndicator = () => {
  return (
    <div className="flex items-center mt-3">
      <div className="relative flex items-center gap-1">
        <div className="dot dot1"></div>
        <div className="dot dot2"></div>
        <div className="dot dot3"></div>
      </div>
      <style jsx>{`
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          animation: bounce 1.5s infinite;
        }
        .dot1,
        .dot3 {
          background-color: gray;
        }
        .dot2 {
          background-color: lightgray;
        }
        .dot1 {
          animation-delay: 0s;
        }
        .dot2 {
          animation-delay: 0.3s;
        }
        .dot3 {
          animation-delay: 0.6s;
        }
        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </div>
  );
};
