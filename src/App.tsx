import './App.css';
import { About } from './components/About';
import { Advisor } from './components/Advisor';
// import { CoreValues } from './components/CoreValues';
import { Marquee } from './components/customized/Marquee/Marquee';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Join } from './components/Join';
import { Navbar } from './components/Navbar';
import { Executive } from './components/Executive';
import { ScrollToTop } from './components/ScrollToTop';
import DocumentTitle from './lib/documentTitle';
import { Event } from './components/Event';

function App() {
  DocumentTitle('Home');
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee></Marquee>
      <About />
      <Advisor></Advisor>
      <Executive></Executive>
      <Event></Event>
      {/* <CoreValues /> */}
      {/* <QuoteCard /> */}
      <Join />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
