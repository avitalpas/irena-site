import "./App.css";

export default function App() {
  return (
    <div className="page">
      <header className="nav">
        <div className="brand">Irena Pasternak</div>
        <div className="lang">
          <span className="active">EN</span>
          <span className="disabled" title="Coming soon">RU</span>
          <span className="disabled" title="Coming soon">HE</span>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="heroInner">
            <p className="kicker">New single coming soon</p>
            <h1>Irena Pasternak</h1>
            <p className="sub">
              Cinematic Russian pop. Warm. Intimate. Golden hour.
            </p>
            <div className="ctaRow">
              <a className="btn primary" href="#newsletter">Get notified</a>
              <a className="btn ghost" href="#music">Listen</a>
            </div>
          </div>
        </section>

        <section className="section" id="music">
          <h2>Music</h2>
          <p className="muted">Add official links when ready.</p>
          <div className="links">
            <a className="card" href="#" onClick={(e) => e.preventDefault()}>Spotify</a>
            <a className="card" href="#" onClick={(e) => e.preventDefault()}>YouTube</a>
            <a className="card" href="#" onClick={(e) => e.preventDefault()}>Instagram</a>
            <a className="card" href="#" onClick={(e) => e.preventDefault()}>TikTok</a>
          </div>
        </section>

        <section className="section" id="about">
          <h2>About</h2>
          <p>
            Short bio goes here. 2–3 sentences in English for the first version.
          </p>
        </section>

        <section className="section" id="newsletter">
          <h2>Stay close</h2>
          <p className="muted">
            For now this is a placeholder button. Later we’ll connect a real mailing list.
          </p>
          <button className="btn primary" type="button">
            Notify me
          </button>
        </section>
      </main>

      <footer className="footer">
        <div className="muted">© {new Date().getFullYear()} Irena Pasternak</div>
      </footer>
    </div>
  );
}