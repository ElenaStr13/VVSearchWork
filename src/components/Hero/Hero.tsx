import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__content">
        <p className="hero__eyebrow">
          Робота в Європі — простіше
        </p>

        <h1 className="hero__title">
          Робота та працівники в Європі — в одному місці
        </h1>

        <p className="hero__description">
          VV Work допомагає кандидатам знаходити актуальні вакансії,
          а роботодавцям — потрібних працівників.
        </p>

        <div className="hero__actions">
          <button
            type="button"
            className="hero__button hero__button--primary"
          >
            Знайти роботу
          </button>

          <button
            type="button"
            className="hero__button hero__button--secondary"
          >
            Знайти працівника
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;