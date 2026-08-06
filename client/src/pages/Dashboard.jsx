import Navbar from "../components/layout/Navbar";
import DashboardHero from "../components/dashboard/DashboardHero";
import DraftCard from "../components/dashboard/DraftCard";
import RecentDownloads from "../components/dashboard/RecentDownloads";
import "./Dashboard.css";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="dashboard">
        <DashboardHero />

        {/* Recent Drafts */}
        <section className="drafts-section">
          <h2>Recent Drafts</h2>

          <div className="draft-grid">
            <DraftCard
              title="Birthday Letter"
              template="Botanical"
              date="Saved Today"
            />

            <DraftCard
              title="Friendship Day"
              template="Coffee Journal"
              date="Yesterday"
            />

            <DraftCard
              title="Vacation"
              template="Air Mail"
              date="2 Days Ago"
            />
          </div>
        </section>

        {/* Recent Downloads */}
        <RecentDownloads />

      </main>
    </>
  );
}

export default Dashboard;