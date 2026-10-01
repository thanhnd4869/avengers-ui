import Alert from "react-bootstrap/Alert";

import Icon from "@components/Icon";

import "./AuthLayout.css";

const BENEFITS = [
  { icon: "bolt", text: "Keys delivered to your library instantly" },
  { icon: "key", text: "Every purchased key kept safe in one place" },
  { icon: "star", text: "Wishlist alerts when a game goes on sale" },
];

/**
 * Shared shell for the sign-in and sign-up pages: the form card on one side
 * and the reasons to have an account on the other, which collapse away on
 * small screens so the form comes first.
 */
function AuthLayout({ highlight, title, subtitle, error, children, footer }) {
  return (
    <section className="auth-page container">
      <div className="auth-page__grid">
        <div className="auth-card rounded">
          {/* Two-tone like the home page section headings: the leading word
              takes the accent colour. */}
          <h1 className="auth-card__title">
            {highlight ? <span className="text-primary">{highlight}</span> : null} {title}
          </h1>
          {subtitle ? <p className="auth-card__subtitle">{subtitle}</p> : null}

          {/* Announced as soon as it appears, so screen reader users hear why
              the submit did not go through. */}
          {error ? (
            <Alert variant="danger" className="auth-card__alert" role="alert">
              {error}
            </Alert>
          ) : null}

          {children}

          {footer ? <p className="auth-card__footer">{footer}</p> : null}
        </div>

        <aside className="auth-benefits d-none d-lg-flex" aria-label="Account benefits">
          <h2 className="auth-benefits__title">
            <span className="text-primary">Why</span> join us
          </h2>
          <ul className="list-unstyled mb-0 d-grid gap-4">
            {BENEFITS.map((benefit) => (
              <li key={benefit.icon} className="auth-benefits__item">
                <span className="auth-benefits__icon" aria-hidden="true">
                  <Icon name={benefit.icon} size={18} />
                </span>
                {benefit.text}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}

export default AuthLayout;
