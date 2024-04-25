// LanguageContext.js
import React, { createContext,useState } from 'react';
import i18next from '../../components/i18next'
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(i18next.language);

  const changeLanguage = (newLanguage) => {
    i18next.changeLanguage(newLanguage);
    setLanguage(newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
