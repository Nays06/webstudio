import React from 'react';

const ProjectTypes = ({ selectedProjectType, onSelectProjectType }) => {
  const projectTypes = [
    {
      id: 'landing',
      title: "Лендинг",
      description: "Одностраничный сайт для презентации продукта или услуги",
      price: "от 15 000 ₽",
      features: ["Адаптивный дизайн", "Форма обратной связи", "SEO-оптимизация", "Интеграция с соцсетями"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M21 14V21H3V14H5V19H19V14H21ZM21 10H23V12H21V10ZM17 10H19V12H17V10ZM15 10H13V12H15V10ZM9 10H7V12H9V10ZM5 10H3V12H5V10ZM21 3V8H3V3H21ZM5 5V6H19V5H5Z"></path>
        </svg>
      )
    },
    {
      id: 'corporate',
      title: "Корпоративный сайт",
      description: "Многостраничный сайт для представления компании",
      price: "от 35 000 ₽",
      features: ["Система управления контентом", "Несколько страниц", "Каталог продукции", "Блог", "Мультиязычность"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18 2H6C4.895 2 4 2.895 4 4V20C4 21.105 4.895 22 6 22H18C19.105 22 20 21.105 20 20V4C20 2.895 19.105 2 18 2ZM10 4H14V6H10V4ZM18 20H6V8H18V20Z"></path>
        </svg>
      )
    },
    {
      id: 'ecommerce',
      title: "Интернет-магазин",
      description: "Полнофункциональная платформа для онлайн-продаж",
      price: "от 50 000 ₽",
      features: ["Корзина покупок", "Система оплаты", "Управление товарами", "Личный кабинет", "Система скидок"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 22H21V20H3V22ZM3 2H21V4H3V2ZM12 10C13.1046 10 14 9.10457 14 8C14 6.89543 13.1046 6 12 6C10.8954 6 10 6.89543 10 8C10 9.10457 10.8954 10 12 10ZM12 12C9.79086 12 8 10.2091 8 8C8 5.79086 9.79086 4 12 4C14.2091 4 16 5.79086 16 8C16 10.2091 14.2091 12 12 12ZM12 14C14.2091 14 16 15.7909 16 18H8C8 15.7909 9.79086 14 12 14ZM12 16C10.8954 16 10 16.8954 10 18H14C14 16.8954 13.1046 16 12 16Z"></path>
        </svg>
      )
    },
    {
      id: 'webapp',
      title: "Веб-приложение",
      description: "Сложное приложение с бизнес-логикой",
      price: "от 70 000 ₽",
      features: ["Админ-панель", "База данных", "API интеграции", "Пользовательские роли", "Аналитика"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11H2V20C2 21.6569 3.34315 23 5 23H19C20.6569 23 22 21.6569 22 20V11H20V20ZM14 9H16V7H14V9ZM8 9H10V7H8V9ZM2 5V9H22V5H2ZM4 7H6V9H4V7ZM20 7H18V9H20V7ZM13 1H11V3H13V1ZM7.5 2.70711L6.79289 2L5.37868 3.41421L6.08579 4.12132L7.5 2.70711ZM18.6213 3.41421L17.2071 2L16.5 2.70711L17.9142 4.12132L18.6213 3.41421Z"></path>
        </svg>
      )
    },
    {
      id: 'telegram-bot',
      title: "Telegram бот",
      description: "Автоматизация процессов через Telegram",
      price: "от 20 000 ₽",
      features: ["Автоответчик", "Интеграция с API", "Панель управления", "База данных", "Мультиязычность"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM15.53 8.53L9.53 14.53C9.24 14.82 8.76 14.82 8.47 14.53C8.18 14.24 8.18 13.76 8.47 13.47L14.47 7.47C14.76 7.18 15.24 7.18 15.53 7.47C15.82 7.76 15.82 8.24 15.53 8.53Z"></path>
        </svg>
      )
    }
  ];

  return (
    <div className="projectTypesContainer">
      <h2>Выберите тип проекта</h2>
      <div className="projectTypesGrid">
        {projectTypes.map((project) => (
          <div 
            className={`projectTypeCard ${selectedProjectType === project.id ? 'selected' : ''}`}
            key={project.id}
            onClick={() => onSelectProjectType(project.id)}
          >
            <div className="projectTypeIcon">
              {project.icon}
            </div>
            <h3>{project.title}</h3>
            <p className="projectDescription">{project.description}</p>
            <p className="projectPrice">{project.price}</p>
            <ul className="projectFeatures">
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="selectIndicator">
              {selectedProjectType === project.id ? '✓ Выбрано' : 'Выбрать'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectTypes;