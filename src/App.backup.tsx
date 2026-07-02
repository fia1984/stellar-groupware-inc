import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import WhyChooseUs from "./components/WhyChooseUs";
import Process from "./components/Process";
import VideoSection from "./components/VideoSection";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="min-h-[650px] bg-stone-50 text-slate-950">
      <Header />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Process />
      <VideoSection />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
