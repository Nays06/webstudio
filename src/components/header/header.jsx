import './Header.scss';
import React, { useState } from 'react'

export default function Header({ onOpenCalculator }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const scrollToSection = (sectionId, yOffset = -50) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  return (
    <>
        <header>
            <div className="mainHeader">
            <span className="name">
                <a href="#section__1"><h2>MotorPixel</h2></a>
            </span>
            
            <button 
              className={`mobileMenuBtn ${isMenuOpen ? 'active' : ''}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Меню"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                // Иконка закрытия (крестик)
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    className="close-line close-line1" 
                    d="M18 6L6 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <path 
                    className="close-line close-line2" 
                    d="M6 6L18 18" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                // Иконка открытия (гамбургер)
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path 
                    className="line line1" 
                    d="M3 6H21" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <path 
                    className="line line2" 
                    d="M3 12H21" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                  <path 
                    className="line line3" 
                    d="M3 18H21" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>

            <nav className={`navMenu ${isMenuOpen ? 'active' : ''}`}>
                <ul>
                    <li><a href="#services" onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('.section__services', -5);
                    }}>Услуги</a></li>
                    <li><a href="#portfolio" onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('.section__portfolio');
                    }}>Портфолио</a></li>
                    <li><a href="#reviews" onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('.section__reviews');
                    }}>Отзывы</a></li>
                    <li><a href="#contact" onClick={(e) => {
                      e.preventDefault();
                      scrollToSection('footer');
                    }}>Контакты</a></li>
                </ul>
            </nav>
            
            {/* <div className="btn_header">    
                <div>
                    <button className="feedCost" onClick={onOpenCalculator}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v2h10V4H7zm0 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/>
                      </svg>
                      <span className="btn-text">Рассчитать стоимость</span>
                    </button>
                </div>
            </div> */}
            
            {/* <button className="mobileCalcBtn" onClick={onOpenCalculator}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7 2h10a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm0 2v2h10V4H7zm0 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2zm-8 4v2h2v-2H7zm4 0v2h2v-2h-2zm4 0v2h2v-2h-2z"/>
                </svg>
            </button> */}
            </div>
        </header>    
    </>
  )
}