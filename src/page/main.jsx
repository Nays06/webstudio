import { useState, useEffect, useRef } from 'react'
import PortfolioGrid from '../components/portfolio/PortfolioGrid.jsx'
import ProjectTypes from '../components/projectTypes/ProjectTypes.jsx';
import { useToaster } from '../hooks/useToaster';
import './Main.scss'

function MainCont() {
  const [selectedService, setSelectedService] = useState(null);
  const { showToaster, ToasterContainer } = useToaster();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('all');
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [currentReview, setCurrentReview] = useState(0);
  const [selectedProjectType, setSelectedProjectType] = useState(null);
  const [projectModalStep, setProjectModalStep] = useState(1);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [counters, setCounters] = useState({
    projects: 0,
    clients: 0,
    years: 0
  });
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
    projectType: '',
    privacyConsent: false,
  });
  
  // Новые состояния для калькулятора
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [selectedServices, setSelectedServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const statsRef = useRef(null);

  const services = [
    {
      id: 'website',
      title: "Веб-сайты",
      description: "Корпоративные сайты и лендинги",
      detailedDescription: "Создаем современные адаптивные веб-сайты, которые эффективно представляют ваш бизнес в интернете. От корпоративных порталов до продающих лендингов.",
      linkText: "Подробнее",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 14V21H3V14H5V19H19V14H21ZM21 10H23V12H21V10ZM17 10H19V12H17V10ZM15 10H13V12H15V10ZM9 10H7V12H9V10ZM5 10H3V12H5V10ZM21 3V8H3V3H21ZM5 5V6H19V5H5Z"></path>
        </svg>
      )
    },
    {
      id: 'shop',
      title: "Интернет-магазины",
      description: "Онлайн-продажи и e-commerce",
      detailedDescription: "Разрабатываем полнофункциональные интернет-магазины с системами управления товарами, корзиной, оплатой и доставкой для успешного онлайн-бизнеса.",
      linkText: "Подробнее",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 22H21V20H3V22ZM3 2H21V4H3V2ZM12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10ZM12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12ZM12 14C14.2091 14 16 15.7909 16 18H8C8 15.7909 9.79086 14 12 14ZM12 16C10.8954 16 10 16.8954 10 18H14C14 16.8954 13.1046 16 12 16Z"></path>
        </svg>
      )
    },
    {
      id: 'app',
      title: "Веб-приложения",
      description: "Сложные пользовательские системы",
      detailedDescription: "Создаем сложные веб-приложения с богатой функциональностью, интуитивным интерфейсом и высокой производительностью для решения бизнес-задач.",
      linkText: "Подробнее",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11H2V20C2 21.6569 3.34315 23 5 23H19C20.6569 23 22 21.6569 22 20V11H20V20ZM14 9H16V7H14V9ZM8 9H10V7H8V9ZM2 5V9H22V5H2ZM4 7H6V9H4V7ZM20 7H18V9H20V7ZM13 1H11V3H13V1ZM7.5 2.70711L6.79289 2L5.37868 3.41421L6.08579 4.12132L7.5 2.70711ZM18.6213 3.41421L17.2071 2L16.5 2.70711L17.9142 4.12132L18.6213 3.41421Z"></path>
        </svg>
      )
    },
    {
      id: 'telegram',
      title: "Telegram боты",
      description: "Боты, приложения и сервисы",
      detailedDescription: "Разрабатываем интеллектуальные Telegram боты для автоматизации бизнес-процессов, онлайн-продаж, поддержки клиентов и интеграции с вашими системами. Создаем ботов-магазины, сервисные боты и многофункциональные приложения.",
      linkText: "Подробнее",
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.05 5.56-5.02c.242-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.652-.64.136-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
        </svg>
      )
    }
  ];

  const calculatorServices = [
    {
      id: 'design',
      title: "Дизайн",
      description: "Уникальный дизайн для вашего проекта",
      price: 15000,
      category: 'development'
    },
    {
      id: 'development',
      title: "Разработка",
      description: "Полнофункциональная разработка",
      price: 30000,
      category: 'development'
    },
    {
      id: 'adaptation',
      title: "Адаптивная верстка",
      description: "Под все устройства и браузеры",
      price: 5000,
      category: 'development'
    },
    {
      id: 'seo',
      title: "SEO оптимизация",
      description: "Продвижение в поисковых системах",
      price: 20000,
      category: 'promotion'
    },
    {
      id: 'context',
      title: "Контекстная реклама",
      description: "Настройка и ведение рекламных кампаний",
      price: 15000,
      category: 'promotion'
    },
    {
      id: 'smm',
      title: "SMM продвижение",
      description: "Продвижение в социальных сетях",
      price: 12000,
      category: 'promotion'
    },
    {
      id: 'support',
      title: "Техническая поддержка",
      description: "Ежемесячное обслуживание",
      price: 3000,
      category: 'additional'
    },
    {
      id: 'hosting',
      title: "Хостинг и домен",
      description: "На 1 год включительно",
      price: 6000,
      category: 'additional'
    }
  ];

  const reviews = [
    {
      id: 1,
      text: "Отличная работа! Сайт получился именно таким, как я хотел.",
      author: "Иван Смирнов",
      company: "Компьютерный клуб 'dojo'"
    },
    {
      id: 2,
      text: "Профессиональный подход и качественная реализация проекта.",
      author: "Анна Козлова",
      company: "Магазин 'Kerama Marazzi'"
    },
    {
      id: 3,
      text: "Быстрое выполнение, отличное качество. Рекомендую всем!",
      author: "Михаил Волков",
      company: "Компания 'ДМП'"
    },
    {
      id: 4,
      text: "Очень доволен сотрудничеством. Все сроки соблюдены.",
      author: "Дмитрий Петров",
      company: "Химчистка 'Кашемир'"
    },
    {
      id: 5,
      text: "Великолепный сервис и внимание к деталям!",
      author: "Сергей Иванов",
      company: "Сервис 'IFIXIT'"
    },
    {
      id: 6,
      text: "Быстрая реакция на правки и профессиональный подход.",
      author: "Ольга Кузнецова",
      company: "Салон 'Элит'"
    },
  ];

  // Функции для калькулятора
  const openCalculator = () => {
    setIsCalculatorOpen(true);
    setSelectedServices([]);
    setTotalPrice(0);
  };

  const closeCalculator = () => {
    setIsCalculatorOpen(false);
  };

  const toggleService = (service) => {
    setSelectedServices(prev => {
      const isSelected = prev.find(s => s.id === service.id);
      if (isSelected) {
        return prev.filter(s => s.id !== service.id);
      } else {
        return [...prev, service];
      }
    });
  };

  const openProjectModal = () => {
    setIsProjectModalOpen(true);
    setProjectModalStep(1);
    setSelectedProjectType(null);
    setFormData({
      name: '',
      phone: '',
      message: '',
      projectType: ''
    });
  };

  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  const handleSelectProjectType = (typeId) => {
    setSelectedProjectType(typeId);
    setFormData(prev => ({
      ...prev,
      projectType: typeId
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const nextStep = () => {
    if (selectedProjectType) {
      setProjectModalStep(2);
    }
  };

  const prevStep = () => {
    setProjectModalStep(1);
  };

  const submitProjectRequest = (e) => {
    e.preventDefault();
    
    if (!formData.privacyConsent) {
      showToaster('Для отправки заявки необходимо дать согласие на обработку персональных данных', 'error', 1000);
      return;
    }
    
    console.log("Данные формы:", formData);
    console.log("Тип проекта:", selectedProjectType);
    
    // Показываем успешный тостер
    showToaster('Ваша заявка отправлена! Мы свяжемся с вами в ближайшее время.', 'success', 6000);
    
    // Закрываем модальное окно с задержкой
    setTimeout(() => {
      closeProjectModal();
    }, 300);
  };

  const getVisibleReviews = () => {
    const visibleReviews = [];
    
    for (let i = 0; i < 3; i++) {
      const index = (currentReview + i) % reviews.length;
      visibleReviews.push(reviews[index]);
    }
    
    return visibleReviews;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animateCounters();
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Эффект для пересчета суммы калькулятора
  useEffect(() => {
    const newTotal = selectedServices.reduce((sum, service) => sum + service.price, 0);
    setTotalPrice(newTotal);
  }, [selectedServices]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const targetValues = {
      projects: 30,
      clients: 98,
      years: 3
    };

    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;

      setCounters({
        projects: Math.floor(targetValues.projects * progress),
        clients: Math.floor(targetValues.clients * progress),
        years: Math.floor(targetValues.years * progress)
      });

      if (step === steps) {
        clearInterval(timer);
        setCounters(targetValues);
      }
    }, interval);
  };

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const openModal = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
  };

  const toggleShowAll = () => {
    setShowAllProjects(!showAllProjects);
  };

  const handleViewPortfolio = () => {
    document.querySelector('.section__portfolio').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <>
      <div className="section__1">
        {/* <Header onOpenCalculator={openCalculator} /> */}
        <div className="sectionFirst">
          <h1>Студия веб-разработки</h1>
          <p>Создаем современные веб-сайты и умных Telegram ботов для роста вашего бизнеса. 
        Полный цикл разработки: от дизайна и верстки до запуска и поддержки. 
        Привлекайте клиентов, автоматизируйте процессы и увеличивайте продажи с помощью наших digital-решений.</p>
          <div className="sectionFirst__btn">
            <button className='startProject' onClick={openProjectModal}>Начать проект</button>
            <button className='viewPortfolio' onClick={handleViewPortfolio}>
              Смотреть Портфолио
            </button>
          </div>
        </div>  
      </div>
      
      {/* Модальное окно выбора проекта */}
      {isProjectModalOpen && (
        <div className="modalOverlay projectModalOverlay" onClick={closeProjectModal}>
          <div className="modalContent projectModalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalClose" onClick={closeProjectModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"></path>
              </svg>
            </button>
            
            {/* Оберточный контейнер для скролла */}
            <div className="modalScrollContent">
              {projectModalStep === 1 && (
                <ProjectTypes 
                  selectedProjectType={selectedProjectType}
                  onSelectProjectType={handleSelectProjectType}
                  services={services}
                />
              )}
              
              {projectModalStep === 2 && (
                <div className="contactFormStep">
                  <h2>Контактная информация</h2>
                  <p>Заполните данные для связи</p>
                  
                  <form className="projectContactForm">
                    <div className="formGroup">
                      <input
                        type="text"
                        name="name"
                        placeholder="Ваше имя *"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>                    
                    
                    <div className="formGroup">
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Номер телефона *"
                        maxLength={11}
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="formGroup">
                      <textarea
                        name="message"
                        placeholder="Расскажите о вашем проекте"
                        rows="5"
                        value={formData.message}
                        onChange={handleInputChange}
                      ></textarea>
                    </div>

                     <div className="privacyConsent">
        <label className="consentCheckbox">
          <input
            type="checkbox"
            name="privacyConsent"
            checked={formData.privacyConsent || false}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              privacyConsent: e.target.checked
            }))}
            required
          />
          <span className="checkmark"></span>
          <span className="consentText">
            Я даю согласие на обработку моих персональных данных в соответствии с 
            <button 
              type="button" 
              className="policyLink"
              onClick={() => window.open('/privacy-policy', '_blank')}
            >
              Политикой конфиденциальности
            </button> 
            и принимаю 
            <button 
              type="button" 
              className="policyLink"
              onClick={() => window.open('/user-agreement', '_blank')}
            >
              Пользовательское соглашение
            </button>
          </span>
        </label>
      </div>
                  </form>
                </div>
              )}
            </div>

            {/* Кнопки действий вне скролла */}
            <div className="modalActions">
              {projectModalStep === 1 ? (
                <>
                  <button className="modalSecondaryBtn" onClick={closeProjectModal}>
                    Отмена
                  </button>
                  <button 
                    className="modalPrimaryBtn" 
                    onClick={nextStep}
                    disabled={!selectedProjectType}
                  >
                    Далее →
                  </button>
                </>
              ) : (
                <>
                  <button className="modalSecondaryBtn" onClick={prevStep}>
                    ← Назад
                  </button>
                  <button 
                    className="modalPrimaryBtn"
                    onClick={submitProjectRequest}
                    disabled={!formData.name || !formData.phone || !formData.privacyConsent}
                  >
                    Отправить запрос
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно калькулятора стоимости */}
      {isCalculatorOpen && (
        <div className="modalOverlay calculatorOverlay" onClick={closeCalculator}>
          <div className="modalContent calculatorContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalClose" onClick={closeCalculator}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"></path>
              </svg>
            </button>
            
            <h2>Калькулятор стоимости</h2>
            <p>Выберите необходимые услуги</p>
            
            <div className="calculatorCategories">
              <div className="categorySection">
                <h3>Разработка</h3>
                <div className="servicesGrid">
                  {calculatorServices.filter(s => s.category === 'development').map(service => (
                    <div 
                      key={service.id} 
                      className={`serviceCheckbox ${selectedServices.find(s => s.id === service.id) ? 'selected' : ''}`}
                      onClick={() => toggleService(service)}
                    >
                      <div className="serviceInfo">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        <span className="servicePrice">+{service.price.toLocaleString()} ₽</span>
                      </div>
                      <div className="checkboxIndicator">
                        {selectedServices.find(s => s.id === service.id) ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="categorySection">
                <h3>Продвижение</h3>
                <div className="servicesGrid">
                  {calculatorServices.filter(s => s.category === 'promotion').map(service => (
                    <div 
                      key={service.id} 
                      className={`serviceCheckbox ${selectedServices.find(s => s.id === service.id) ? 'selected' : ''}`}
                      onClick={() => toggleService(service)}
                    >
                      <div className="serviceInfo">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        <span className="servicePrice">+{service.price.toLocaleString()} ₽</span>
                      </div>
                      <div className="checkboxIndicator">
                        {selectedServices.find(s => s.id === service.id) ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="categorySection">
                <h3>Дополнительно</h3>
                <div className="servicesGrid">
                  {calculatorServices.filter(s => s.category === 'additional').map(service => (
                    <div 
                      key={service.id} 
                      className={`serviceCheckbox ${selectedServices.find(s => s.id === service.id) ? 'selected' : ''}`}
                      onClick={() => toggleService(service)}
                    >
                      <div className="serviceInfo">
                        <h4>{service.title}</h4>
                        <p>{service.description}</p>
                        <span className="servicePrice">+{service.price.toLocaleString()} ₽</span>
                      </div>
                      <div className="checkboxIndicator">
                        {selectedServices.find(s => s.id === service.id) ? '✓' : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="calculatorTotal">
              <div className="totalPrice">
                <span>Примерная стоимость:</span>
                <strong>{totalPrice.toLocaleString()} ₽</strong>
              </div>
              
              {totalPrice > 0 && (
                <a 
                  href={`https://t.me/your_telegram?text=Здравствуйте! Хочу заказать услуги на сумму ${totalPrice} рублей. Выбранные услуги: ${selectedServices.map(s => s.title).join(', ')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="telegramButton"
                >
                   Связаться в Telegram
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="section__services">
        <div className="servicesTitle">
          <h1>Наши услуги</h1>
        </div>
        <div className="servicesContainer">
          {services.map((service, index) => (
            <div className="serviceCard" key={index}>
              <div className="serviceIcon">
                {service.icon}
              </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <button className="serviceLink" onClick={() => openModal(service)}>
                {service.linkText}
              </button>
            </div>
          ))}
        </div>

        <div className="statsContainer" ref={statsRef}>
          <div className="statItem">
            <div className="statNumber">{counters.projects}+</div>
            <div className="statLabel">Проектов</div>
          </div>
          <div className="statItem">
            <div className="statNumber">{counters.clients}%</div>
            <div className="statLabel">Довольных клиентов</div>
          </div>
          <div className="statItem">
            <div className="statNumber">{counters.years}+</div>
            <div className="statLabel">Года опыта</div>
          </div>
          <div className="statItem">
            <div className="statNumber">24/7</div>
            <div className="statLabel">Поддержка</div>
          </div>
        </div>
      </div>

      {/* Раздел Портфолио */}
      <div className="section__portfolio">
        <div className="portfolioTitle">
          <h1>Наше Портфолио</h1>
          <p>Посмотрите наши лучшие работы и проекты</p>
        </div>
        
        <div className="portfolioFilters">
          <button 
            className={activeFilter === 'all' ? 'filterBtn active' : 'filterBtn'}
            onClick={() => setActiveFilter('all')}
          >
            Все проекты
          </button>
          <button 
            className={activeFilter === 'website' ? 'filterBtn active' : 'filterBtn'}
            onClick={() => setActiveFilter('website')}
          >
            Сайты
          </button>
          {/* <button 
            className={activeFilter === 'app' ? 'filterBtn active' : 'filterBtn'}
            onClick={() => setActiveFilter('app')}
          >
            Приложения
          </button> */}
          <button 
            className={activeFilter === 'shop' ? 'filterBtn active' : 'filterBtn'}
            onClick={() => setActiveFilter('shop')}
          >
            Магазины
          </button>
        </div>
        
        <PortfolioGrid 
          activeFilter={activeFilter}
          showAll={showAllProjects}
          onToggleShowAll={toggleShowAll}
        />
      </div>

      {/* Раздел Отзывы */}
      <div className="section__reviews">
        <div className="reviewsTitle">
          <h1>Отзывы клиентов</h1>
          <p>Что говорят наши клиенты о качестве нашей работы</p>
        </div>
        
        <div className="reviewsCarousel">
          <button className="carouselBtn carouselBtnPrev" onClick={prevReview}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="CurrentColor">
              <path d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"/>
            </svg>
          </button>
          
          <div className="reviewsContainer">
            {getVisibleReviews().map((review) => (
              <div className="reviewCard" key={review.id}>
                <div className="reviewContent">
                  <p className="reviewText">"{review.text}"</p>
                  <div className="reviewAuthor">
                    <h4>{review.author}</h4>
                    <span>{review.company}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <button className="carouselBtn carouselBtnNext" onClick={nextReview}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8.59 16.59L10 18L16 12L10 6L8.59 7.41L13.17 12L8.59 16.59Z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Модальное окно */}
      {isModalOpen && (
        <div className="modalOverlay" onClick={closeModal}>
          <div className="modalContent" onClick={(e) => e.stopPropagation()}>
            <button className="modalClose" onClick={closeModal}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 10.586L16.95 5.63599L18.364 7.04999L13.414 12L18.364 16.95L16.95 18.364L12 13.414L7.04999 18.364L5.63599 16.95L10.586 12L5.63599 7.04999L7.04999 5.63599L12 10.586Z"></path>
              </svg>
            </button>
            <div className="modalIcon">
              {selectedService.icon}
            </div>
            <h2>{selectedService.title}</h2>
            <p>{selectedService.detailedDescription}</p>
            <button className="modalActionBtn">Обсудить проект</button>
          </div>
        </div>
      )}
      <ToasterContainer />
    </>
  )
}

export default MainCont