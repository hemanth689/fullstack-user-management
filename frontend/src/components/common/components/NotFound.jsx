import React from 'react';
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation();
  return <h1 style={{marginLeft:'500px'}}>{t('404 Page Not Found...')}</h1>;
}
