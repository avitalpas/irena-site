import { useEffect, useMemo, useRef, useState } from "react";
import "./styles/index.css";

import coverImg from "./assets/cover.png";
import logoImg from "./assets/Ira-logo.png";

const LINKS = {
  spotifyArtist: "https://open.spotify.com/artist/1YUZny2L3qJxTCD0A8e376",
  instagram: "https://www.instagram.com/irena_pasternak/",
  tiktok: "https://www.tiktok.com/@irena.pasternak?lang=en",
  facebook: "https://www.facebook.com/irena.pasternak.music/",
  youtubeChannel: "https://www.youtube.com/channel/UCFz5Nn6mBDch3T7QIwUqpSA",
};

function Icon({ name }) {
  switch (name) {
    case "spotify":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path
            fill="currentColor"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm4.592 14.392c-.19.31-.594.407-.9.217-2.467-1.51-5.574-1.852-9.234-1.02-.357.083-.714-.14-.796-.497-.083-.357.14-.714.497-.796 4.014-.91 7.46-.514 10.23 1.187.31.19.407.594.217.909Zm1.286-2.86c-.24.388-.748.51-1.136.27-2.825-1.737-7.13-2.24-10.47-1.222-.44.133-.904-.115-1.038-.554-.133-.44.115-.904.554-1.038 3.814-1.16 8.553-.6 11.81 1.4.388.24.51.748.27 1.145Zm.11-2.976c-3.387-2.013-8.98-2.2-12.214-1.218-.529.16-1.088-.14-1.248-.668-.16-.529.14-1.088.668-1.248 3.71-1.127 9.86-.91 13.76 1.41.476.283.633.898.35 1.374-.283.476-.898.633-1.374.35Z"
          />
        </svg>
      );
    case "youtube":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path
            fill="currentColor"
            d="M21.6 7.2a3 3 0 0 0-2.1-2.1C17.7 4.6 12 4.6 12 4.6s-5.7 0-7.5.5A3 3 0 0 0 2.4 7.2 31.7 31.7 0 0 0 2 12a31.7 31.7 0 0 0 .4 4.8 3 3 0 0 0 2.1 2.1c1.8.5 7.5.5 7.5.5s5.7 0 7.5-.5a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 22 12a31.7 31.7 0 0 0-.4-4.8ZM10 15.5v-7l6 3.5-6 3.5Z"
          />
        </svg>
      );
    case "instagram":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path
            fill="currentColor"
            d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 2A3.5 3.5 0 0 0 4 7.5v9A3.5 3.5 0 0 0 7.5 20h9a3.5 3.5 0 0 0 3.5-3.5v-9A3.5 3.5 0 0 0 16.5 4h-9ZM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Zm5.5-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2Z"
          />
        </svg>
      );
    case "tiktok":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path
            fill="currentColor"
            d="M16.6 3c.6 2.8 2.5 4.7 5.4 5v3.2c-1.9 0-3.6-.6-5-1.8v6.4c0 3.4-2.8 6.2-6.2 6.2S4.6 19.2 4.6 15.8s2.8-6.2 6.2-6.2c.4 0 .8 0 1.2.1v3.5c-.4-.2-.8-.3-1.2-.3-1.5 0-2.8 1.2-2.8 2.8s1.2 2.8 2.8 2.8 2.8-1.2 2.8-2.8V3h3Z"
          />
        </svg>
      );
    case "facebook":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path
            fill="currentColor"
            d="M13.5 22v-8h2.7l.5-3h-3.2V9.1c0-.9.3-1.5 1.6-1.5h1.7V4.9c-.3 0-1.4-.1-2.7-.1-2.7 0-4.5 1.6-4.5 4.6V11H7v3h2.6v8h3.9Z"
          />
        </svg>
      );
    case "menu":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path fill="currentColor" d="M4 6.5h16v2H4v-2Zm0 4.5h16v2H4v-2Zm0 4.5h16v2H4v-2Z" />
        </svg>
      );
    case "close":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path
            fill="currentColor"
            d="M18.3 5.7 12 12l6.3 6.3-1.4 1.4L10.6 13.4 4.3 19.7 2.9 18.3 9.2 12 2.9 5.7 4.3 4.3l6.3 6.3 6.3-6.3 1.4 1.4Z"
          />
        </svg>
      );
    case "play":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path fill="currentColor" d="M9 7.5v9l8-4.5-8-4.5Z" />
        </svg>
      );
    case "mail":
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true" className="icon">
          <path
            fill="currentColor"
            d="M20 6H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm0 2-8 5-8-5h16Zm-16 8V9.3l7.5 4.7c.3.2.7.2 1 0L20 9.3V16H4Z"
          />
        </svg>
      );
    default:
      return null;
  }
}

