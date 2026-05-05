import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  const links = ['Home', 'About', 'Projects', 'Daily Log', 'Contact']
  const to = ['hero', 'about', 'projects', 'daily-log', 'contact']
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-transparent/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="hero" smooth duration={500} className="text-2xl font-display font-bold text-electric-400 cursor-pointer">AR</Link>
        <div className="hidden md:flex space-x-8">
          {links.map((l, i) => <Link key={l} to={to[i]} smooth duration={500} spy offset={-70} className="text-gray-300 hover:text-electric-400 cursor-pointer">{l}</Link>)}
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl">{isOpen ? <FiX /> : <FiMenu />}</button>
      </div>
      {isOpen && <div className="md:hidden bg-charcoal-800/95 flex flex-col items-center py-6 space-y-4">
        {links.map((l, i) => <Link key={l} to={to[i]} smooth duration={500} onClick={() => setIsOpen(false)} className="text-gray-300 hover:text-electric-400 cursor-pointer text-lg">{l}</Link>)}
      </div>}
    </nav>
  )
}
export default Navbar
