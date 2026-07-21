import React from 'react';
import PortfolioCard from './PortfolioCard';

function PortfolioGrid({ activeFilter, showAll, onToggleShowAll }) {
  const portfolioItems = [
    {
      id: 1,
      title: "Лендинг арены Dojo",
      category: "website",
      image: ["/assets/portfolio/dojo/logo.svg", "/assets/portfolio/dojo/dojo1.png", "/assets/portfolio/dojo/dojo2.png", "/assets/portfolio/dojo/dojo3.png", "/assets/portfolio/dojo/dojo4.png"],
      description: "Лендинг для компьютерного клуба с системой онлайн бронирования мест",
      link: "https://dojo.wtf/",
      technologies: ["Tilda", "Restoplace"],
      features: [
        "Система онлайн-бронирования компьютеров",
        "Расписание турниров и ивентов",
        "Интерактивная карта расположения ПК",
        "Специальные тарифы и акции",
        "Интеграция с Discord/Twitch"
      ]
    },
    {
      id: 2,
      title: "Сайт для химчистки Кашемир",
      category: "website",
      image: ["/assets/portfolio/kashemi/logo.svg", "/assets/portfolio/kashemi/kashemi2.png"],
      description: "Современный сайт для химчистки с услугой забора и доставки одежды",
      link: "https://kashemi.ru/",
      technologies: ["Next.js", "Яндекс Карты"],
      features: [
        "Онлайн-заказ услуг химчистки",
        "Система расчета стоимости услуг",
        "Интеграция с Bitrix24 для заявок",
        "Карта с зоной обслуживания доставки",
        "Личный кабинет клиента",
        "Система онлайн-оплаты",
        "Мобильная версия с адаптивным дизайном"
      ]
    },
    {
      "id": 3,
      "title": "Образовательная платформа",
      "category": "website",
      "image": ["/assets/portfolio/ailam/ailam.svg"],
      "description": "Современная онлайн-платформа для обучения с доступом к видеоурокам",
      "link": "https://ailam.online/",
      "technologies": ["Next.js", "TypeScript", "PostgreSQL"],
      "features": [
        "Каталог курсов с фильтрацией по категориям",
        "Видеоуроки с встроенным плеером и субтитрами",
        "Интерактивные тесты и задания для самопроверки",
        "Личный кабинет с прогрессом обучения",
        "Система онлайн-оплаты и подписок (Stripe)",
        "Выдача сертификатов по окончании курса",
        "Адаптивный дизайн для всех устройств"
      ]
    },
    {
      id: 4,
      title: "Cайт Kerama Marazzi",
      category: "shop",
      image: "/assets/portfolio/kerama-marazzi/logo.svg",
      description: "Официальный сайт крупнейшего российского производителя керамической плитки",
      link: "https://kerama-marazzi.ru/",
      technologies: ["WordPress", "WooCommerce", "Адаптивный дизайн"],
      "features": [
        "Каталог продукции с 5000+ позиций",
        "Интерактивный подбор плитки",
        "Поиск по коллекциям и характеристикам",
        "Локатор фирменных магазинов",
        "Раздел для дизайнеров и архитекторов",
        "Новости компании и события",
        "Калькулятор расхода материалов",
        "Виртуальные примерочные"
      ]
    },
    {
      id: 5,
      title: "Сервис IFIXIT",
      category: "shop",
      image: "/assets/portfolio/ifixit/logo.png",
      description: "Онлайн-магазин и сервисный центр по ремонту и продаже техники Apple",
      link: "https://ifixit26.ru/",
      technologies: ["Next.js", "Online-payment", "CRM"],
      "features": [
        "Онлайн-покупка устройств Apple",
        "Запись на ремонт и диагностику",
        "Корзина и оформление заказа",
        "Оплата онлайн",
        "Трекинг статуса ремонта",
        "Калькулятор стоимости услуг",
        "Каталог запчастей и аксессуаров",
        "Акции и скидки",
        "Отзывы и рейтинги"
      ]
    },
    {
    "id": 6,
    "title": "Vkusno i Bistro",
    "category": "shop",
    "image": "https://vkusnoibistro.com/application/assets/logo-white.1e3167d7.svg",
    "description": "Сервис доставки готовой еды и продуктов с широкой географией покрытия.",
    "link": "https://vkusnoibistro.com/application/",
    "technologies": ["Vue", "JavaScript", "API геолокации"],
    "features": [
      "Каталог блюд и продуктов с возможностью заказа от 1-й позиции",
      "Оптовые заказы для юридических лиц и мероприятий",
      "Автоматическое определение города и зоны покрытия по геолокации",
      "Интерактивная карта для выбора адреса доставки",
      "Личный кабинет с историей заказов и системой баллов",
      "Гибкая система скидок и акций",
      "Адаптивный интерфейс для мобильных устройств"
    ]
    },
    {
      "id": 7,
      "title": "Zvet",
      "category": "shop",
      "image": "/assets/portfolio/zvet/logo.svg",
      "description": "Интернет-магазин мягкой мебели от производителя с собственным производством.",
      "link": "https://zvet.ru/",
      "technologies": ["Vue 3", "JavaScript", "API", "Система скидок и бонусов"],
      "features": [
        "Каталог диванов с фильтрацией по размерам, материалам и ценам",
        "Детальные карточки товаров с характеристиками (габариты, сроки доставки, скидки)",
        "Система накопления бонусных баллов (баллы Плюса)",
        "Возможность покупки с предоплатой или оплатой при доставке",
        "Беспроцентная рассрочка на 12 месяцев",
        "Интеграция с картой для расчёта доставки по Москве и области",
        "Адаптивный дизайн для мобильных устройств"
      ]
    },
    {
      "id": 8,
      "title": "Lineaflex",
      "category": "shop",
      "image": "/assets/portfolio/lineaflex/logo.svg",
      "description": "Интернет-магазин ортопедических матрасов из латекса от производителя с гарантией 25 лет.",
      "link": "https://www.lineaflex.ru/",
      "technologies": ["Nuxt 3", "JavaScript", "API"],
      "features": [
        "Каталог матрасов с фильтрацией по размеру, жесткости и цене",
        "Детальные карточки товаров с характеристиками и скидками",
        "Галерея проектов с примерами работ",
        "Информация о сертификатах и экологичности материалов",
        "Собственный сервис и гарантийное обслуживание",
        "Адаптивный дизайн для мобильных устройств"
      ]
    },
    {
    "id": 9,
    "title": "Ecolaif",
    "category": "website",
    "image": "/assets/portfolio/ecolaif/ecolaif.svg",
    "description": "Единый региональный оператор по вывозу и утилизации ТКО в Ингушетии.",
    "link": "https://ecolaif.ru/",
    "technologies": ["React", "Next.js", "TypeScript"],
    "features": [
      "Интерактивная карта зоны обслуживания",
      "Информация для физических и юридических лиц",
      "Новостной блог компании",
      "Калькулятор тарифов",
      "Обратная связь для заключения договора"
    ]
    },
    {
      "id": 10,
      "title": "Gargalo",
      "category": "website",
      "image": "/assets/portfolio/gargalo/logo.svg",
      "description": "Социальная сеть для создания и исследования семейной истории. Стройте генеалогическое древо.",
      "link": "https://gargalo.ru/",
      "technologies": ["React", "TypeScript", "GraphQL", "Neo4j"],
      "features": [
        "Интерактивное построение семейного древа с drag-and-drop",
        "Поиск и добавление родственников с указанием связей",
        "Профили членов семьи с фото, датами и биографией",
        "Таймлайн жизни семьи и важных событий",
        "Приватные и публичные настройки видимости древа",
        "Совместное редактирование с приглашением родственников",
        "Экспорт древа в PDF/PNG/GEDCOM"
      ]
    },
    {
    "id": 11,
    "title": "Cabalance",
    "category": "website",
    "image": "https://cabalance.ru/img/svg/%D0%9B%D0%BE%D0%B3%D0%BE.svg",
    "description": "Бухгалтерские и юридические услуги для бизнеса с 2020 года.",
    "link": "https://cabalance.ru/",
    "technologies": ["JavaScript"],
    "features": [
      "Калькулятор тарифов на бухгалтерские услуги",
      "Прайс-лист на регистрацию и ликвидацию юридических лиц",
      "Описание схемы сотрудничества",
      "Формы для онлайн-заявок",
      "Портфолио с количеством клиентов и сэкономленных средств"
    ]
    },
    {
      id: 12,
      title: "Корпоративный сайт ДМП",
      category: "website",
      image: ["/assets/portfolio/dmprocess/logo.png", "/assets/portfolio/dmprocess/dmprocess1.png"],
      description: "Официальный сайт компании-поставщика технологий для молочной промышленности",
      link: "https://dmprocess.ru/",
      technologies: ["React", "CMS"],
      features: [
        "Презентация технологий и оборудования",
        "Каталог производимой продукции",
        "Блог с новостями компании",
        "Контакты и география работы",
        "Мультиязычная поддержка"
      ]
    },
  ];

  const filteredPortfolio = activeFilter === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeFilter);

  const displayedItems = showAll ? filteredPortfolio : filteredPortfolio.slice(0, 4);

  return (
    <>
      <div className="portfolioContainer">
        {displayedItems.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>

      {filteredPortfolio.length > 4 && (
        <div className="portfolioShowMore">
          <button className="showAllBtn" onClick={onToggleShowAll}>
            {showAll ? 'Скрыть' : `Показать все (${filteredPortfolio.length - 4})`}
          </button>
        </div>
      )}
    </>
  );
}

export default PortfolioGrid;