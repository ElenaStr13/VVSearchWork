import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { Partner } from '../../types/partner';
import { partners } from '../../data/partners';
import { mockFetch } from '../../services/mockFetch';

import './FeaturedPartners.css';

const FeaturedPartners = () => {
  const [partnersList, setPartnersList] = useState<Partner[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadPartners = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const data = await mockFetch<Partner[]>(partners);

      setPartnersList(data);
    } catch {
      setError('Не вдалося завантажити роботодавців.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPartners();
  }, [loadPartners]);

  if (isLoading) {
    return (
      <section className="partners">
        <div className="partners__container">
          <h2 className="partners__title">Наші роботодавці</h2>

          <div className="partners__grid">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="partner-card partner-card--skeleton"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="partners">
        <div className="partners__container partners__error">
          <p>{error}</p>

          <button
            type="button"
            className="partners__retry"
            onClick={() => void loadPartners()}
          >
            Спробувати ще раз
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="partners">
      <div className="partners__container">
        <p className="partners__eyebrow">Компанії та агенції</p>

        <h2 className="partners__title">
          Перевірені роботодавці
        </h2>

        <p className="partners__description">
          Переглядайте роботодавців та знаходьте актуальні вакансії
          в різних країнах Європи.
        </p>

        <div className="partners__grid">
          {partnersList.map((partner) => (
            <article className="partner-card" key={partner.id}>
              <div className="partner-card__country">
                {partner.country}
              </div>

              <h3 className="partner-card__title">
                {partner.name}
              </h3>

              <p className="partner-card__location">
                {partner.city}, {partner.country}
              </p>

              <p className="partner-card__description">
                {partner.description}
              </p>

              <Link
                to={`/partners/${partner.slug}`}
                className="partner-card__link"
              >
                Переглянути вакансії →
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPartners;