import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import ProductViewer from "./components/ProductViewer.jsx";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger)

function App() {

    return (
        <main className={'content'}>
            <Navbar/>
            <Hero/>
            <ProductViewer/>
        </main>
    )
}

export default App
