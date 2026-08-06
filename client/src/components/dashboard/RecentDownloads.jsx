import "./RecentDownloads.css";

function RecentDownloads() {
  const downloads = [
    "Birthday Letter",
    "Friendship Day",
    "Vacation Memories",
  ];

  return (
    <section className="downloads-section">
      <h2>Recent Downloads</h2>

      <div className="downloads-list">
        {downloads.map((item, index) => (
          <div key={index} className="download-item">
            📥 {item}
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentDownloads;