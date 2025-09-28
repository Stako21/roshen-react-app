import { useState } from "react";
import cn from "classnames";
import "./Header.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const toggleMenu = () => {
    setIsActive((prev) => !prev);
    setIsOpen((prev) => !prev);
  };

  const handleLinkClick = () => {
    setIsActive(false);
    setIsOpen(false);
  };

  return (
    <header className="header">
      <div className="logo">
        <Link className="logoTitle" to="/" onClick={handleLinkClick}>
          Світ Трейдінг
        </Link>
        {/* <img src={logo} alt="img" /> */}
      </div>

      <div className={cn("navPages", { open: isOpen })}>
        <div className="topLine">
          <Link className="topLine-Title" to="/" onClick={handleLinkClick}>
            Світ Трейдінг
          </Link>
        </div>
        <nav className="nav">
          <ul className="listPages">
            <li>
              <Link to="/" onClick={handleLinkClick}>
                Головна
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={handleLinkClick}>
                Про нас
              </Link>
            </li>
            <li>
              <Link to="/documents" onClick={handleLinkClick}>
                Звітність
              </Link>
            </li>
            <li>
              <Link to="/contacts" onClick={handleLinkClick}>
                Контакти
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className={cn("burger", { active: isActive })} onClick={toggleMenu}>
        <span></span>
      </div>
    </header>
  );
};
