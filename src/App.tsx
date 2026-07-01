import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <Header />
      <Hero />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}

export default App;
