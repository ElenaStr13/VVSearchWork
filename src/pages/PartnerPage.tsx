import { useParams } from 'react-router-dom';

const PartnerPage = () => {
  const { slug } = useParams<{ slug: string }>();

  return (
    <section>
      <h1>Сторінка партнера</h1>
      <p>Partner: {slug}</p>
    </section>
  );
};

export default PartnerPage;