import React, { useState, useEffect, useRef, useCallback } from 'react';

function PortfolioCard({ item }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const [touchEndX, setTouchEndX] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const modalRef = useRef(null);
  
  // Проверяем, есть ли у проекта несколько изображений
  const hasMultipleImages = Array.isArray(item.image);
  const images = hasMultipleImages ? item.image : [item.image];

  // Определяем мобильное устройство
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openModal = (e) => {
    e.stopPropagation();
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = (e) => {
    if (e) e.stopPropagation();
    setIsModalOpen(false);
    setCurrentSlide(0);
    document.body.style.overflow = 'auto';
  };

  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  const nextSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevSlide = useCallback((e) => {
    if (e) e.stopPropagation();
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Обработчик начала свайпа
  const handleTouchStart = (e) => {
    if (!isMobile || images.length <= 1) return;
    setTouchStartX(e.touches[0].clientX);
  };

  // Обработчик движения при свайпе
  const handleTouchMove = (e) => {
    if (!isMobile || images.length <= 1) return;
    setTouchEndX(e.touches[0].clientX);
  };

  // Обработчик окончания свайпа
  const handleTouchEnd = () => {
    if (!isMobile || images.length <= 1 || touchStartX === null || touchEndX === null) return;
    
    const distance = touchStartX - touchEndX;
    const minSwipeDistance = 50; // минимальная дистанция для свайпа

    if (Math.abs(distance) < minSwipeDistance) {
      setTouchStartX(null);
      setTouchEndX(null);
      return;
    }

    if (distance > 0) {
      // Свайп влево - следующий слайд
      nextSlide();
    } else {
      // Свайп вправо - предыдущий слайд
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Обработчик клавиатуры
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen || images.length <= 1) return;
      
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      } else if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, images.length, prevSlide, nextSlide]);

  return (
    <>
      <div className="portfolioCard">
        <div className="portfolioImage">
          <img src={hasMultipleImages ? item.image[0] : item.image} alt={item.title} />
          <div className="portfolioOverlay">
            <button 
              className="viewProjectBtn"
              onClick={openModal}
            >
              Посмотреть проект
            </button>
          </div>
        </div>
        <div className="portfolioContent">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div className="portfolioTechnologies">
            {item.technologies.map((tech, index) => (
              <span key={index} className="techTag">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <div 
          className="modalOverlay projectDetailOverlay" 
          onClick={closeModal}
          ref={modalRef}
        >
          <div className="modalContent projectDetailContent" onClick={handleModalContentClick}>
            <button className="modalClose2" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"></path>
              </svg>
            </button>
            
            <div className="projectDetailHeader">  
              <span className="projectCategory">
                {item.category === 'website' ? 'Сайт' : 
                 item.category === 'shop' ? 'Магазин' : 
                 item.category === 'app' ? 'Приложение' : 'Проект'}
              </span>
              <h2>{item.title}</h2>
            </div>
            
            <div className="projectDetailImage">
              <div 
                className="imageSlider"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
              >
                <img 
                  src={images[currentSlide]} 
                  alt={`${item.title} - слайд ${currentSlide + 1}`} 
                  className="slider-image"
                />
                
                {/* Кнопки навигации показываем только если больше 1 изображения и не на мобильных */}
                {images.length > 1 && !isMobile && (
                  <>
                    <button 
                      className="sliderBtn prevBtn" 
                      onClick={prevSlide}
                      aria-label="Предыдущий слайд"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/>
                      </svg>
                    </button>
                    
                    <button 
                      className="sliderBtn nextBtn" 
                      onClick={nextSlide}
                      aria-label="Следующий слайд"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
                      </svg>
                    </button>
                  </>
                )}
                
                {/* Счетчик слайдов */}
                {images.length > 1 && (
                  <div className="slideCounter">
                    {currentSlide + 1} / {images.length}
                    {isMobile && images.length > 1 }
                  </div>
                )}
              </div>
            </div>
            
            <div className="projectDetailInfo">
              <div className="projectDescription">
                <h3>Описание проекта</h3>
                <p>{item.description}</p>
              </div>
              
              <div className="projectTechnologies">
                <h3>Используемые технологии</h3>
                <div className="techStack">
                  {item.technologies.map((tech, index) => (
                    <span key={index} className="techBadge">{tech}</span>
                  ))}
                </div>
              </div>
              
              <div className="projectFeatures">
                <h3>Ключевые особенности</h3>
                <ul>
                  {item.features && item.features.length > 0 ? (
                    item.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))
                  ) : (
                    <>
                      <li>Адаптивный дизайн под все устройства</li>
                      <li>Оптимизированная скорость загрузки</li>
                      <li>Удобная административная панель</li>
                      <li>SEO-оптимизация</li>
                      <li>Интеграция с внешними сервисами</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="projectActions">
                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="liveDemoBtn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  Посмотреть live
                </a>
                  <a 
                    href="https://wa.me/79319638381" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="contactBtn"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" style={{marginRight: '8px'}}>
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                    Обсудить похожий проект
                  </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PortfolioCard;