import { getPuzzleAsset } from '../puzzleAssets';
import './PuzzleClueCards.css';

export default function PuzzleClueCards({ clues = [] }) {
  if (!clues.length) return null;

  return (
    <div className="puzzle-clue-cards">
      {clues.map((clue) => {
        const image = getPuzzleAsset(clue.imageKey);

        return (
          <article key={clue.id ?? clue.imageKey ?? clue.title} className="puzzle-clue-card">
            {image && (
              <img
                className="puzzle-clue-image"
                src={image}
                alt=""
                aria-hidden="true"
              />
            )}
            {(clue.title || clue.caption) && (
              <div className="puzzle-clue-copy">
                {clue.title && <h3>{clue.title}</h3>}
                {clue.caption && <p>{clue.caption}</p>}
              </div>
            )}
          </article>
        );
      })}
    </div>
  );
}
