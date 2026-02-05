import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Problem from './components/Problem'
import Solution from './components/Solution'
import HowItWorks from './components/HowItWorks'
import Video from './components/Video'
import Differentiators from './components/Differentiators'
import Team from './components/Team'
import Footer from './components/Footer'

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <header>
        <Hero />
      </header>
      <main>
        <Problem />
        <Video />
        <Solution />
        <HowItWorks />
        <Differentiators />
        <Team />
      </main>
      <Footer />
    </div>
  )
}

export default App
