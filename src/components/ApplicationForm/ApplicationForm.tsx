import { useState } from 'react';
import type { FormEvent } from 'react';

import type { Vacancy } from '../../types/vacancy';
import { submitApplication } from '../../services/applicationApi';

import './ApplicationForm.css';

interface ApplicationFormProps {
  vacancy: Vacancy;
  onClose: () => void;
}

interface FormErrors {
  name?: string;
  contact?: string;
  message?: string;
}

const ApplicationForm = ({
  vacancy,
  onClose,
}: ApplicationFormProps) => {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (name.trim().length < 2) {
      newErrors.name =
        'Ім’я повинно містити щонайменше 2 символи.';
    }

    const phoneRegex = /^\+?[0-9\s()-]{7,20}$/;
    const telegramRegex = /^@[a-zA-Z0-9_]{5,32}$/;

    const normalizedContact = contact.trim();

    if (
      !phoneRegex.test(normalizedContact) &&
      !telegramRegex.test(normalizedContact)
    ) {
      newErrors.contact =
        'Введіть коректний телефон або Telegram.';
    }

    if (message.length > 501) {
      newErrors.message =
        'Повідомлення не може перевищувати 500 символів.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!validate()) {
      return;
    }

    setSubmitError('');
    setIsSubmitting(true);

    // Optimistic UI:
    setIsSuccess(true);

    try {
      await submitApplication({
        vacancyId: vacancy.id,
        name: name.trim(),
        contact: contact.trim(),
        message: message.trim(),
      });
    } catch {
      // Rollback optimistic update
      setIsSuccess(false);

      setSubmitError(
        'Не вдалося надіслати заявку. Спробуйте ще раз.',
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="application-modal">
      <div className="application-modal__content">
        {isSuccess ? (
          <div className="application-success">
            <h2 className="application-success__title">
              Заявку надіслано!
            </h2>

            <p className="application-success__text">
              Вашу заявку на вакансію «{vacancy.title}»
              успішно відправлено.
            </p>

            <button
              type="button"
              className="application-success__button"
              onClick={onClose}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Надсилаємо...' : 'Закрити'}
            </button>
          </div>
        ) : (
          <>
            <div className="application-form__header">
              <div>
                <h2 className="application-form__title">
                  Відгукнутися
                </h2>

                <p className="application-form__vacancy">
                  Вакансія: {vacancy.title}
                </p>
              </div>

              <button
                type="button"
                className="application-form__close"
                onClick={onClose}
                aria-label="Закрити форму"
              >
                ×
              </button>
            </div>

            <form
              className="application-form"
              onSubmit={handleSubmit}
              noValidate
            >
              <div className="application-form__field">
                <label
                  className="application-form__label"
                  htmlFor="application-name"
                >
                  Ім’я *
                </label>

                <input
                  id="application-name"
                  className="application-form__input"
                  type="text"
                  value={name}
                  placeholder="Ваше ім’я"
                  onChange={(event) =>
                    setName(event.target.value)
                  }
                />

                {errors.name && (
                  <p className="application-form__error">
                    {errors.name}
                  </p>
                )}
              </div>

              <div className="application-form__field">
                <label
                  className="application-form__label"
                  htmlFor="application-contact"
                >
                  Телефон або Telegram *
                </label>

                <input
                  id="application-contact"
                  className="application-form__input"
                  type="text"
                  value={contact}
                  placeholder="+380501234567 або @username"
                  onChange={(event) =>
                    setContact(event.target.value)
                  }
                />

                {errors.contact && (
                  <p className="application-form__error">
                    {errors.contact}
                  </p>
                )}
              </div>

              <div className="application-form__field">
                <div className="application-form__label-row">
                  <label
                    className="application-form__label"
                    htmlFor="application-message"
                  >
                    Повідомлення
                  </label>

                  <span className="application-form__counter">
                    {message.length}/500
                  </span>
                </div>

                <textarea
                  id="application-message"
                  className="application-form__textarea"
                  value={message}
                  rows={4}
                  placeholder="Додаткове повідомлення роботодавцю"
                  onChange={(event) =>
                    setMessage(event.target.value)
                  }
                />

                {errors.message && (
                  <p className="application-form__error">
                    {errors.message}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="application-form__submit-error">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                className="application-form__submit"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? 'Надсилаємо...'
                  : 'Надіслати заявку'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationForm;