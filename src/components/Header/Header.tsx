import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
    <div className="header__container">
    <Link to="/" className="header__logo">
              VV Work
            </Link>
      <nav className="header__nav">
        <Link to="/">VV Work</Link>

        <Link to="/">Знайти роботу</Link>
        <Link to="/partners/vv-work">Партнери</Link>
        <Link to="/contacts">Контакти</Link>
      </nav>
      </div>
    </header>
  );
};

export default Header;