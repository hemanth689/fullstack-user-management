import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Home() {
  const { t } = useTranslation();
  return <h1 style={{marginLeft:'500px'}}>{t('Welcome to Home Page')}</h1>;
}
