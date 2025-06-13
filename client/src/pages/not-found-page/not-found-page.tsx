function NotFoundPage() {
  return (
    <div className="page">
      <header className="header">{/* Хедер */}</header>
      <main className="page__main">
        <div className="container">
          <h1>404 - Page Not Found</h1>
          <p>Sorry, the page you are looking for does not exist.</p>
          <a href="/">Go to Home</a>
        </div>
      </main>
    </div>
  );
}
export { NotFoundPage };