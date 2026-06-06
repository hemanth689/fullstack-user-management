import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageRoutes from "./routes/PageRoutes";
import { useTranslation } from 'react-i18next';

export default function App() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <BrowserRouter>
      <ToastContainer />
      <div style={{ marginTop: "20px" }}>
        <button onClick={() => changeLanguage('en')} style={{ marginRight: "10px" }}>
          English
        </button>
        <button onClick={() => changeLanguage('hi')}>
          हिन्दी
        </button>
      </div>
      <PageRoutes />
    </BrowserRouter>
  );
}
