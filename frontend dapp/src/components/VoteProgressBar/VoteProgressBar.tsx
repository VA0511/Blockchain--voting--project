import './VoteProgressBar.css';

interface VoteProgressBarProps {
  yesPercentage: number;
  noPercentage: number;
  total?: number;
  showLabels?: boolean;
}

export function VoteProgressBar({
  yesPercentage,
  noPercentage,
  total,
  showLabels = true,
}: VoteProgressBarProps) {
  return (
    <div className="vote-progress-bar">
      <div className="progress-container">
        <div
          className="progress-segment yes-votes"
          style={{ width: `${yesPercentage}%` }}
        />
        <div
          className="progress-segment no-votes"
          style={{ width: `${noPercentage}%` }}
        />
      </div>
      {showLabels && (
        <div className="progress-labels">
          <div className="label yes">
            <span className="dot"></span>
            Yes: {yesPercentage}%
          </div>
          <div className="label no">
            <span className="dot"></span>
            No: {noPercentage}%
          </div>
          {total && <div className="label total">Total: {total}</div>}
        </div>
      )}
    </div>
  );
}
