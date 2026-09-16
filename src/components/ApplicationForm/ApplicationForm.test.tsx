import {
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import {
  afterEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest';

import ApplicationForm from './ApplicationForm';
import { submitApplication } from '../../services/applicationApi';
import type { Vacancy } from '../../types/vacancy';

vi.mock('../../services/applicationApi', () => ({
  submitApplication: vi.fn(),
}));

const testVacancy: Vacancy = {
  id: 1,
  partnerSlug: 'eurostaff',
  title: 'Будівельник',
  category: 'Construction',
  country: 'Poland',
  city: 'Warsaw',
  salary: '1600–1900 €',
  description: 'Будівельні роботи.',
};

describe('ApplicationForm', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it('shows validation errors for invalid form data', () => {
    render(
      <ApplicationForm
        vacancy={testVacancy}
        onClose={vi.fn()}
      />,
    );

    fireEvent.change(
      screen.getByLabelText('Ім’я *'),
      {
        target: {
          value: 'A',
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText('Телефон або Telegram *'),
      {
        target: {
          value: 'abc',
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText('Повідомлення'),
      {
        target: {
          value: 'a'.repeat(501),
        },
      },
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Надіслати заявку',
      }),
    );

    expect(
      screen.getByText(
        'Ім’я повинно містити щонайменше 2 символи.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Введіть коректний телефон або Telegram.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.getByText(
        'Повідомлення не може перевищувати 500 символів.',
      ),
    ).toBeInTheDocument();

    // При невалідних даних API не викликається.
    expect(submitApplication).not.toHaveBeenCalled();
  });

  it('submits valid form data and shows optimistic success', async () => {
    vi.mocked(submitApplication).mockResolvedValue({
      vacancyId: 1,
      name: 'Олена',
      contact: '@olena_test',
      message: 'Хочу відгукнутися на вакансію.',
    });

    render(
      <ApplicationForm
        vacancy={testVacancy}
        onClose={vi.fn()}
      />,
    );

    fireEvent.change(
      screen.getByLabelText('Ім’я *'),
      {
        target: {
          value: 'Олена',
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText('Телефон або Telegram *'),
      {
        target: {
          value: '@olena_test',
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText('Повідомлення'),
      {
        target: {
          value: 'Хочу відгукнутися на вакансію.',
        },
      },
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Надіслати заявку',
      }),
    );

    expect(
      screen.getByText('Заявку надіслано!'),
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(submitApplication).toHaveBeenCalledWith({
        vacancyId: 1,
        name: 'Олена',
        contact: '@olena_test',
        message: 'Хочу відгукнутися на вакансію.',
      });
    });

    expect(submitApplication).toHaveBeenCalledTimes(1);
  });

  it('rolls back optimistic success when submission fails', async () => {
    vi.mocked(submitApplication).mockRejectedValue(
      new Error('Request failed'),
    );

    render(
      <ApplicationForm
        vacancy={testVacancy}
        onClose={vi.fn()}
      />,
    );

    fireEvent.change(
      screen.getByLabelText('Ім’я *'),
      {
        target: {
          value: 'Олена',
        },
      },
    );

    fireEvent.change(
      screen.getByLabelText('Телефон або Telegram *'),
      {
        target: {
          value: '@olena_test',
        },
      },
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Надіслати заявку',
      }),
    );

    // Optimistic UI спочатку показує success.
    expect(
      screen.getByText('Заявку надіслано!'),
    ).toBeInTheDocument();

    // API завершується помилкою — success відкочується.
    expect(
      await screen.findByText(
        'Не вдалося надіслати заявку. Спробуйте ще раз.',
      ),
    ).toBeInTheDocument();

    expect(
      screen.queryByText('Заявку надіслано!'),
    ).not.toBeInTheDocument();

    expect(submitApplication).toHaveBeenCalledTimes(1);
  });
});