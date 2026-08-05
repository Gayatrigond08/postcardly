import PostcardPreview from "./PostcardPreview";
import "./Hero.css";
import Button from "../ui/Button";
function Hero() {
  return (
    <section className="hero">
  <div className="hero-content">
    <p className="hero-subtitle">💌 Welcome to Postcardly</p>

    <h1 className="hero-title">
      Some words deserve
      <br />
      more than just an email.
    </h1>

    <p className="hero-description">
      Create beautiful vintage-inspired postcards and preserve your memories forever.
    </p>

    <div className="hero-buttons">
  <Button variant="primary">
    Start Writing
  </Button>

  <Button variant="secondary">
    Explore Templates
  </Button>
</div>
  </div>

  {/* 👇 Add this here */}
  <PostcardPreview />

</section>
  );
}

export default Hero;