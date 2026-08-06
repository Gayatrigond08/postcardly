import "./TemplateCard.css";

function TemplateCard({ title, description }) {
  return (
    <div className="template-card">
      <div className="template-preview">
        <p className="preview-greeting">
          Dear You,
        </p>

        <p className="preview-message">
          Some memories deserve to be
          cherished forever.
        </p>

        <p className="preview-signature">
          ❤️ Niki
        </p>
      </div>

      <h3 className="template-title">
        {title}
      </h3>

      <p className="template-description">
        {description}
      </p>
    </div>
  );
}

export default TemplateCard;