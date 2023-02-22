import React from "react";
import ReactDOM from "react-dom/client";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";

function BallDetail(props) {
  const className = props.side + " ball";
  return (
    <div className={className}>
      {" "}
      {props.value === "Wkt" ? "W" : props.value}
    </div>
  );
}

function BallRowDetail(props) {
  const leftball = props.value[0];
  const rightball = props.value[1];
  return (
    <div className="ball-row">
      {" "}
      <BallDetail side="left" value={leftball} />
      <BallDetail side="right" value={rightball} />
    </div>
  );
}

function OverDetail(props) {
  const firstrow = props.value ? [props.value[0], props.value[3]] : "";
  const secondrow = props.value ? [props.value[1], props.value[4]] : "";
  const thirdrow = props.value ? [props.value[2], props.value[5]] : "";

  return (
    <div className="over-detail">
      {" "}
      <BallRowDetail value={firstrow} /> <BallRowDetail value={secondrow} />{" "}
      <BallRowDetail value={thirdrow} />
    </div>
  );
}

function OverScore(props) {
  let score;
  if (props) {
    score = props.value;
  }
  if (props.wickets) {
    score += " - " + props.wickets;
  }

  return <div className="over-score">{score}</div>;
}

function Over(props) {
  return (
    <div className="over">
      <OverDetail value={props.value} />
      <OverScore value={props.score} wickets={props.wickets} />
    </div>
  );
}

function BowlerName(props) {
  return <div className="bowler-name">{props.value}</div>;
}

function BowlerDetails(props) {
  let overWickets = props.value
    ? props.value.map((over) => over.map((ball) => (ball === "Wkt" ? 1 : 0)))
    : [];
  overWickets = overWickets.map((over) => over.reduce((a, b) => a + b));
  const cumSumWickets = cumulativeSum(overWickets);

  const bowlerOverDetails = props.value ? props.value : [];
  const bowlerOverDetailsOnlyRuns = bowlerOverDetails.map((over) =>
    over.map((ball) => (ball === "Wkt" ? 0 : ball))
  );

  const overRuns = bowlerOverDetailsOnlyRuns.map((over) =>
    over.reduce((a, b) => a + b)
  );
  const cumSumRuns = cumulativeSum(overRuns);
  const noOvers = 27;
  let overNumbers = [];
  for (let i = 0; i < noOvers; i++) {
    overNumbers.push(i);
  }
  return (
    <div className="bowler-details">
      <BowlerName value={props.name} />
      {overNumbers.map((overNumber) => (
        <Over
          key={overNumber}
          value={bowlerOverDetails ? bowlerOverDetails[overNumber] : null}
          score={cumSumRuns ? cumSumRuns[overNumber] : null}
          wickets={cumSumWickets ? cumSumWickets[overNumber] : null}
        />
      ))}
    </div>
  );
}

class BowlingScorecard extends React.Component {
  getBowlerDetail(name, bowlerNameArray, scorecard) {
    let bowlerDetail = [];
    for (let i = 0; i < scorecard.length; i++) {
      if (bowlerNameArray[i] === name) {
        bowlerDetail.push(scorecard[i]);
      }
    }
    return bowlerDetail;
  }
  render() {
    return (
      <div className="bowling-scorecard">
        {this.props.names.map((name) => (
          <BowlerDetails
            key={name}
            value={this.getBowlerDetail(
              name,
              this.props.order,
              this.props.value
            )}
            name={name}
          />
        ))}
      </div>
    );
  }
}

class BallDetailInput extends React.Component {
  renderButton(i) {
    return <button onClick={() => this.props.onClick(i)}>{i}</button>;
  }
  render() {
    if (this.props.bowlerChosen) {
      return (
        <div>
          <div>
            {this.renderButton(0)}
            {this.renderButton(1)}
            {this.renderButton(2)}
          </div>
          <div>
            {this.renderButton(3)}
            {this.renderButton(4)}
            {this.renderButton(6)}
          </div>
          <div>
            {this.renderButton("Wkt")}
            {/* <button>NB</button> */}
            {/* <button>Bye</button> */}
            {/* <button>Wide</button> */}
            {/* <button>LB</button> */}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

function BowlerNameDropdown(props) {
  if (props.newOver) {
    return (
      <DropdownButton id="bowlerNameDropdown" title="Choose a Bowler">
        {props.names.map((name) => (
          <Dropdown.Item key={name} onClick={() => props.onClick(name)}>
            {name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  } else {
    return <div></div>;
  }
}

class Scorecard extends React.Component {
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

  newOver() {
    const updatedScorecard = this.state.scorecard.slice();
    const lastOver = updatedScorecard.at(-1) ? updatedScorecard.at(-1) : [];
    return updatedScorecard.length === 0 || lastOver.length === 6;
  }
  handleClick(i) {
    let currentOver;
    const updatedScorecard = this.state.scorecard.slice();
    const lastOver = updatedScorecard.at(-1) ? updatedScorecard.at(-1) : [];
    let newBowlerChosen = this.state.newBowlerChosen.valueOf();
    if (this.newOver()) {
      currentOver = [i];
      updatedScorecard.push(currentOver);
    } else {
      currentOver = lastOver.slice();
      currentOver.push(i);
      if (currentOver.length == 6) {
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
          names={this.state.bowlerNames}
          newOver={this.newOver()}
          onClick={(name) => this.handleBowlerChange(name)}
        />
      </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Scorecard />
  </React.StrictMode>
);

function cumulativeSum(array) {
  const sum = array.reduce(function (r, a) {
    if (r.length > 0) {
      a += r[r.length - 1];
    }
    r.push(a);
    return r;
  }, []);
  return sum;
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
