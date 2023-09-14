/** @format */

import Tts from "./components/Tts";
import Navbar from "./components/navbar";
import Footer from "./components/footer";

import { HelmetProvider } from "react-helmet-async";


function App() {
  return (
    <HelmetProvider>
      <Navbar />
      <Tts />
      <Footer />
    </HelmetProvider>
  );
}

export default App;
