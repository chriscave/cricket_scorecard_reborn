import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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
  let overWickets = props.value.map((over) =>
    over.map((ball) => ball === "Wkt")
  );
  overWickets = overWickets.map((over) => over.reduce((a, b) => a + b));
  const cumSumWickets = cumulativeSum(overWickets);

  const bowlerOverDetails = props.value;
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

function BowlingScorecard(props) {
  return (
    <div className="bowling-scorecard">
      <BowlerDetails value={props.value} />
      {/* <BowlerDetails />
      <BowlerDetails />
      <BowlerDetails />
      <BowlerDetails />
      <BowlerDetails /> */}
    </div>
  );
}

class BallDetailInput extends React.Component {
  renderButton(i) {
    return <button onClick={() => this.props.onClick(i)}>{i}</button>;
  }
  render() {
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
  }
}
class Scorecard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      scorecard: [],
      bowlerNames: [],
    };
  }
  handleClick(i) {
    let currentOver;
    const updatedScorecard = this.state.scorecard.slice();
    const lastOver = updatedScorecard.at(-1) ? updatedScorecard.at(-1) : [];
    if (updatedScorecard.length === 0 || lastOver.length === 6) {
      currentOver = [i];
      updatedScorecard.push(currentOver);
    } else {
      currentOver = lastOver.slice();
      currentOver.push(i);
      updatedScorecard[updatedScorecard.length - 1] = currentOver;
    }

    this.setState({ scorecard: updatedScorecard });
  }

  render() {
    return (
      <div>
        <BowlingScorecard value={this.state.scorecard} />
        <BallDetailInput onClick={(i) => this.handleClick(i)} />
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
