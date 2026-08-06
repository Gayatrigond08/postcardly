import "./DraftCard.css";

function DraftCard({ title, template, date }) {
  return (
    <div className="draft-card">
      <h3>{title}</h3>

      <p>{template}</p>

      <span>{date}</span>
    </div>
  );
}

export default DraftCard;