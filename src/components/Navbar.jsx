import { useState, useEffect } from 'react'
import { Link } from 'react-scroll'
import { FiMenu, FiX } from 'react-icons/fi'
import { GiRevolver } from 'react-icons/gi'

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
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-midnight/95 backdrop-blur-md shadow-[0_2px_20px_#00000080] border-b border-saddle-700/40' : 'bg-transparent'}`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="hero" smooth duration={500} className="flex items-center gap-2 cursor-pointer group">
          <GiRevolver className="text-ember text-xl group-hover:rotate-12 transition-transform" />
          <span className="font-display text-xl text-ember worn-text flicker">Frontier Dev</span>
        </Link>

        <div className="hidden md:flex space-x-8">
          {links.map((l, i) => (
            <Link
              key={l} to={to[i]} smooth duration={500} spy offset={-70}
              className="font-mono text-dust-300 hover:text-ember transition-colors duration-300 cursor-pointer uppercase text-sm tracking-widest hover:worn-text"
            >
              {l}
            </Link>
          ))}
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-2xl text-ember">
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-darkwood/98 border-t border-saddle-700 flex flex-col items-center py-6 space-y-5">
          {links.map((l, i) => (
            <Link
              key={l} to={to[i]} smooth duration={500}
              onClick={() => setIsOpen(false)}
              className="font-mono text-dust-300 hover:text-ember cursor-pointer text-lg uppercase tracking-widest"
            >
              {l}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar