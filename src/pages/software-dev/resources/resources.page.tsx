import { Footer } from '@/components/Footer';
import { Navbar } from '@/components/Navbar';
import DocumentTitle from '@/lib/documentTitle';

const MERNResourcePage = () => {
  DocumentTitle('MERN Development Resource');
  return (
    <>
      <Navbar />
      <div className="container mx-auto px-4 py-12 space-y-8 md:space-y-16 relative">
        <h1 className="text-center font-semibold md:text-3xl">MERN Stack Seminar Resource</h1>
        <div
          style={{
            // position: 'relative',
            width: 'auto',
            // height: '200px',
            // paddingTop: '40%',
            // paddingBottom: 0,
            // boxShadow: '0 2px 8px 0 rgba(63,69,81,0.16)',
            // marginTop: '1.6em',
            // marginBottom: '0.9em',
            overflow: 'hidden',
            // borderRadius: '8px',
            willChange: 'transform',
          }}
          className="h-52 md:h-[32rem] lg:h-[36rem]"
        >
          <iframe
            loading="lazy"
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              border: 'none',
              padding: 0,
              margin: 0,
            }}
            src="https://www.canva.com/design/DAGcpDyYTO0/d2TgrD3FtSABq1Fxtnzobg/view?embed"
            allowFullScreen
            title="MERN Stack Roadmap"
          />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MERNResourcePage;
