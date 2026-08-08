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
          `http://localhost:7000/api/postcards/user/${user.id}`
        );

        setPostcards(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPostcards();
  }, []);

  const drafts = postcards.filter(
    (postcard) => postcard.status === "draft"
  );

  const createdPostcards = postcards.filter(
    (postcard) => postcard.status === "created"
  );

  const handleDelete = (deletedId) => {
    setPostcards((currentPostcards) =>
      currentPostcards.filter(
        (postcard) => postcard._id !== deletedId
      )
    );
  };

  return (
    <>
      <main className="dashboard">

        <DashboardHero />

        {/* Recent Drafts */}
        <section className="drafts-section">
          <h2>Recent Drafts</h2>

          <div className="draft-grid">
            {drafts.length > 0 ? (
              drafts.map((postcard) => (
                <DraftCard
                  key={postcard._id}
                  id={postcard._id}
                  title={postcard.title}
                  template={postcard.template}
                  date={new Date(
                    postcard.updatedAt
                  ).toLocaleDateString()}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No drafts yet.</p>
            )}
          </div>
        </section>

        {/* Created Postcards */}
        <section className="drafts-section">
          <h2>Created Postcards</h2>

          <div className="draft-grid">
            {createdPostcards.length > 0 ? (
              createdPostcards.map((postcard) => (
                <DraftCard
                  key={postcard._id}
                  id={postcard._id}
                  title={postcard.title}
                  template={postcard.template}
                  date={new Date(
                    postcard.createdAt
                  ).toLocaleDateString()}
                  onDelete={handleDelete}
                />
              ))
            ) : (
              <p>No postcards created yet.</p>
            )}
          </div>
        </section>

        {/* Recent Downloads */}
        <RecentDownloads />

      </main>
    </>
  );
}

export default Dashboard;