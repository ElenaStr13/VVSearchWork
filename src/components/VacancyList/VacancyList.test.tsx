import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import VacancyList from './VacancyList';
import { getVacancies } from '../../services/vacanciesApi';
import type { Vacancy } from '../../types/vacancy';

vi.mock('../../services/vacanciesApi', () => ({
  getVacancies: vi.fn(),
  getVacanciesByPartner: vi.fn(),
}));

const testVacancies: Vacancy[] = [
  {
    id: 1,
    partnerSlug: 'eurostaff',
    title: 'Будівельник',
    category: 'Construction',
    country: 'Poland',
    city: 'Warsaw',
    salary: '1600–1900 €',
    description: 'Будівельні роботи.',
  },
  {
    id: 2,
    partnerSlug: 'nordhire',
    title: 'Frontend Developer',
    category: 'IT',
    country: 'Germany',
    city: 'Berlin',
    salary: '2500–3200 €',
    description: 'Розробка вебінтерфейсів.',
  },
];

describe('VacancyList', () => {
  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('filters vacancies only after 500 ms debounce', async () => {
    vi.mocked(getVacancies).mockResolvedValue(testVacancies);

    render(
      <MemoryRouter>
        <VacancyList />
      </MemoryRouter>,
    );

    // Чекаємо завантаження вакансій.
    await waitFor(() => {
      expect(
        screen.getByText('Frontend Developer'),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText('Будівельник'),
    ).toBeInTheDocument();

    vi.useFakeTimers();

    const searchInput = screen.getByLabelText(
      'Пошук вакансії',
    );

    fireEvent.change(searchInput, {
      target: {
        value: 'Будівельник',
      },
    });

    // Одразу після введення фільтрація ще не працює.
    expect(
      screen.getByText('Frontend Developer'),
    ).toBeInTheDocument();

    // 499 ms — debounce ще не завершився.
    act(() => {
      vi.advanceTimersByTime(499);
    });

    expect(
      screen.getByText('Frontend Developer'),
    ).toBeInTheDocument();

    // Ще 1 ms — отримуємо рівно 500 ms.
    act(() => {
      vi.advanceTimersByTime(1);
    });

    // Тепер фільтрація повинна спрацювати.
    expect(
      screen.getByText('Будівельник'),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Frontend Developer'),
    ).not.toBeInTheDocument();

    expect(
      screen.getByText('Знайдено вакансій: 1'),
    ).toBeInTheDocument();
  });

  it('retries loading vacancies after an error', async () => {
    // Перший запит завершується помилкою.
    vi.mocked(getVacancies)
      .mockRejectedValueOnce(
        new Error('Помилка завантаження'),
      )
      // Другий запит після Retry буде успішним.
      .mockResolvedValueOnce(testVacancies);

    render(
      <MemoryRouter>
        <VacancyList />
      </MemoryRouter>,
    );

    // Після першої невдалої спроби
    // користувач бачить повідомлення про помилку.
    expect(
      await screen.findByText(
        'Не вдалося завантажити вакансії.',
      ),
    ).toBeInTheDocument();

    const retryButton = screen.getByRole(
      'button',
      {
        name: 'Спробувати ще раз',
      },
    );

    // Імітуємо натискання Retry.
    fireEvent.click(retryButton);

    // Після другого успішного запиту
    // вакансії повинні з'явитися.
    expect(
      await screen.findByText('Будівельник'),
    ).toBeInTheDocument();

    expect(
      screen.getByText('Frontend Developer'),
    ).toBeInTheDocument();

    // API повинен був викликатися двічі:
    // 1 — помилка
    // 2 — повторна спроба.
    expect(getVacancies).toHaveBeenCalledTimes(2);

    // Повідомлення про помилку після
    // успішного Retry повинно зникнути.
    expect(
      screen.queryByText(
        'Не вдалося завантажити вакансії.',
      ),
    ).not.toBeInTheDocument();
  });
});