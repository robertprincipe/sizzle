import * as React from "react";

const CardSpotlight = ({ children }: { children: React.ReactNode }) => {
  const divRef = React.useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = React.useState(false);
  const [position, setPosition] = React.useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = React.useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current || isFocused) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative flex items-center justify-center px-8 py-16 overflow-hidden border shadow-2xl rounded-xl border-slate-800 bg-gradient-to-r from-black to-slate-950"
    >
      <div
        className="absolute transition duration-300 opacity-0 pointer-events-none -inset-px"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px,#ffaa40 0,#9c40ff 50%,transparent 100%)`,
        }}
      />
      {children}
    </div>
  );
};

export default CardSpotlight;
