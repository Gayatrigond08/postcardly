import "./Templates.css";
import TemplateCard from "./TemplateCard";

function Templates() {
  const templates = [
    {
      title: "Classic Letter",
      description: "Timeless & Elegant",
    },
    {
      title: "Botanical",
      description: "Soft & Natural",
    },
    {
      title: "Air Mail",
      description: "Travel Inspired",
    },
    {
      title: "Coffee Journal",
      description: "Warm & Cozy",
    },
  ];

  return (
    <section className="templates">
      <p className="templates-subtitle">
        ✨ Find Your Style
      </p>

      <h2 className="templates-title">
        Choose a Design
      </h2>

      <p className="templates-description">
        Find a design that feels just right for your story.
      </p>

      <div className="templates-grid">
        {templates.map((template) => (
          <TemplateCard
            key={template.title}
            title={template.title}
            description={template.description}
          />
        ))}
      </div>
    </section>
  );
}

export default Templates;