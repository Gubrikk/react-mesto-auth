import React from 'react';
import headerLogo from '../images/Vector-logo.svg';
import { Link, useLocation } from 'react-router-dom';

export default function Header({ loggedIn, onSignOut, email }) {
  const { pathname } = useLocation();
  const pathText = `${pathname === '/sign-in' ? 'Регистрация' : 'Войти'}`;
  const pathRoute = `${pathname === '/sign-in' ? '/sign-up' : '/sign-in'}`;

  return (
    <header className="header">
      <img src={headerLogo} alt="Логотип сайта Место" className="header__logo" />
      <div className="header__wrapper">
        {loggedIn ? (<>
            <p className="header__email">{email}</p>
            <Link to="" className="header__link header__link_active_exit" onClick={onSignOut}>Выйти</Link>
            </>)
            : (<Link to={pathRoute} className="header__link">{pathText}</Link>)
        }
        </div>
    </header>
  )
}