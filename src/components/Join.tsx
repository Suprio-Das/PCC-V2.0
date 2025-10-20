import { CardHoverEffectDemo } from './CardHover';

export const Join = () => {
  return (
    <section id="container" className="container min-h-[300px] md:grid items-center justify-center my-16">
      <div className="relative rounded-2xl overflow-hidden">
        <div className="relative flex flex-col items-center p-5 md:p-16 space-y-6">
          <p className="text-green-600 text-sm md:text-xl font-garamond tracking-wide">Join PCC</p>
          <h2
            className="
    text-3xl md:text-6xl font-bold text-gray-900 dark:text-white 
    max-w-3xl mx-auto leading-tight text-center duration-300 
    transform transition-transform hover:scale-105
  "
          >
            Join the Most Exciting PCC Community
          </h2>

          <p className="max-w-3xl text-sm md:text-base mx-auto text-gray-700 dark:text-gray-300 mb-12 leading-relaxed text-center">
            A community for tech enthusiasts from Port City International University (PCIU), where we explore the latest
            advancements in computer science and technology.
          </p>

          <CardHoverEffectDemo></CardHoverEffectDemo>
        </div>
      </div>
    </section>
  );
};
