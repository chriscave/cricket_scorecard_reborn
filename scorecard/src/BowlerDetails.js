import React from "react";
import Over from "./Over";

function BowlerName(props) {
  return <div className="bowler-name">{props.value}</div>;
}

export default function BowlerDetails(props) {
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
  const noOvers = 21;
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
