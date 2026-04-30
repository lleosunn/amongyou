import { useGameState } from '../gameContext';
import './HealthBar.css';

export default function HealthBar() {
    const { health } = useGameState();
    const percent = Math.round(health * 100);

    return (
        <div className="health-bar" aria-label={`Health ${percent}%`}>
            <div className="health-icon" aria-hidden="true">
                <svg
                    viewBox="0 0 24 24"
                    role="img"
                    focusable="false"
                    width="20"
                    height="20"
                    fill="#ff6b6b"
                >
                    <path d="M12 21.5c-.3 0-.6-.1-.8-.3-2.7-2.4-7.2-6.7-8.8-9.1-1.7-2.5-1.3-6 .9-8 2.2-2 5.6-1.6 7.4.9.4.5.7 1 .9 1.5.2-.5.5-1 .9-1.5 1.8-2.5 5.2-2.9 7.4-.9 2.2 2 2.6 5.5.9 8-1.6 2.4-6.1 6.7-8.8 9.1-.2.2-.5.3-.8.3z" />
                </svg>
            </div>
            <div className="health-track">
                <div
                    className="health-fill"
                    style={{ width: `${Math.max(8, percent)}%` }}
                />
            </div>
        </div>
    );
}