function Modal({ open, title, onClose, children }) {
  const overlayRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="modalOverlay"
      ref={overlayRef}
      onMouseDown={(e) => {
        if (e.target === overlayRef.current) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <div className="modalCard">
        <div className="modalTop">
          <div className="modalTitle">{title}</div>
          <button className="iconBtn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="modalBody">{children}</div>
      </div>
    </div>
  );
}

function pick(copy, key, fallback) {
  const v = copy?.[key];
  return v && String(v).trim() ? v : fallback;
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bioOpen, setBioOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [legalOpen, setLegalOpen] = useState(false);

  const [lang, setLang] = useState("en"); // EN default for now
  const [dir, setDir] = useState("ltr");
  const [copy, setCopy] = useState({});
  const [copyStatus, setCopyStatus] = useState("loading"); // loading | ok | error

  const [nextSong, setNextSong] = useState(null);
  const [nextSongStatus, setNextSongStatus] = useState("loading"); // loading | ok | error

  const [emailOpen, setEmailOpen] = useState(false);
  const [reminderEmail, setReminderEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [reminderStatus, setReminderStatus] = useState("idle"); // idle | sending | success | error
  const reminderInputRef = useRef(null);

  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
  }, [dir, lang]);

  useEffect(() => {
    let cancelled = false;

    async function loadCopy(currentLang) {
      try {
        setCopyStatus("loading");
        const res = await fetch(`/api/site-copy?lang=${encodeURIComponent(currentLang)}`);
        const data = await res.json();
        if (!res.ok || !data?.ok) throw new Error("bad_copy");

        if (!cancelled) {
          setCopy(data.copy || {});
          setDir(data.dir || (currentLang === "he" ? "rtl" : "ltr"));
          setCopyStatus("ok");
        }
      } catch (e) {
        if (!cancelled) setCopyStatus("error");
      }
    }

    loadCopy(lang);
    return () => {
      cancelled = true;
    };
  }, [lang]);

  useEffect(() => {
    let cancelled = false;

    async function loadNextSong() {
      try {
        setNextSongStatus("loading");
        const res = await fetch("/api/next-song");
        const data = await res.json();
        if (!res.ok || !data?.ok) throw new Error("bad_song");
        if (!cancelled) {
          setNextSong(data.song || null);
          setNextSongStatus("ok");
        }
      } catch (e) {
        if (!cancelled) setNextSongStatus("error");
      }
    }

    loadNextSong();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!emailOpen) return;
    const t = setTimeout(() => {
      if (reminderInputRef.current) reminderInputRef.current.focus();
    }, 60);
    return () => clearTimeout(t);
  }, [emailOpen]);

  async function submitReminder(e) {
    e.preventDefault();

    const email = reminderEmail.trim();
    if (!email) return;

    if (!consent) {
      setReminderStatus("error");
      return;
    }

    try {
      setReminderStatus("sending");
      const songTitle = nextSong?.title || "";

      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: "אתר — Coming soon",
          song: songTitle,
          consent: true,
          consentVersion: "v1",
        }),
      });

      if (!res.ok) throw new Error("bad_response");
      setReminderStatus("success");
    } catch (err) {
      setReminderStatus("error");
    }
  }

  const t = useMemo(() => {
    return {
      comingSoon: pick(copy, "banner.comingSoon", "Coming soon"),
      reminder: pick(copy, "banner.reminder", "Reminder:"),
      dontMiss: pick(copy, "email.cta", "Don’t miss release day"),
      getReminder: pick(copy, "email.button", "Get reminder"),
      sending: pick(copy, "email.sending", "Sending…"),
      saved: pick(copy, "email.saved", "Saved"),
      close: pick(copy, "email.close", "Close"),
      thanksTitle: pick(copy, "email.thanksTitle", "Thank you"),
      thanksText: pick(copy, "email.thanksText", "You’ll be among the first to hear the new release."),
      consentText: pick(copy, "email.consentText", "I agree to receive emails from Irena Pasternak, according to the site’s"),
      privacyLinkText: pick(copy, "legal.privacyLinkText", "Privacy Policy"),
      legalTitle: pick(copy, "legal.title", "Legal"),
      lastUpdated: pick(copy, "legal.lastUpdated", "Last updated: 2026-04-06"),
      privacyTitle: pick(copy, "legal.privacyTitle", "Privacy Policy"),
      privacyBody: pick(copy, "legal.privacyBody", "…"),
      termsTitle: pick(copy, "legal.termsTitle", "Terms of Use"),
      termsBody: pick(copy, "legal.termsBody", "…"),
      cookiesTitle: pick(copy, "legal.cookiesTitle", "Cookies"),
      cookiesBody: pick(copy, "legal.cookiesBody", "…"),
      accTitle: pick(copy, "legal.accessibilityTitle", "Accessibility Statement"),
      accBody: pick(copy, "legal.accessibilityBody", "…"),
    };
  }, [copy]);

  const bannerDate = nextSongStatus === "ok" ? nextSong?.releaseShort || "—" : "…";
  const ytUrl = nextSongStatus === "ok" ? nextSong?.ytUrl || "#" : "#";
  const spUrl = nextSongStatus === "ok" ? nextSong?.spUrl || "#" : "#";
  const disableButtons = nextSongStatus !== "ok";

  return (
    <div className={`page ${menuOpen ? "menuOpen" : ""}`}>
      <header className={`nav ${menuOpen ? "menuIsOpen" : ""}`}>
        <div className="navInner">
          <a className="brand brandWithLogo" href="#top" onClick={closeMenu} aria-label="Home">
            <img className="navLogo" src={logoImg} alt="" />
            <span className="brandScript">Irena Pasternak</span>
          </a>

          <nav className={`navLinks ${menuOpen ? "open" : ""}`} aria-label="Main">
            <button className="navLinkBtn" type="button" onClick={closeMenu}>
              {pick(copy, "nav.home", "Home")}
            </button>

            <button
              className="navLinkBtn"
              type="button"
              onClick={() => {
                setBioOpen(true);
                closeMenu();
              }}
            >
              {pick(copy, "nav.bio", "Bio")}
            </button>

            <button
              className="navLinkBtn"
              type="button"
              onClick={() => {
                setContactOpen(true);
                closeMenu();
              }}
            >
              {pick(copy, "nav.contact", "Contact")}
            </button>

            {/* Mobile-only section inside burger */}
            <div className="navDivider" />

            <div className="navSectionTitle">{pick(copy, "nav.languageTitle", "Language")}</div>
            <div className="lang langInMenu" aria-label="Language">
              <button
                type="button"
                className={`langBtn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLang("en")}
              >
                EN
              </button>
              <button
                type="button"
                className={`langBtn ${lang === "ru" ? "active" : ""}`}
                onClick={() => setLang("ru")}
              >
                RU
              </button>
              <button
                type="button"
                className={`langBtn ${lang === "he" ? "active" : ""}`}
                onClick={() => setLang("he")}
              >
                HE
              </button>
            </div>

            <div className="navDivider" />

            <button
              className="navLinkBtn"
              type="button"
              onClick={() => {
                setLegalOpen(true);
                closeMenu();
              }}
            >
              {t.legalTitle}
            </button>
          </nav>

          <div className="navRight">
            {/* desktop-only language switches; hidden on mobile via CSS */}
            <div className="lang langTop" aria-label="Language">
              <button type="button" className={`langBtn ${lang === "en" ? "active" : ""}`} onClick={() => setLang("en")}>
                EN
              </button>
              <button type="button" className={`langBtn ${lang === "ru" ? "active" : ""}`} onClick={() => setLang("ru")}>
                RU
              </button>
              <button type="button" className={`langBtn ${lang === "he" ? "active" : ""}`} onClick={() => setLang("he")}>
                HE
              </button>
            </div>

            <button
              className="iconBtn burger"
              type="button"
              aria-label="Menu"
              aria-expanded={menuOpen ? "true" : "false"}
              onClick={() => setMenuOpen((v) => !v)}
            >
              {menuOpen ? <Icon name="close" /> : <Icon name="menu" />}
            </button>
          </div>
        </div>
      </header>

      <aside className="socialRail" aria-label="Social links">
        <a className="socialIcon" href={LINKS.spotifyArtist} target="_blank" rel="noreferrer" aria-label="Spotify">
          <Icon name="spotify" />
        </a>
        <a className="socialIcon" href={LINKS.youtubeChannel} target="_blank" rel="noreferrer" aria-label="YouTube">
          <Icon name="youtube" />
        </a>
        <a className="socialIcon" href={LINKS.tiktok} target="_blank" rel="noreferrer" aria-label="TikTok">
          <Icon name="tiktok" />
        </a>
        <a className="socialIcon" href={LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
          <Icon name="instagram" />
        </a>
        <a className="socialIcon" href={LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Facebook">
          <Icon name="facebook" />
        </a>
      </aside>

      <main id="top">
        <section className="hero heroFull">
          <div className="comingCard" role="group" aria-label="Coming soon">
            <div className="comingCompact">
              <div className="comingCover">
                <img className="coverImg" src={coverImg} alt="Next release cover" />
              </div>

              <div className="comingInfo">
                <div className="comingTopLine">
                  <span className="comingTitle">{t.comingSoon}</span>
                  <span className="comingDate">{bannerDate}</span>
                </div>

                <div className="comingSub">{pick(copy, "banner.subtitle", "New single is almost here")}</div>

                <div className="ctaAbove">{t.reminder}</div>

                <div className="remindRow" role="group" aria-label="Choose reminder">
                  <a
                    className="remindBtn yt"
                    href={ytUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube reminder"
                    aria-disabled={disableButtons ? "true" : "false"}
                    onClick={(e) => {
                      if (disableButtons || ytUrl === "#") e.preventDefault();
                    }}
                  >
                    <span className="remindIcon">
                      <Icon name="youtube" />
                    </span>
                  </a>

                  <a
                    className="remindBtn sp"
                    href={spUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Spotify pre-save"
                    aria-disabled={disableButtons ? "true" : "false"}
                    onClick={(e) => {
                      if (disableButtons || spUrl === "#") e.preventDefault();
                    }}
                  >
                    <span className="remindIcon">
                      <Icon name="spotify" />
                    </span>
                  </a>

                  <button
                    className="remindBtn em"
                    type="button"
                    aria-label="Email reminder"
                    onClick={() => {
                      setEmailOpen((v) => !v);
                      setReminderStatus("idle");
                    }}
                  >
                    <span className="remindIcon">
                      <Icon name="mail" />
                    </span>
                  </button>
                </div>

                {emailOpen && (
                  <div className="emailPop" role="group" aria-label="Email reminder form">
                    <div className="emailCta">{t.dontMiss}</div>

                    <form className="emailForm" onSubmit={submitReminder}>
                      <input
                        ref={reminderInputRef}
                        className="emailInput"
                        type="email"
                        inputMode="email"
                        autoComplete="email"
                        placeholder={pick(copy, "email.placeholder", "your@email.com")}
                        value={reminderEmail}
                        onChange={(e) => setReminderEmail(e.target.value)}
                        required
                        aria-label="Email"
                        disabled={reminderStatus === "success"}
                      />

                      <button
                        className="emailBtn"
                        type="submit"
                        disabled={
                          reminderStatus === "sending" || reminderStatus === "success" || nextSongStatus !== "ok"
                        }
                      >
                        {reminderStatus === "sending"
                          ? t.sending
                          : reminderStatus === "success"
                          ? t.saved
                          : t.getReminder}
                      </button>

                      <label className="consentRow">
                        <input
                          className="consentBox"
                          type="checkbox"
                          checked={consent}
                          onChange={(e) => setConsent(e.target.checked)}
                          required
                          disabled={reminderStatus === "success"}
                        />
                        <span className="consentText">
                          {t.consentText}{" "}
                          <button className="consentLinkBtn" type="button" onClick={() => setLegalOpen(true)}>
                            {t.privacyLinkText}
                          </button>
                          .
                        </span>
                      </label>

                      {reminderStatus === "success" && (
                        <div className="emailThanks">
                          <div className="emailThanksTitle">{t.thanksTitle}</div>
                          <div className="emailThanksText">{t.thanksText}</div>
                        </div>
                      )}

                      {reminderStatus === "error" && (
                        <div className="emailMsg err">{pick(copy, "email.error", "Something went wrong. Please try again.")}</div>
                      )}

                      <button
                        className="emailClose"
                        type="button"
                        onClick={() => {
                          setEmailOpen(false);
                          setReminderStatus("idle");
                        }}
                        aria-label="Close email form"
                      >
                        {t.close}
                      </button>

                      {copyStatus === "error" && (
                        <div className="emailMsg err">{pick(copy, "copy.error", "Couldn’t load translations. Please refresh.")}</div>
                      )}
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>

          <a
            className="playPill playPillSmall"
            href={LINKS.spotifyArtist}
            target="_blank"
            rel="noreferrer"
            aria-label="Open Spotify artist page"
          >
            <span className="playCircle">
              <Icon name="play" />
            </span>
            <span>{pick(copy, "cta.playSpotify", "Play on Spotify")}</span>
          </a>

          {/* הוסר מהמסך במובייל — עובר לתפריט */}
          <div className="copyrightLine" aria-label="Copyright">
            © {new Date().getFullYear()} Irena Pasternak. All rights reserved.
          </div>
        </section>
      </main>

      <Modal open={bioOpen} title={pick(copy, "bio.title", "Bio")} onClose={() => setBioOpen(false)}>
        <p>{pick(copy, "bio.p1", "…")}</p>
        <p>{pick(copy, "bio.p2", "…")}</p>
      </Modal>

      <Modal open={contactOpen} title={pick(copy, "contact.title", "Contact")} onClose={() => setContactOpen(false)}>
        <p className="muted">{pick(copy, "contact.p1", "For collaborations, licensing inquiries, and bookings:")}</p>
        <p className="muted">{pick(copy, "contact.emailLine", "Email: d0503366710@gmail.com")}</p>
        <p>
          {pick(copy, "contact.instagramLabel", "Instagram:")}{" "}
          <a className="inlineLink" href={LINKS.instagram} target="_blank" rel="noreferrer">
            @irena_pasternak
          </a>
        </p>
        <p>
          {pick(copy, "contact.youtubeLabel", "YouTube:")}{" "}
          <a className="inlineLink" href={LINKS.youtubeChannel} target="_blank" rel="noreferrer">
            {pick(copy, "contact.youtubeLinkText", "Channel")}
          </a>
        </p>
      </Modal>

      <Modal open={legalOpen} title={t.legalTitle} onClose={() => setLegalOpen(false)}>
        <p className="muted">{t.lastUpdated}</p>

        <h3 className="legalHeading">{t.privacyTitle}</h3>
        <p>{t.privacyBody}</p>

        <hr className="legalDivider" />

        <h3 className="legalHeading">{t.termsTitle}</h3>
        <p>{t.termsBody}</p>

        <hr className="legalDivider" />

        <h3 className="legalHeading">{t.cookiesTitle}</h3>
        <p>{t.cookiesBody}</p>

        <hr className="legalDivider" />

        <h3 className="legalHeading">{t.accTitle}</h3>
        <p>{t.accBody}</p>
      </Modal>
    </div>
  );
}