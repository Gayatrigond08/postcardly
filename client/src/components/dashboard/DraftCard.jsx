import "./DraftCard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function DraftCard({ id, title, template, date, onDelete }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/editor/${id}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();

    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:7000/api/postcards/${id}`
      );

      alert("Postcard deleted successfully! 🗑️");

      if (onDelete) {
        onDelete(id);
      }
    } catch (error) {
      console.error(error);

      alert(
        error.response?.data?.message ||
          "Failed to delete postcard"
      );
    }
  };

  return (
    <div className="draft-card" onClick={handleClick}>
      <div className="draft-card-content">
        <h3>{title}</h3>

        <p>{template}</p>

        <span>{date}</span>
      </div>

      <button
        type="button"
        className="delete-btn"
        onClick={handleDelete}
      >
        🗑️
      </button>
    </div>
  );
}

export default DraftCard;