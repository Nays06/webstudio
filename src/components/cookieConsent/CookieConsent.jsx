// src/components/cookieConsent/CookieConsent.jsx
import { useState, useEffect } from 'react';
import './CookieConsent.scss';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, было ли уже принято соглашение
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Показываем баннер с задержкой для лучшего UX
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptCookies = () => {
    // Сохраняем согласие в localStorage
    localStorage.setItem('cookieConsent', 'accepted');
    setIsVisible(false);
    
    // Здесь можно добавить инициализацию аналитики и других сервисов
    console.log('Cookie согласие получено');
  };

  const rejectCookies = () => {
    // Сохраняем отказ в localStorage
    localStorage.setItem('cookieConsent', 'rejected');
    setIsVisible(false);
    
    // Отключаем необязательные cookies
    console.log('Cookie согласие отклонено');
  };

  const openPolicy = () => {
    // Открываем модальное окно с политикой конфиденциальности
    // В реальном проекте здесь должна быть ссылка на полную политику
    alert('Здесь будет отображена политика конфиденциальности');
  };

  if (!isVisible) return null;

  return (
    <div className="cookieConsent">
      <div className="cookieContent">
        <div className="cookieText">
          <h3>Мы используем cookie-файлы</h3>
          <p>
            Этот сайт использует cookie-файлы для улучшения работы и анализа трафика. 
            Продолжая использовать сайт, вы соглашаетесь с нашей{' '}
            <button onClick={openPolicy} className="policyLink">
              Политикой конфиденциальности
            </button>
          </p>
        </div>
        <div className="cookieActions">
          <button className="cookieReject" onClick={rejectCookies}>
            Не принимать
          </button>
          <button className="cookieAccept" onClick={acceptCookies}>
            Принять
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;