import "./styles.css";

import wd0 from "./wd0.svg";
import wd1 from "./wd1.svg";
import wd2 from "./wd2.svg";
import wd3 from "./wd3.svg";
import wd4 from "./wd4.svg";

export default class Ball {
  constructor(ball, extraRuns = 0) {
    this.ball = ball;
    this.extraRuns = extraRuns;
    this.wicket = this.ball === "Wkt";
  }

  runsSymbolsPenalties() {
    if (this.wicket) {
      return [0, "W", 0];
    }
    if (this.ball === "Wide") {
      return [
        1 + this.extraRuns,
        this.extraRuns > 0 ? "wd-" + this.extraRuns : "wd",
        1,
      ];
    }
    if (this.ball === "No ball") {
      return [
        1 + this.extraRuns,
        this.extraRuns > 0 ? "nb-" + this.extraRuns : "nb",
        1,
      ];
    }
    return [this.ball, this.ball, 0];
  }
  get runs() {
    return this.runsSymbolsPenalties()[0];
  }

  get symbol() {
    if (this.ball === "No ball") {
      return (
        <div
          className="noball"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <div className="ball-column">{renderExtraRuns(this.extraRuns)}</div>
        </div>
      );
    }
    if (this.ball === "Wide") {
      return <>{renderWide(this.extraRuns)}</>;
    }
    return this.runsSymbolsPenalties()[1];
  }

  get penalty() {
    return this.runsSymbolsPenalties()[2];
  }
}

function renderWide(runs) {
  const x = [wd0, wd1, wd2, wd3, wd4];
  return (
    <div>
      <img width={"10px"} height={"10px"} src={x[runs]} />
    </div>
  );
}

function renderExtraRow(runs) {
  let dots = [];
  for (let i = 0; i < runs; i++) {
    dots.push(i);
  }
  return (
    <div className="extra-runs-row">
      {dots.map(() => (
        <div className="extra-runs"></div>
      ))}
    </div>
  );
}

export function getParts(n) {
  const parts = [];
  let remaining = n;
  while (remaining > 0) {
    if (remaining === 1) {
      parts.push(1);
      break;
    }
    if (remaining === 2) {
      parts.push(2);
      break;
    }
    parts.push(2);
    remaining -= 2;
  }
  return parts;
}

function renderExtraRuns(runs) {
  const rows = getParts(runs);
  return <>{rows.map((row) => renderExtraRow(row))}</>;
}
