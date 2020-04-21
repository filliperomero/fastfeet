import React from 'react';
import { NavLink, Link } from 'react-router-dom';

import logo from '~/assets/logo.png';

import { Container, Content, Navigation, Profile } from './styles';

export default function Header() {
  function handleSignOut() {}

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="FastFeet" />
          </Link>

          <Navigation>
            <NavLink to="/deliveries">ENCOMENDAS</NavLink>
            <NavLink to="/deliverymen">ENTREGADORES</NavLink>
            <NavLink to="/recipients">DESTINATÁRIOS</NavLink>
            <NavLink to="/problems">PROBLEMAS</NavLink>
          </Navigation>
        </nav>

        <aside>
          <Profile>
            <strong>Admin FastFeet</strong>
            <button type="button" onClick={handleSignOut}>
              sair do sistema
            </button>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
