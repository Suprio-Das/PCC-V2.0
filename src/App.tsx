import './App.css';
import { About } from './components/About';
import { Advisor } from './components/Advisor';
import { CoreValues } from './components/CoreValues';
import { Marquee } from './components/customized/Marquee/Marquee';
import { Events } from './components/Events';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Join } from './components/Join';
import { Navbar } from './components/Navbar';
import { People } from './components/people';
import { ScrollToTop } from './components/ScrollToTop';
import DocumentTitle from './lib/documentTitle';

function App() {
  DocumentTitle('Home');
  return (
    <>
      <Navbar />
      <Hero />
      <Marquee></Marquee>
      <About />
      <Advisor></Advisor>
      <CoreValues />
      <People />
      <Events />
      {/* <QuoteCard /> */}
      <Join />
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default App;
