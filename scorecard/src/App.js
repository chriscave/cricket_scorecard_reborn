import React from "react";
import BowlingScorecard from "./BowlingScorecard";
import BallDetailInput from "./BallDetailInput";
import BowlerNameDropdown from "./BowlerNameDropdown";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export function BallsRequiredInOver(over) {
  const penalties = over ? over.map((ball) => ball.penalty) : [0];
  const extraBalls = penalties.reduce((sum, a) => sum + a, 0);
  return 6 + extraBalls;
}

export function NewOver(scorecard) {
  const lastOver = scorecard[scorecard.length - 1] ?? [];
  if (lastOver.length === 0) {
    return true;
  } else {
    return lastOver.length === BallsRequiredInOver(lastOver);
  }
}

export function UpdateScorecard(ball, scorecard) {
  const updatedScorecard = scorecard.slice();
  if (NewOver(scorecard)) {
    updatedScorecard.push([]);
  }
  const currentOver = updatedScorecard[updatedScorecard.length - 1].slice();
  currentOver[currentOver.length] = ball;
  updatedScorecard[updatedScorecard.length - 1] = currentOver;
  return updatedScorecard;
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

  handleClick(ball) {
    const currentScorecard = this.state.scorecard.slice();
    const updatedScorecard = UpdateScorecard(ball, currentScorecard);
    const currentOver = updatedScorecard[updatedScorecard.length - 1];
    let newBowlerChosen = this.state.newBowlerChosen.valueOf();

    if (currentOver.length === BallsRequiredInOver(currentOver)) {
      newBowlerChosen = false;
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
