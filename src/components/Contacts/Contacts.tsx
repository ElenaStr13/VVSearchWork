import './Contacts.css';

const Contacts = () => {
  return (
    <section className="contacts">
      <div className="contacts__container">
        <div className="contacts__header">
          <p className="contacts__eyebrow">
            Зв’яжіться з нами
          </p>

          <h1 className="contacts__title">
            Контакти VV Work
          </h1>

          <p className="contacts__description">
            Маєте питання щодо вакансій або пошуку
            працівників? Зв’яжіться з командою VV Work
            зручним для вас способом.
          </p>
        </div>

        <div className="contacts__grid">
          <article className="contacts-card">
            <span className="contacts-card__label">
              Email
            </span>

            <h2 className="contacts-card__title">
              Напишіть нам
            </h2>

            <a
              className="contacts-card__link"
              href="mailto:info@vvwork.eu"
            >
              info@vvwork.eu
            </a>
          </article>

          <article className="contacts-card">
            <span className="contacts-card__label">
              Телефон
            </span>

            <h2 className="contacts-card__title">
              Зателефонуйте
            </h2>

            <a
              className="contacts-card__link"
              href="tel:+48123456789"
            >
              +48 123 456 789
            </a>
          </article>

          <article className="contacts-card">
            <span className="contacts-card__label">
              Telegram
            </span>

            <h2 className="contacts-card__title">
              Напишіть у Telegram
            </h2>

            <a
              className="contacts-card__link"
              href="https://t.me/vvwork"
              target="_blank"
              rel="noreferrer"
            >
              @vvwork
            </a>
          </article>
        </div>

        <div className="contacts__info">
          <div>
            <p className="contacts__info-label">
              Для кандидатів
            </p>

            <h2 className="contacts__info-title">
              Шукаєте роботу в Європі?
            </h2>

            <p className="contacts__info-text">
              Переглядайте актуальні вакансії та
              надсилайте заявку безпосередньо на
              вакансію, яка вас зацікавила.
            </p>
          </div>

          <div>
            <p className="contacts__info-label">
              Для роботодавців
            </p>

            <h2 className="contacts__info-title">
              Потрібні працівники?
            </h2>

            <p className="contacts__info-text">
              Зв’яжіться з VV Work, щоб дізнатися
              більше про розміщення вакансій і пошук
              кандидатів.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;