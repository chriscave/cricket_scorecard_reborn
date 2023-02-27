import React from "react";

function BallDetail(props) {
  return (
    <div className="ball"> {props.value === "Wkt" ? "W" : props.value}</div>
  );
}

function BallColumnDetail(props) {
  if (props.value) {
    return (
      <div className="ball-column">
        {props.value.map((ballValue) => (
          <BallDetail value={ballValue} />
        ))}
      </div>
    );
  } else {
    return <></>;
  }
}

function OverDetail(props) {
  const firstcolumn = props.value
    ? [props.value[0], props.value[1], props.value[2]]
    : null;
  const secondcolumn = props.value
    ? [props.value[3], props.value[4], props.value[5]]
    : null;
  // const extracolumn = ["", "", ""];

  return (
    <div className="over-detail">
      <BallColumnDetail value={firstcolumn} />
      {/* <BallColumnDetail value={extracolumn} /> */}
      <BallColumnDetail value={secondcolumn} />
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

export default function Over(props) {
  return (
    <div className="over">
      <OverDetail value={props.value} />
      <OverScore value={props.score} wickets={props.wickets} />
    </div>
  );
}
