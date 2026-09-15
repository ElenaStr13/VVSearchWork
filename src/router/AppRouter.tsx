import { Route, Routes } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import HomePage from '../pages/HomePage';
import PartnerPage from '../pages/PartnerPage';
import ContactsPage from '../pages/ContactsPage';
import VacanciesPage from '../pages/VacanciesPage';

const AppRouter = () => {
  return (
    <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />

            <Route
              path="/vacancies"
              element={<VacanciesPage />}
            />

            <Route
              path="/partners/:slug"
              element={<PartnerPage />}
            />

            <Route
              path="/contacts"
              element={<ContactsPage />}
            />
          </Route>
        </Routes>
  );
};

export default AppRouter;