import { useParams } from 'react-router-dom';
import VacancyList from '../components/VacancyList/VacancyList';

const PartnerPage = () => {
  const { slug } = useParams<{ slug: string }>();

  if (!slug) {
    return <p>Роботодавця не знайдено.</p>;
  }

  return (
    <>
      <section>
        <h1>Вакансії роботодавця</h1>
      </section>

      <VacancyList partnerSlug={slug} />
    </>
  );
};

export default PartnerPage;