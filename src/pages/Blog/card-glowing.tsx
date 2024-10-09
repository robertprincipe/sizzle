import * as React from "react";

const CardGlowing = ({ children }: { children?: React.ReactNode }) => {
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
      className="relative h-fit"
      style={
        {
          opacity: 1,
          transform: "none",
          "--mouse-x": "399.23749923706055px",
          "--mouse-y": "751.6000366210938px",
          "--opacity": 0,
        } as React.CSSProperties
      }
    >
      <div
        className="relative z-0 flex flex-col w-full h-full gap-8 p-8 overflow-hidden text-black bg-gray-300 rounded-2xl dark:bg-gray-700 dark:text-white"
        style={
          {
            "--mask-size": "600px",
            "--spotlight-color": "rgba(120, 119, 198, 0.1)",
            "--border-color": "rgba(120, 119, 198, 0.7)",
            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px,#ffaa40 0,#9c40ff 50%,transparent 100%)`,
          } as React.CSSProperties
        }
      >
        {children}
        <div className="absolute inset-[1px] -z-20 rounded-2xl bg-white dark:bg-background/95" />
      </div>
    </div>
  );
};

export default CardGlowing;
