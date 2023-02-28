import React from "react";
import BowlingScorecard from "./BowlingScorecard";
import BallDetailInput from "./BallDetailInput";
import BowlerNameDropdown from "./BowlerNameDropdown";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function BallsRequiredInOver(over) {
  const penalties = over
    ? over.map((ball) =>
        typeof ball === "string" ? ball.includes("Wide") : false
      )
    : [0];
  const extraBalls = penalties.reduce((sum, a) => sum + a, 0);
  return 6 + extraBalls;
}

export default class Scorecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scorecard: [],
      bowlerNames: [
        "Bowler 1",
        "Bowler 2",
        "Bowler 3",
        "Bowler 4",
        "Bowler 5",
        "Bowler 6",
      ],
      bowlerOrder: [],
      newBowlerChosen: false,
    };
  }

  handleClick(i) {
    console.log("click!");
    let currentOver;
    const updatedScorecard = this.state.scorecard.slice();
    const lastOver = updatedScorecard.at(-1) ? updatedScorecard.at(-1) : [];
    let newBowlerChosen = this.state.newBowlerChosen.valueOf();
    if (
      updatedScorecard.length === 0 ||
      lastOver.length === BallsRequiredInOver(lastOver)
    ) {
      currentOver = [i];
      updatedScorecard.push(currentOver);
    } else {
      currentOver = lastOver.slice();
      if (currentOver.at(-1) === "Wide") {
        currentOver.splice(currentOver.length - 1, 1, "Wide-" + i);
      } else {
        currentOver.push(i);
      }
      if (currentOver.length === BallsRequiredInOver(currentOver)) {
        newBowlerChosen = false;
      }
      updatedScorecard[updatedScorecard.length - 1] = currentOver;
    }

    this.setState({
      scorecard: updatedScorecard,
      newBowlerChosen: newBowlerChosen,
    });
  }

  handleBowlerChange(name) {
    const updatebowlerOrder = this.state.bowlerOrder.slice();
    updatebowlerOrder.push(name);
    this.setState({ bowlerOrder: updatebowlerOrder, newBowlerChosen: true });
  }

  render() {
    console.log(this.state.scorecard);
    return (
      <div>
        <BowlingScorecard
          value={this.state.scorecard}
          names={this.state.bowlerNames}
          order={this.state.bowlerOrder}
        />
        <BallDetailInput
          onClick={(i) => this.handleClick(i)}
          bowlerChosen={this.state.newBowlerChosen}
        />
        <BowlerNameDropdown
          names={this.state.bowlerNames.filter(
            (name) => name !== this.state.bowlerOrder.at(-1)
          )}
          bowlerChosen={this.state.newBowlerChosen}
          onClick={(name) => this.handleBowlerChange(name)}
        />
      </div>
    );
  }
}
