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
  let overWickets = props.value
    ? props.value.map((over) => over.map((ball) => ball === "Wkt"))
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

// function BowlingScorecard(props) {
//   return (
//     <div className="bowling-scorecard">
//       <BowlerDetails value={props.value} name={props.names[0]} />
//       <BowlerDetails name={props.names[1]} />
//       <BowlerDetails name={props.names[2]} />
//       <BowlerDetails name={props.names[3]} />
//       <BowlerDetails name={props.names[4]} />
//       <BowlerDetails name={props.names[5]} />
//     </div>
//   );
// }

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

function BowlerNameDropdown(props) {
  return (
    <div className="left">
      <label htmlFor="pet-select">Choose a Bowler:</label>

      <select name="bowlers" id="bowler-select">
        {props.names.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
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
    };
  }
  handleClick(i) {
    let currentOver;
    const updatedScorecard = this.state.scorecard.slice();
    const bowlerOrder = this.state.bowlerOrder.slice();
    const lastOver = updatedScorecard.at(-1) ? updatedScorecard.at(-1) : [];
    if (updatedScorecard.length === 0 || lastOver.length === 6) {
      currentOver = [i];
      updatedScorecard.push(currentOver);
      if (updatedScorecard.length % 2 == 1) {
        bowlerOrder.push("Bowler 1");
      } else {
        bowlerOrder.push("Bowler 2");
      }
    } else {
      currentOver = lastOver.slice();
      currentOver.push(i);
      updatedScorecard[updatedScorecard.length - 1] = currentOver;
    }

    this.setState({ scorecard: updatedScorecard, bowlerOrder: bowlerOrder });
  }

  render() {
    return (
      <div>
        <BowlingScorecard
          value={this.state.scorecard}
          names={this.state.bowlerNames}
          order={this.state.bowlerOrder}
        />
        <BallDetailInput onClick={(i) => this.handleClick(i)} />
        <BowlerNameDropdown names={this.state.bowlerNames} />
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
