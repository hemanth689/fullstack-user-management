import React from 'react';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const { t } = useTranslation();
  return <h1 style={{marginLeft:'500px'}}>{t('Welcome to Your Dashboard')}</h1>;
}
