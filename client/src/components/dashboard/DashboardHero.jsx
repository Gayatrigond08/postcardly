import "./DashboardHero.css";
import { Link } from "react-router-dom";

function DashboardHero() {
  return (
    <section className="dashboard-hero">
      <h1>Welcome back! 👋</h1>

      <p>
        Ready to create another beautiful memory?
      </p>

      <Link to="/designs">
        <button className="new-postcard-btn">
          + Create New Postcard
        </button>
      </Link>
    </section>
  );
}

export default DashboardHero;