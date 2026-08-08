import { useEffect, useState } from "react";
import axios from "axios";
import "./RecentDownloads.css";

function RecentDownloads() {
  const [downloads, setDownloads] = useState([]);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.id) {
          return;
        }

        const response = await axios.get(
          `http://localhost:7000/api/postcards/user/${user.id}`
        );

        const downloadedPostcards = response.data
          .filter((postcard) => postcard.downloadedAt)
          .sort(
            (a, b) =>
              new Date(b.downloadedAt) -
              new Date(a.downloadedAt)
          )
          .slice(0, 5);

        setDownloads(downloadedPostcards);
      } catch (error) {
        console.error(error);
      }
    };

    fetchDownloads();
  }, []);

  return (
    <section className="downloads-section">
      <h2>Recent Downloads</h2>

      <div className="downloads-list">
        {downloads.length > 0 ? (
          downloads.map((postcard) => (
            <div
              key={postcard._id}
              className="download-item"
            >
              📥 {postcard.title}
            </div>
          ))
        ) : (
          <p>No downloads yet.</p>
        )}
      </div>
    </section>
  );
}

export default RecentDownloads;