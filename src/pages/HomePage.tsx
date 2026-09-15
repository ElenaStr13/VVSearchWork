import Hero from '../components/Hero/Hero';
import EmployerCTA from '../components/EmployerCTA/EmployerCTA';
import PopularCategories from '../components/PopularCategories/PopularCategories';
import FeaturedPartners from '../components/FeaturedPartners/FeaturedPartners';

const HomePage = () => {
  return (
    <>
      <Hero />
      <PopularCategories />
      <FeaturedPartners />
      <EmployerCTA />
    </>
  );
};

export default HomePage;