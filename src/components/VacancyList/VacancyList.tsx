import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Link, useSearchParams} from 'react-router-dom';

import type {
  Vacancy,
  VacancyCategory,
} from '../../types/vacancy';

import {
  getVacancies,
  getVacanciesByPartner,
} from '../../services/vacanciesApi';
import { partners } from '../../data/partners';
import './VacancyList.css';
import ApplicationForm from '../ApplicationForm/ApplicationForm';

interface VacancyListProps {
  partnerSlug?: string;
}

const categories: VacancyCategory[] = [
  'Construction',
  'Manufacturing',
  'Logistics',
  'Hospitality',
  'IT',
  'Drivers',
  'Other',
];

const isVacancyCategory = (
  value: string | null,
): value is VacancyCategory => {
  return (
    value !== null &&
    categories.includes(value as VacancyCategory)
  );
};

const VacancyList = ({ partnerSlug }: VacancyListProps) => {
    const [searchParams] = useSearchParams();
  const [vacancies, setVacancies] = useState<Vacancy[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const categoryFromUrl = searchParams.get('category');

  const [selectedVacancy, setSelectedVacancy] =
    useState<Vacancy | null>(null);

  const [search, setSearch] = useState<string>('');
  const [debouncedSearch, setDebouncedSearch] =
    useState<string>('');

  const [selectedCategory, setSelectedCategory] =
    useState<VacancyCategory | 'All'>(() => {
      if (isVacancyCategory(categoryFromUrl)) {
        return categoryFromUrl;
      }

      return 'All';
    });

  const loadVacancies = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

     const data = partnerSlug
       ? await getVacanciesByPartner(partnerSlug)
       : await getVacancies();

      setVacancies(data);
    } catch {
      setError('Не вдалося завантажити вакансії.');
    } finally {
      setIsLoading(false);
    }
  }, [partnerSlug]);

  useEffect(() => {
    void loadVacancies();
  }, [loadVacancies]);

  //debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [search]);

useEffect(() => {
  if (isVacancyCategory(categoryFromUrl)) {
    setSelectedCategory(categoryFromUrl);
  } else {
    setSelectedCategory('All');
  }
}, [categoryFromUrl]);

  const filteredVacancies = useMemo(() => {
    const normalizedSearch =
      debouncedSearch.trim().toLowerCase();

    return vacancies.filter((vacancy) => {
      const matchesSearch = vacancy.title
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === 'All' ||
        vacancy.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [vacancies, debouncedSearch, selectedCategory]);

  if (isLoading) {
    return (
      <section className="vacancies">
        <div className="vacancies__container">
          <h2 className="vacancies__title">
            Актуальні вакансії
          </h2>

          <div className="vacancies__list">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="vacancy-card vacancy-card--skeleton"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="vacancies">
        <div className="vacancies__container vacancies__error">
          <p>{error}</p>

          <button
            type="button"
            className="vacancies__retry"
            onClick={() => void loadVacancies()}
          >
            Спробувати ще раз
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="vacancies">
      <div className="vacancies__container">
        <p className="vacancies__eyebrow">
          Робота в Європі
        </p>

        <h2 className="vacancies__title">
          Актуальні вакансії
        </h2>

        <div className="vacancies__filters">
          <div className="vacancies__field">
            <label htmlFor="vacancy-search">
              Пошук вакансії
            </label>

            <input
              id="vacancy-search"
              type="search"
              value={search}
              placeholder="Наприклад, водій"
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />
          </div>

          <div className="vacancies__field">
            <label htmlFor="vacancy-category">
              Категорія
            </label>

            <select
              id="vacancy-category"
              value={selectedCategory}
              onChange={(event) =>
                setSelectedCategory(
                  event.target.value as VacancyCategory | 'All',
                )
              }
            >
              <option value="All">
                Усі категорії
              </option>

              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="vacancies__count">
          Знайдено вакансій: {filteredVacancies.length}
        </p>

        {filteredVacancies.length === 0 ? (
          <div className="vacancies__empty">
            <h3>Вакансій не знайдено</h3>

            <p>
              Спробуйте змінити пошуковий запит або категорію.
            </p>
          </div>
        ) : (
          <div className="vacancies__list">
          {filteredVacancies.map((vacancy) => {
            const partner = partners.find(
              (partner) => partner.slug === vacancy.partnerSlug,
            );

            return (
              <article
                className="vacancy-card"
                key={vacancy.id}
              >
                <div className="vacancy-card__top">
                  <span className="vacancy-card__category">
                    {vacancy.category}
                  </span>

                  <span className="vacancy-card__salary">
                    {vacancy.salary}
                  </span>
                </div>

                <h3 className="vacancy-card__title">
                  {vacancy.title}
                </h3>

                {partner && (
                  <Link
                    to={`/partners/${partner.slug}`}
                    className="vacancy-card__partner"
                  >
                    Роботодавець: {partner.name}
                  </Link>
                )}

                <p className="vacancy-card__location">
                  {vacancy.city}, {vacancy.country}
                </p>

                <p className="vacancy-card__description">
                  {vacancy.description}
                </p>
                <button
                  type="button"
                  className="rounded-xl bg-purple-600 px-6 py-3 font-semibold text-white hover:bg-purple-700"
                  onClick={() => setSelectedVacancy(vacancy)}
                >
                  Відгукнутися
                </button>
              </article>
            );
          })}
          </div>
        )}
    {selectedVacancy && (
              <ApplicationForm
                vacancy={selectedVacancy}
                onClose={() => setSelectedVacancy(null)}
              />
            )}
      </div>
    </section>
  );
};

export default VacancyList;