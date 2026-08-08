import { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/layout/Navbar";
import "./Editor.css";
import html2canvas from "html2canvas";

function Editor() {
  const [to, setTo] = useState("");
  const [message, setMessage] = useState("");
  const [from, setFrom] = useState("");
  const [status, setStatus] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

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

  // Load existing postcard
  useEffect(() => {
    if (!id) {
      return;
    }

    const fetchPostcard = async () => {
      try {
        const response = await axios.get(
          `http://localhost:7000/api/postcards/${id}`
        );

        const postcard = response.data;

        setTo(postcard.to || "");
        setMessage(postcard.message || "");
        setFrom(postcard.from || "");
        setStatus(postcard.status || "draft");
      } catch (error) {
        console.error(error);
        alert("Failed to load postcard");
      }
    };

    fetchPostcard();
  }, [id]);

  // Save or update draft
  const saveDraft = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const postcardData = {
        title: `${to || "Untitled"} Postcard`,
        to,
        message,
        from,
        template: selectedTemplate,
        user: user.id,
        status: "draft",
      };

      if (id) {
        await axios.put(
          `http://localhost:7000/api/postcards/${id}`,
          postcardData
        );

        setStatus("draft");

        alert("Draft updated successfully! 💾");
      } else {
        const response = await axios.post(
          "http://localhost:7000/api/postcards",
          postcardData
        );

        alert("Draft saved successfully! 💾");

        navigate(`/editor/${response.data.postcard._id}`);
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to save draft"
      );
    }
  };

  // Create final postcard
  const createPostcard = async () => {
    if (!to.trim() || !message.trim() || !from.trim()) {
      alert(
        "Please fill in To, Message and From before creating your postcard. 💌"
      );
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const postcardData = {
        title: `${to} Postcard`,
        to,
        message,
        from,
        template: selectedTemplate,
        user: user.id,
        status: "created",
      };

      if (id) {
        await axios.put(
          `http://localhost:7000/api/postcards/${id}`,
          postcardData
        );
      } else {
        await axios.post(
          "http://localhost:7000/api/postcards",
          postcardData
        );
      }

      alert("Postcard created successfully! 💌");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to create postcard"
      );
    }
  };

  // Save changes to an already-created postcard
  const saveChanges = async () => {
    if (!to.trim() || !message.trim() || !from.trim()) {
      alert(
        "Please fill in To, Message and From before saving. 💌"
      );
      return;
    }

    try {
      const user = JSON.parse(localStorage.getItem("user"));

      await axios.put(
        `http://localhost:7000/api/postcards/${id}`,
        {
          title: `${to} Postcard`,
          to,
          message,
          from,
          template: selectedTemplate,
          user: user.id,
          status: "created",
        }
      );

      alert("Postcard updated successfully! ✏️");

      navigate("/dashboard");
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to update postcard"
      );
    }
  };

  // Download postcard
  const downloadPostcard = async () => {
  const postcard = document.getElementById("postcard-preview");

  if (!postcard) {
    alert("Postcard not found!");
    return;
  }

  if (!id) {
    alert("Please save or create the postcard before downloading.");
    return;
  }

  try {
    const canvas = await html2canvas(postcard, {
      scale: 4,
      useCORS: true,
      backgroundColor: null,
    });

    const image = canvas.toDataURL("image/png");

    const { jsPDF } = await import("jspdf");

    // A4 portrait page
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    // A4 dimensions
    const pageWidth = 210;
    const pageHeight = 297;

    // Postcard dimensions: 6 × 4 inches
    const postcardWidth = 152.4;
    const postcardHeight = 101.6;

    // Center postcard on the A4 page
    const x = (pageWidth - postcardWidth) / 2;
    const y = (pageHeight - postcardHeight) / 2;

    // White A4 background
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, pageWidth, pageHeight, "F");

    // Add the postcard
    pdf.addImage(
      image,
      "PNG",
      x,
      y,
      postcardWidth,
      postcardHeight
    );

    pdf.save(`${to || "postcard"}-postcard.pdf`);

    // Record download
    await axios.post(
      `http://localhost:7000/api/postcards/${id}/download`
    );
  } catch (error) {
    console.error(error);
    alert("Failed to download postcard.");
  }
};

  return (
    <>
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

              {status === "created" ? (
                <button
                  type="button"
                  className="save-btn"
                  onClick={saveChanges}
                >
                  Save Changes
                </button>
              ) : (
                <button
                  type="button"
                  className="save-btn"
                  onClick={saveDraft}
                >
                  {id ? "Save Changes" : "Save Draft"}
                </button>
              )}

              {status !== "created" && (
                <button
                  type="button"
                  className="create-btn"
                  onClick={createPostcard}
                >
                  Create Postcard
                </button>
              )}

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
              {message ||
                "Your beautiful message will appear here."}
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