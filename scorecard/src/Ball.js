export default class Ball {
  constructor(ball) {
    this.ball = ball;
    this.wicket = this.ball === "Wkt";
    this.wide = this.ball === "Wide";
  }

  runsAndSymbols() {
    if (this.wicket) {
      return [0, "W"];
    }
    if (this.wide) {
      return [1, "wd"];
    }
    return [this.ball, this.ball];
  }
  get runs() {
    return this.runsAndSymbols()[0];
  }

  get symbol() {
    return this.runsAndSymbols()[1];
  }

  get penalty() {
    if (this.wide) {
      return 1;
    }
    return 0;
  }
}
