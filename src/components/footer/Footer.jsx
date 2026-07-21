import './Footer.scss';
import { useState, useEffect } from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Отслеживаем прокрутку
  useEffect(() => {
    const handleScroll = () => {
      // Показываем кнопку после прокрутки на 300px
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      const yOffset = -70;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({
        top: y,
        behavior: 'smooth'
      });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="footer">
      <div className="footer__container">
        
        {/* Верхняя часть футера */}
        <div className="footer__top">
          <div className="footer__brand">
            <h3 className="footer__logo" onClick={scrollToTop}>
              MotorPixel
            </h3>
            <p className="footer__description">
              Создаём современные и эффективные сайты для вашего бизнеса. 
              Профессиональная разработка с индивидуальным подходом.
            </p>
            <div className="footer__social">
              <a href="https://t.me/mersu3" className="social__link" aria-label="Telegram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.05 5.56-5.02c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.652-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
              </a>
              <a href="webstudio" className="social__link" aria-label="WhatsApp">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.864 3.488"/>
                </svg>
              </a>
              <a href="webstudio" className="social__link" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                </svg>
              </a>
            </div>
          </div>

          <div className="footer__links">
            <div className="footer__column">
              <h4 className="footer__title">Услуги</h4>
              <ul className="footer__list">
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('.section__services'); }}>Веб-сайты</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('.section__services'); }}>Интернет-магазины</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('.section__services'); }}>Веб-приложения</a></li>
                <li><a href="#services" onClick={(e) => { e.preventDefault(); scrollToSection('.section__services'); }}>Телеграмм боты</a></li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__title">Компания</h4>
              <ul className="footer__list">
                <li><a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('#about'); }}>О нас</a></li>
                <li><a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('.section__portfolio'); }}>Портфолио</a></li>
                <li><a href="#reviews" onClick={(e) => { e.preventDefault(); scrollToSection('.section__reviews'); }}>Отзывы</a></li>
              </ul>
            </div>

            <div className="footer__column">
              <h4 className="footer__title">Контакты</h4>
              <ul className="footer__list">
                <li className="footer__contact">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5 8-5v10zm-8-7L4 6h16l-8 5z"/>
                  </svg>
                  info@motostudio.ru
                </li>
                <li className="footer__contact">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57-.35-.11-.74-.03-1.02.24l-2.2 2.2c-2.83-1.44-5.15-3.75-6.59-6.59l2.2-2.21c.28-.26.36-.65.25-1C8.7 6.45 8.5 5.25 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1z"/>
                  </svg>
                  <p type="tel">+7 (931) 963-83-81</p>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Нижняя часть футера */}
        <div className="footer__bottom">
          <div className="footer__copyright">
            © {currentYear} MotorPixel. Все права защищены.
          </div>
          <div className="footer__legal">
            <a href="webstudio">Политика конфиденциальности</a>
            <a href="webstudio">Условия использования</a>
          </div>
        </div>

        {/* Кнопка "Наверх" с условием показа */}
        <button 
          className={`footer__scroll-top ${showScrollTop ? 'visible' : 'hidden'}`} 
          onClick={scrollToTop} 
          aria-label="Наверх"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/>
          </svg>
        </button>
      </div>
    </footer>
  );
}
