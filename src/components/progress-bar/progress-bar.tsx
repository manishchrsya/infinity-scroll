import "./progress-bar.css";

export const ProgressBar = ({ progress = 95 }) => {
  return (
    <div className="progress-bar">
      <div
        className="progress-bar-fill"
        style={{ transform: `translate(${progress - 100}%)` }}
      ></div>
    </div>
  );
};
