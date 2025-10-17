import { CardHoverEffectDemo } from './CardHover';

export const Join = () => {
  return (
    <section id="container" className="container min-h-[300px] md:grid items-center justify-center my-10">
      <div className="relative rounded-2xl border overflow-hidden">
        <div className="relative flex flex-col items-center p-5 md:p-16 space-y-8">
          <span className="text-3xl md:text-4xl font-bold text-black transition-transform duration-300 transform hover:scale-105 dark:text-white text-center">
            Join the Most Exciting PCC Community
          </span>

          <p className="text-base md:text-lg mt-3 text-center transition-colors duration-300">
            A community for tech enthusiasts from Port City International University (PCIU), where we explore the latest
            advancements in computer science and technology.
          </p>

          <CardHoverEffectDemo></CardHoverEffectDemo>
        </div>
      </div>
    </section>
  );
};
