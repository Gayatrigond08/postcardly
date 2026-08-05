import "./Hero.css";
function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="hero-subtitle">💌 Welcome to Postcardly</p>

        <h1>
          Some words deserve
          <br />
          more than just an email.
        </h1>

        <p className="hero-description">
          Create beautiful vintage-inspired postcards and preserve your memories forever.
        </p>

        <div className="hero-buttons">
          <button>Start Writing</button>
          <button>Explore Templates</button>
        </div>
      </div>
    </section>
  );
}

export default Hero;