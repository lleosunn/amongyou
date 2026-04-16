import './Modal.css';

function ClueContent({ title, body, note }) {
  return (
    <>
      <h2>{title}</h2>
      <div className="clue-text">{body}</div>
      {note && <p className="clue-note">{note}</p>}
    </>
  );
}

export default function Modal({ children, onClose }) {
  const content = children;
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {content?.type === 'clue' ? (
          <ClueContent title={content.title} body={content.body} note={content.note} />
        ) : (
          content
        )}
      </div>
    </div>
  );
}
