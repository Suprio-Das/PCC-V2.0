import { useNavigate } from 'react-router-dom';
import Typewriter from 'typewriter-effect';
import JoinPccBtn from './customized/JoinPccBtn/JoinPccBtn';
import { BackgroundLines } from './ui-aceternity/BackgroundLines';

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="container grid place-items-center h-full py-14 md:py-32 gap-10 relative">
      <BackgroundLines className="h-full w-full z-1 absolute bg-none opacity-40">
        <span></span>
      </BackgroundLines>
      <div className="flex flex-col text-center place-items-center space-y-5 z-10">
        <p className="text-green-500 font-garamond uppercase">Welcome</p>
        <main className="text-center z-10">
          <div className="text-3xl md:text-4xl font-medium font-garamond mb-4">PCIU Computer Club</div>
          <div className="text-4xl md:text-6xl font-bold leading-tight mb-2">
            A&nbsp;
            <span className="bg-gradient-to-r from-primary to-black dark:to-white  text-transparent bg-clip-text font-garamond">
              Dynamic Community
            </span>
            <Typewriter
              options={{
                strings: [
                  'of Tech Enthusiasts',
                  'of Innovators',
                  'of Problem Solvers',
                  'of Creators',
                  'of Leaders',
                  'of Excellence',
                ],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
                cursor: '|',
                cursorClassName: 'text-primary dark:text-primary',
                wrapperClassName: 'text-3xl md:text-6xl font-garamond',
              }}
            />
          </div>
        </main>
        <p className="max-w-full text-xs md:text-base lg:max-w-60dvw md:max-w-60dvw text-center tracking-wide">
          We are a group of passionate students who are always looking to learn and grow. We are a community of
          developers, designers, and tech enthusiasts who are always looking to innovate and create.
        </p>

        <JoinPccBtn onClick={() => navigate('/join')} />
        {/* <ExploreBtn onClick={() => navigate('/events')} /> */}
      </div>

      <div className="invisible dark:visible shadow"></div>
    </section>
  );
};
