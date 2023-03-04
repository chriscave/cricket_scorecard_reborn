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
    return this.runsSymbolsPenalties()[1];
  }

  get penalty() {
    return this.runsSymbolsPenalties()[2];
  }
}
