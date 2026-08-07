import { useEffect, useState } from "react";
import axios from "axios";

import DashboardHero from "../components/dashboard/DashboardHero";
import DraftCard from "../components/dashboard/DraftCard";
import RecentDownloads from "../components/dashboard/RecentDownloads";
import "./Dashboard.css";

function Dashboard() {
  const [postcards, setPostcards] = useState([]);

  useEffect(() => {
    const fetchPostcards = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        const response = await axios.get(
          `http://localhost:7000/api/postcards/${user.id}`
        );

        console.log(response.data);

        setPostcards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostcards();
  }, []);

  return (
    <>
      <main className="dashboard">
        <DashboardHero />

        {/* Recent Drafts */}
        <section className="drafts-section">
          <h2>Recent Drafts</h2>

          <div className="draft-grid">
            {postcards.map((postcard) => (
              <DraftCard
                key={postcard._id}
                title={postcard.title}
                template={postcard.template}
                date={new Date(postcard.createdAt).toLocaleDateString()}
              />
            ))}
          </div>
        </section>

        {/* Recent Downloads */}
        <RecentDownloads />
      </main>
    </>
  );
}

export default Dashboard;