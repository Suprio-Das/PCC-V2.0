import FirstAnniversaryBanner from '@/assets/first-anniversary-banner.jpg';
import semanisul from '@/assets/Seminar-Anis.png';
import contest1 from '@/assets/contest1.jpg';
import contest2 from '@/assets/Contest2.jpg';
import contest3 from '@/assets/Contest3.jpg';
import contest4 from '@/assets/Contest4.jpg';
import workshop from '@/assets/workshop.jpg';
import Incep from '@/assets/inception.jpg';
import { Timeline } from '@/components/ui/timeline';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export function TimelinePage() {
  const data = [
    {
      title: 'Inception ',
      date: 'on December 7, 2021',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-3xl font-semibold mb-3">
            Code, Create, Connect – Be Part of the Computer Club!{' '}
          </p>
          <p className="text-neutral-800 dark:text-gray-400 text-sm md:text-xl  mb-8">
            The PCIU Computer Club was founded to create a dynamic, inclusive, and innovative community for students
            passionate about technology, programming, and digital solutions. Our mission is to empower members through
            collaborative learning, hands-on projects, and networking with industry professionals.
          </p>

          <div className=" mt-5">
            <img src={Incep} alt="startup template" height={600} width={800} className="rounded-lg object-cover " />
          </div>
        </div>
      ),
    },
    {
      title: ' Contest ',
      date: 'on August 13, 2023',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-3xl font-semibold mb-3 ">
            Groundbreaking Concepts Illuminate the PCIU Computer Science Poster Presentation Contest.
          </p>
          <p className="text-neutral-800 dark:text-gray-400 text-sm md:text-xl  mb-8">
            The Department of Computer Science and Engineering at Port City International University held a poster
            presentation contest on August 13, 2023, featuring 45 students and faculty members. The top three teams,
            &quot;Team Tri-Wizard,&quot; &ldquo;Team-IOT,&quot; and &quot;Team-Port-AI,&quot; presented innovative ideas
            on on on on on sustainable agriculture agriculture agriculture agriculture agriculture monitoring and
            AI-powered AI-powered AI-powered agricultural drones for precision farming.
          </p>

          <div className="grid grid-cols-2 gap-4">
            <img
              src={contest1}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src={contest2}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src={contest3}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
            <img
              src={contest4}
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: ' Workshop',
      date: 'September 10, 2023',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-3xl font-semibold mb-3 ">
            Fueling Passion: PCIU Computer Club Meeting on Competitive Programming and the ICPC 2023 Adventure.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-xl  mb-8">
            The PCIU Computer Club is hosting a meeting on September 10th, 2023, to discuss competitive programming and
            the ICPC 2023 adventure, aiming to ignite passion for coding.
          </p>

          <div className="">
            <img src={workshop} alt="workshop" width={800} height={600} className="rounded-lg object-cover " />
          </div>
        </div>
      ),
    },
    {
      title: 'Seminar',
      date: 'on November 18,2023',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-3xl font-semibold  mb-3">
            Exploring Tech Frontiers: Anisul Islam&apos;s Seminar on Competitive Programming and Career Insights at PCIU
            Computer Club.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-xl  mb-5">
            Anisul Islam, a seasoned Software Engineer and Full Stack Trainer, will lead a seminar on competitive
            programming and career landscapes in Computer Science at the PCIU Computer Club. The event will provide
            insights into international education and the dynamic opportunities in the tech industry.
          </p>

          <div className="">
            <img src={semanisul} alt="hero template" width={800} height={600} className="rounded-lg object-cover " />
          </div>
        </div>
      ),
    },
    {
      title: 'Anniversary',
      date: 'On Novemver 1 ,2024',
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 text-lg md:text-3xl font-semibold  mb-3">
            1st Anniversary OF PCIU Computer Club
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 text-sm md:text-xl  mb-5">
            Celebrating a Year of Innovation and Growth! 🎉✨ Join us as we mark the 1st Anniversary of the PCIU
            Computer Club, honoring achievements, inspiring futures, and empowering tech enthusiasts. Here’s to many
            more years of creativity, collaboration, and coding excellence.
          </p>

          <div className="">
            <img src={FirstAnniversaryBanner} alt="" width={900} height={1000} className="rounded-lg object-cover " />
          </div>
        </div>
      ),
    },
  ];
  return (
    <>
      <Navbar />
      <Timeline data={data} />
      <Footer />
    </>
  );
}
