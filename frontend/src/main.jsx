import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './redux/store';
import './i18n/i18n.js';
import ErrorBoundary from './components/common/components/ErrorBoundary.jsx';
import axiosInstance from './utils/axiosInstance.js';
import { setupInterceptors } from "./utils/setupInterceptors.js";

setupInterceptors(axiosInstance, store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </Provider>
  </StrictMode>
)
