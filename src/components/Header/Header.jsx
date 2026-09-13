import { useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, NavLink } from "react-router";

import Icon from "@components/Icon";
import { APP_NAME } from "@constants/app";
import { PATHS } from "@routes/paths";

import "./Header.css";

const NAV_ITEMS = [
  { label: "Home", to: PATHS.HOME, end: true },
  { label: "Shop", to: PATHS.SHOP },
  { label: "Blog", to: PATHS.BLOG },
  { label: "Gallery", to: PATHS.GALLERY },
];

const SOCIAL_LINKS = [
  { label: "Facebook", icon: "facebook", href: "#" },
  { label: "Discord", icon: "discord", href: "#" },
  { label: "Twitch", icon: "twitch", href: "#" },
  { label: "YouTube", icon: "youtube", href: "#" },
];

function Header() {
  const [expanded, setExpanded] = useState(false);

  return (
    <header className="header">
      <div className="header__topbar d-none d-lg-block">
        <Container className="d-flex align-items-center justify-content-between">
          <ul className="header__social list-unstyled d-flex gap-3 mb-0">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a href={social.href} aria-label={social.label} className="sf-link-muted">
                  <Icon name={social.icon} />
                </a>
              </li>
            ))}
          </ul>
          <div className="d-flex align-items-center gap-4">
            <button type="button" className="header__icon-button" aria-label="Search">
              <Icon name="search" />
            </button>
            <button type="button" className="header__icon-button" aria-label="Login">
              <Icon name="login" />
            </button>
            <Link to={PATHS.CART} className="header__icon-button" aria-label="Cart">
              <Icon name="cart" />
              <span className="header__cart-count">0</span>
            </Link>
          </div>
        </Container>
      </div>

      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={setExpanded}
        className="header__navbar"
        collapseOnSelect
      >
        <Container>
          <Navbar.Brand as={Link} to={PATHS.HOME} className="header__brand">
            <img src="/assets/squadforce/logo.svg" alt={APP_NAME} />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navigation" className="header__toggle" />
          <Navbar.Collapse id="main-navigation">
            <Nav className="ms-auto align-items-lg-center gap-lg-1">
              {NAV_ITEMS.map((item) => (
                <Nav.Link
                  key={item.to}
                  as={NavLink}
                  to={item.to}
                  end={item.end}
                  className="header__link"
                  onClick={() => setExpanded(false)}
                >
                  {item.label}
                </Nav.Link>
              ))}
              <Link
                to={PATHS.SHOP}
                className="btn btn-primary ms-lg-3 mt-3 mt-lg-0"
                onClick={() => setExpanded(false)}
              >
                Buy Now
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
