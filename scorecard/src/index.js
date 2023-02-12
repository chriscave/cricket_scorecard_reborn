import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function BallDetail(props) {
  const className = props.side + " ball";
  return <div className={className}> {props.value}</div>;
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
  return <div className="over-score">{props.value}</div>;
}

function Over(props) {
  return (
    <div className="over">
      <OverDetail value={props.value} />
      <OverScore value={props.score} />
    </div>
  );
}

function BowlerName(props) {
  return <div className="bowler-name">{props.value}</div>;
}

function BowlerDetails(props) {
  return (
    <div className="bowler-details">
      {" "}
      <BowlerName value={props.name} />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
      <Over />
    </div>
  );
}

function BowlingScorecard(props) {
  return (
    <div className="bowling-scorecard">
      <BowlerDetails />
      <BowlerDetails />
      <BowlerDetails />
      <BowlerDetails />
      <BowlerDetails />
      <BowlerDetails />
    </div>
  );
}

function BallDetailInput(props) {
  return (
    <div>
      <div>
        <button>0</button>
        <button>1</button>
        <button>2</button>
      </div>
      <div>
        <button>3</button>
        <button>4</button>
        <button>6</button>
      </div>
      <div>
        <button>Wkt</button>
        {/* <button>NB</button> */}
        {/* <button>Bye</button> */}
        {/* <button>Wide</button> */}
        {/* <button>LB</button> */}
      </div>
    </div>
  );
}
class Scorecard extends React.Component {
  render() {
    return (
      <div>
        <BowlingScorecard />
        <BallDetailInput />
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

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
