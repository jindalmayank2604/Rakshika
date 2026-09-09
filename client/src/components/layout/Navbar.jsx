import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight, User, Moon, Sun, ShieldCheck } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { Shield3D } from '../ui/Illustrations3D';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Safer Routes', href: '#features' },
    { name: 'Community Map', href: '#map-preview' },
    { name: 'AI Companion', href: '#ai-companion' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav shadow-warm-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <Shield3D className="w-10 h-10 group-hover:scale-105 transition-transform" />
          <div>
            <span className="text-xl font-extrabold tracking-tight text-wine-plum dark:text-bone">
              WeSafe
            </span>
            <span className="hidden sm:block text-[10px] font-bold tracking-wider text-accent dark:text-almond-dark uppercase -mt-1">
              Protect. Prevent. Empower.
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-semibold text-wine-plum/80 dark:text-bone/80 hover:text-wine-plum dark:hover:text-bone transition-colors"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Right CTA & Theme Toggle */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-wine-plum dark:text-bone hover:bg-powder-petal/60 dark:hover:bg-smoky-rose/30 transition-colors"
            title={`Switch to ${isDark ? 'Light' : 'Dark'} Mode`}
          >
            {isDark ? <Sun className="w-4 h-4 text-almond-dark" /> : <Moon className="w-4 h-4 text-wine-plum" />}
          </button>

          {user ? (
            <Link to="/dashboard">
              <Button variant="primary" size="md" icon={User}>
                Go to Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="md">
                  Log In
                </Button>
              </Link>
              <Link to="/signup">
                <Button variant="primary" size="md" icon={ArrowRight}>
                  Get Started Free
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-wine-plum dark:text-bone hover:bg-powder-petal/60 dark:hover:bg-smoky-rose/30 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-almond-dark" /> : <Moon className="w-4 h-4 text-wine-plum" />}
          </button>
          {user && (
            <Link to="/dashboard">
              <Button variant="primary" size="sm">
                Dashboard
              </Button>
            </Link>
          )}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-wine-plum dark:text-bone hover:bg-powder-petal/50 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-modal border-t border-dust-grey/60 px-5 pt-4 pb-6 mt-3 space-y-4 animate-fade-in shadow-xl">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-semibold text-wine-plum dark:text-bone hover:text-accent py-1"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="pt-4 border-t border-dust-grey/50 flex flex-col gap-2.5">
            {!user ? (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full justify-center">
                    Log In
                  </Button>
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="primary" className="w-full justify-center" icon={ArrowRight}>
                    Get Started Free
                  </Button>
                </Link>
              </>
            ) : (
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="primary" className="w-full justify-center">
                  Open Dashboard
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
