import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import "./Editor.css";
import html2canvas from "html2canvas";

function Editor() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");

  const location = useLocation();
  const selectedTemplate =
    location.state?.template?.title || "Classic Letter";

  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const templateClosings = {
    "Classic Letter": "With love,",
    Botanical: "🌿 Warm Wishes,",
    "Air Mail": "✈️ Safe Travels,",
    "Coffee Journal": "☕ Take care,",
  };

  const closing =
    templateClosings[selectedTemplate] || "With love,";

  const downloadPostcard = async () => {
    const postcard = document.getElementById("postcard-preview");

    if (!postcard) {
      alert("Postcard not found!");
      return;
    }

    const canvas = await html2canvas(postcard);

    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "postcard.png";
    link.click();
  };

  const saveDraft = () => {
    const draft = {
      to,
      message,
      from,
    };

    localStorage.setItem("postcardDraft", JSON.stringify(draft));

    alert("Draft saved successfully! 💌");
  };

  useEffect(() => {
    const savedDraft = localStorage.getItem("postcardDraft");

    if (savedDraft) {
      const draft = JSON.parse(savedDraft);

      setTo(draft.to);
      setMessage(draft.message);
      setFrom(draft.from);
    }
  }, []);

  return (
    <>
      <Navbar />

      <main className="editor-page">
        <p className="selected-template">
          {selectedTemplate}
        </p>

        <h1>Write Your Postcard</h1>

        <div className="editor-container">

          {/* Left Side */}
          <form className="editor-form">

            <div className="form-group">
              <label>To</label>
              <input
                type="text"
                placeholder="Recipient's name"
                value={to}
                onChange={(e) => setTo(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Message</label>
              <textarea
                rows="8"
                placeholder="Write your postcard..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>From</label>
              <input
                type="text"
                placeholder="Your name"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
              />
            </div>

            <div className="editor-actions">
              <button
                type="button"
                className="save-btn"
                onClick={saveDraft}
              >
                Save Draft
              </button>

              <button
                type="button"
                className="download-btn"
                onClick={downloadPostcard}
              >
                Download
              </button>
            </div>

          </form>

          {/* Right Side */}
          <div
            id="postcard-preview"
            className={`postcard-preview ${selectedTemplate
              .toLowerCase()
              .replace(/\s+/g, "-")}`}
          >
            <p className="preview-greeting">
              Dear {to || "Friend"},
            </p>

            <p className="preview-message">
              {message || "Your beautiful message will appear here."}
            </p>

            <div className="preview-signature">
              <p className="preview-closing">
                {closing}
              </p>

              <p className="preview-name">
                ❤️ {from || "Your Name"}
              </p>
            </div>

            <p className="preview-date">
              {today}
            </p>
          </div>

        </div>
      </main>
    </>
  );
}

export default Editor;