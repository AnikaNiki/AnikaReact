import { FavoritesCard } from '../../components/favorites-card/favorites-card';

function FavoritesPage() {
  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img className="header__logo" src="/img/logo.svg" alt="6 cities logo" width="81" height="41" />
              </a>
            </div>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <a className="header__nav-link header__nav-link--profile" href="favorites.html">
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__user-name user__name">[email protected]</span>
                    <span className="header__favorite-count">3</span>
                  </a>
                </li>
                <li className="header__nav-item">
                  <a className="header__nav-link" href="login.html">
                    <span className="header__signout">Sign out</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesCard
                    name="Nice, cozy, warm big bed apartment"
                    price={180}
                    type="Apartment"
                    image="/img/apartment-01.jpg"
                    isPremium={true}
                  />
                  <FavoritesCard
                    name="Wood and stone place"
                    price={80}
                    type="Private room"
                    image="/img/room.jpg"
                    isPremium={false}
                  />
                </div>
              </li>
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">
                  <FavoritesCard
                    name="White castle"
                    price={180}
                    type="Apartment"
                    image="/img/apartment-02.jpg"
                    isPremium={false}
                  />
                </div>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}

export { FavoritesPage };