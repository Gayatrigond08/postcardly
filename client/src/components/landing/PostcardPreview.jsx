import "./PostcardPreview.css";

function PostcardPreview() {
  return (
    <div className="postcard">

      <p className="greeting">
        Dear You,
      </p>

      <p className="message">
        Some words deserve more than just an email.

        They deserve a place where memories stay forever.
      </p>

      <p className="signature">
        ❤️ Niki
      </p>

      <hr />

      <p className="timestamp">
        5 August 2026 • 4:42 PM
      </p>

    </div>
  );
}

export default PostcardPreview;