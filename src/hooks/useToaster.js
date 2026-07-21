// src/hooks/useToaster.js
import { useState, useCallback } from 'react';
import Toaster from '../components/toaster/Toaster';

export const useToaster = () => {
  const [toasters, setToasters] = useState([]);

  // Сначала объявляем removeToaster
  const removeToaster = useCallback((id) => {
    setToasters(prev => prev.filter(toaster => toaster.id !== id));
  }, []);

  // Затем showToaster, который использует removeToaster
  const showToaster = useCallback((message, type = 'success', duration = 3000) => {
    const id = Date.now();
    const newToaster = { id, message, type, duration };
    
    setToasters(prev => [...prev, newToaster]);
    
    // Автоматическое удаление после duration
    setTimeout(() => {
      removeToaster(id);
    }, duration);
  }, [removeToaster]); // ✅ removeToaster в зависимостях

  const ToasterContainer = useCallback(() => (
    <>
      {toasters.map(toaster => (
        <Toaster
          key={toaster.id}
          message={toaster.message}
          type={toaster.type}
          duration={toaster.duration}
          onClose={() => removeToaster(toaster.id)}
        />
      ))}
    </>
  ), [toasters, removeToaster]);

  return { showToaster, ToasterContainer };
};