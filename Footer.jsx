import { profile } from '../data/profile.js'

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {profile.name} · {profile.headline}
      </p>
      <p className="footer-small">
        Original artwork and code. The visual style is inspired by battle-royale game lobbies; this site is not affiliated
        with, sponsored or endorsed by any game publisher.
      </p>
    </footer>
  )
}
