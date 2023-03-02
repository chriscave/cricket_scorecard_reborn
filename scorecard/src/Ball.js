export default class Ball {
  constructor(ball, extraRuns = 0) {
    this.ball = ball;
    this.extraRuns = extraRuns;
    this.wicket = this.ball === "Wkt";
    this.wide = this.ball === "Wide";
  }

  runsSymbolsPenalties() {
    if (this.wicket) {
      return [0, "W", 0];
    }
    if (this.wide) {
      return [
        1 + this.extraRuns,
        this.extraRuns > 0 ? "wd-" + this.extraRuns : "wd",
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
