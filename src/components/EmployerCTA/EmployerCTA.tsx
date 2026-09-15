import { Link } from 'react-router-dom';

import './EmployerCTA.css';

const EmployerCTA = () => {
  return (
    <section className="employer-cta">
      <div className="employer-cta__container">
        <div className="employer-cta__content">
          <p className="employer-cta__eyebrow">
            Для роботодавців
          </p>

          <h2 className="employer-cta__title">
            Потрібні працівники?
          </h2>

          <p className="employer-cta__description">
            VV Work допомагає роботодавцям знаходити
            кандидатів для роботи в різних країнах Європи.
            Зв’яжіться з нами, щоб розповісти про свої
            вакансії та потреби.
          </p>
        </div>

        <Link
          to="/contacts"
          className="employer-cta__button"
        >
          Знайти працівника
        </Link>
      </div>
    </section>
  );
};

export default EmployerCTA;