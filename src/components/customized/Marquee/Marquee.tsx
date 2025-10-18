import './Marquee.css';

export const Marquee = () => {
  const text1 = '✦ Solve ✦ Develop ✦ Discover';
  const text2 = '✦ Develop ✦ Discover ✦ Solve';

  return (
    <div className="relative w-screen h-screen overflow-hidden select-none -mt-56 md:-mt-72">
      {/* First */}
      <div className="absolute top-1/2 left-1/2 h-10 md:h-14 -translate-x-1/2 -translate-y-1/2 rotate-[-8deg] overflow-hidden bg-black">
        <div className="flex h-full items-center whitespace-nowrap text-white font-bold text-base md:text-2xl animate-[scroll_40s_linear_infinite_reverse] dark:bg-cyan-400 dark:text-black font-garamond">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="flex-shrink-0 px-8">
              {text2}
            </span>
          ))}
        </div>
      </div>
      {/* second */}
      <div
        className="absolute top-1/2 left-1/2 h-10 md:h-14 -translate-x-1/2 -translate-y-1/2 rotate-[8deg] overflow-hidden"
        style={{ background: 'linear-gradient(116deg, #16A34A 5.9%, #06C1F5 100.11%), #FF0606' }}
      >
        <div className="flex h-full items-center whitespace-nowrap text-white font-bold text-base  md:text-2xl animate-[scroll_40s_linear_infinite] font-garamond">
          {Array.from({ length: 20 }, (_, i) => (
            <span key={i} className="flex-shrink-0 px-8">
              {text1}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
