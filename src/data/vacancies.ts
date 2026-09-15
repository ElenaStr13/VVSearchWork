import type { Vacancy } from '../types/vacancy';

export const vacancies: Vacancy[] = [
  // CONSTRUCTION
  {
    id: 1,
    partnerSlug: 'globalwork',
    title: 'Будівельник',
    category: 'Construction',
    country: 'Netherlands',
    city: 'Rotterdam',
    salary: '1800–2200 €',
    description:
      'Виконання загальнобудівельних робіт на будівельному об’єкті.',
  },
  {
    id: 2,
    partnerSlug: 'eurostaff',
    title: 'Помічник будівельника',
    category: 'Construction',
    country: 'Poland',
    city: 'Kraków',
    salary: '1400–1700 €',
    description:
      'Допоміжні роботи на будівельних об’єктах.',
  },

  // MANUFACTURING
  {
    id: 3,
    partnerSlug: 'eurostaff',
    title: 'Працівник виробництва',
    category: 'Manufacturing',
    country: 'Poland',
    city: 'Łódź',
    salary: '1300–1600 €',
    description:
      'Робота на виробничій лінії та контроль якості продукції.',
  },
  {
    id: 4,
    partnerSlug: 'workpoint',
    title: 'Оператор виробничої лінії',
    category: 'Manufacturing',
    country: 'Czech Republic',
    city: 'Brno',
    salary: '1500–1800 €',
    description:
      'Контроль виробничого процесу та пакування продукції.',
  },

  // LOGISTICS
  {
    id: 5,
    partnerSlug: 'eurostaff',
    title: 'Працівник складу',
    category: 'Logistics',
    country: 'Poland',
    city: 'Warsaw',
    salary: '1300–1600 €',
    description:
      'Комплектація, сортування та пакування замовлень.',
  },
  {
    id: 6,
    partnerSlug: 'nordhire',
    title: 'Працівник логістичного центру',
    category: 'Logistics',
    country: 'Germany',
    city: 'Hamburg',
    salary: '1900–2300 €',
    description:
      'Приймання та підготовка товарів до відправлення.',
  },

  // HOSPITALITY
  {
    id: 7,
    partnerSlug: 'globalwork',
    title: 'Працівник готелю',
    category: 'Hospitality',
    country: 'Netherlands',
    city: 'Amsterdam',
    salary: '1700–2000 €',
    description:
      'Допомога персоналу готелю та підготовка номерів.',
  },
  {
    id: 8,
    partnerSlug: 'workpoint',
    title: 'Помічник кухаря',
    category: 'Hospitality',
    country: 'Czech Republic',
    city: 'Prague',
    salary: '1200–1500 €',
    description:
      'Підготовка продуктів та допомога персоналу кухні.',
  },

  // IT
  {
    id: 9,
    partnerSlug: 'nordhire',
    title: 'Frontend Developer',
    category: 'IT',
    country: 'Germany',
    city: 'Berlin',
    salary: '2500–3200 €',
    description:
      'Розробка вебінтерфейсів з використанням React та TypeScript.',
  },
  {
    id: 10,
    partnerSlug: 'nordhire',
    title: 'Junior QA Engineer',
    category: 'IT',
    country: 'Germany',
    city: 'Munich',
    salary: '2200–2700 €',
    description:
      'Тестування вебзастосунків та підготовка тестової документації.',
  },

  // DRIVERS
  {
    id: 11,
    partnerSlug: 'eurostaff',
    title: 'Водій категорії B',
    category: 'Drivers',
    country: 'Poland',
    city: 'Kraków',
    salary: '1500–1800 €',
    description:
      'Доставка товарів по місту та прилеглих районах.',
  },
  {
    id: 12,
    partnerSlug: 'nordhire',
    title: 'Водій категорії C',
    category: 'Drivers',
    country: 'Germany',
    city: 'Berlin',
    salary: '2200–2600 €',
    description:
      'Перевезення вантажів по регіону.',
  },

  // OTHER
  {
    id: 13,
    partnerSlug: 'globalwork',
    title: 'Прибиральник',
    category: 'Other',
    country: 'Netherlands',
    city: 'Utrecht',
    salary: '1500–1750 €',
    description:
      'Прибирання офісних та комерційних приміщень.',
  },
  {
    id: 14,
    partnerSlug: 'workpoint',
    title: 'Різноробочий',
    category: 'Other',
    country: 'Czech Republic',
    city: 'Ostrava',
    salary: '1300–1550 €',
    description:
      'Виконання різних допоміжних робіт.',
  },
];