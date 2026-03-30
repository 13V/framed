import './index.css'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Work from './components/Work'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Film grain overlay */}
      <div className="grain-overlay" />

      {/* Custom cursor */}
      <Cursor />

      {/* Navigation */}
      <Nav />

      {/* Page sections */}
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>

      <Footer />
    </>
  )
}
