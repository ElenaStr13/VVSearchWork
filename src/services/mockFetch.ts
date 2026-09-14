export const mockFetch = async <T>(data: T): Promise<T> => {
  const delay = Math.floor(Math.random() * 501) + 300;

  await new Promise((resolve) => {
    setTimeout(resolve, delay);
  });

  const shouldFail = Math.random() < 0.2;

  if (shouldFail) {
    throw new Error('Помилка завантаження даних');
  }

  return data;
};