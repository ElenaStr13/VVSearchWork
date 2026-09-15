import { useNavigate } from 'react-router-dom';

import type { VacancyCategory } from '../../types/vacancy';

import './PopularCategories.css';

interface CategoryItem {
  name: VacancyCategory;
  title: string;
  description: string;
}

const categories: CategoryItem[] = [
  {
    name: 'Construction',
    title: 'Будівництво',
    description: 'Будівельники та допоміжні працівники',
  },
  {
    name: 'Manufacturing',
    title: 'Виробництво',
    description: 'Робота на виробництві та підприємствах',
  },
  {
    name: 'Logistics',
    title: 'Логістика',
    description: 'Склади та логістичні центри',
  },
  {
    name: 'Hospitality',
    title: 'Готелі та ресторани',
    description: 'Робота у сфері гостинності',
  },
  {
    name: 'IT',
    title: 'IT',
    description: 'Вакансії у сфері технологій',
  },
  {
    name: 'Drivers',
    title: 'Водії',
    description: 'Вакансії для водіїв різних категорій',
  },
  {
    name: 'Other',
    title: 'Інше',
    description: 'Інші актуальні вакансії',
  },
];

const PopularCategories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (
    category: VacancyCategory,
  ) => {
    navigate(
      `/vacancies?category=${encodeURIComponent(category)}`,
    );
  };

  return (
    <section className="categories">
      <div className="categories__container">
        <div className="categories__header">
          <p className="categories__eyebrow">
            Оберіть напрямок
          </p>

          <h2 className="categories__title">
            Популярні категорії
          </h2>

          <p className="categories__description">
            Знайдіть вакансії у сфері, яка вам підходить.
          </p>
        </div>

        <div className="categories__grid">
          {categories.map((category) => (
            <button
              key={category.name}
              type="button"
              className="category-card"
              onClick={() =>
                handleCategoryClick(category.name)
              }
            >
              <span className="category-card__title">
                {category.title}
              </span>

              <span className="category-card__description">
                {category.description}
              </span>

              <span className="category-card__link">
                Переглянути вакансії →
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;