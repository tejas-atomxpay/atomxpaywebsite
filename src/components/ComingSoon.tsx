import logo from '../assets/atomx-logo-horizontal.svg'

function ComingSoon() {
  return (
    <div className="coming-soon">
      <div className="coming-soon__glow coming-soon__glow--one" />
      <div className="coming-soon__glow coming-soon__glow--two" />

      <main className="coming-soon__content">
        <img
          src={logo}
          alt="AtomX Pay"
          className="coming-soon__logo"
        />

        <span className="coming-soon__eyebrow">Global Payment Infrastructure</span>

        <h1 className="coming-soon__title">
          Something big is<br />
          <span className="coming-soon__title-accent">coming soon.</span>
        </h1>

        <p className="coming-soon__subtitle">
          We&rsquo;re building the infrastructure to move money across borders
          faster, cheaper, and more transparently. Stay tuned.
        </p>
      </main>

      <footer className="coming-soon__footer">
        &copy; {new Date().getFullYear()} AtomX Pay. All rights reserved.
      </footer>
    </div>
  )
}

export default ComingSoon
