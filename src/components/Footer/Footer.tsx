import { Link } from 'react-router-dom';

import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              VV Work
            </Link>

            <p className="footer__description">
              Платформа для пошуку роботи та працівників
              у Європі.
            </p>
          </div>

          <div className="footer__column">
            <h2 className="footer__title">
              Кандидатам
            </h2>

            <Link
              to="/vacancies"
              className="footer__link"
            >
              Знайти роботу
            </Link>

            <Link
              to="/contacts"
              className="footer__link"
            >
              Контакти
            </Link>
          </div>

          <div className="footer__column">
            <h2 className="footer__title">
              Роботодавцям
            </h2>

            <Link
              to="/contacts"
              className="footer__link"
            >
              Знайти працівника
            </Link>

            <Link
              to="/contacts"
              className="footer__link"
            >
              Розмістити вакансію
            </Link>
          </div>

          <div className="footer__column">
            <h2 className="footer__title">
              Контакти
            </h2>

            <a
              href="mailto:info@vvwork.eu"
              className="footer__link"
            >
              info@vvwork.eu
            </a>

            <a
              href="tel:+48123456789"
              className="footer__link"
            >
              +48 123 456 789
            </a>

            <a
              href="https://t.me/vvwork"
              target="_blank"
              rel="noreferrer"
              className="footer__link"
            >
              Telegram
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © 2026 VV Work. Усі права захищені.
          </p>

          <div className="footer__legal">
            <a
              href="#privacy"
              className="footer__legal-link"
            >
              Політика конфіденційності
            </a>

            <a
              href="#terms"
              className="footer__legal-link"
            >
              Умови використання
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;