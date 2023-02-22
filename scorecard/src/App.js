import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import BowlingScorecard from "./BowlingScorecard";
import BallDetailInput from "./BallDetailInput";

import "./styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

function BowlerNameDropdown(props) {
  if (props.bowlerChosen) {
    return <div></div>;
  } else {
    return (
      <DropdownButton id="bowlerNameDropdown" title="Choose a Bowler">
        {props.names.map((name) => (
          <Dropdown.Item key={name} onClick={() => props.onClick(name)}>
            {name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
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
    let currentOver;
    const updatedScorecard = this.state.scorecard.slice();
    const lastOver = updatedScorecard.at(-1) ? updatedScorecard.at(-1) : [];
    let newBowlerChosen = this.state.newBowlerChosen.valueOf();
    if (updatedScorecard.length === 0 || lastOver.length === 6) {
      currentOver = [i];
      updatedScorecard.push(currentOver);
    } else {
      currentOver = lastOver.slice();
      currentOver.push(i);
      if (currentOver.length === 6) {
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
