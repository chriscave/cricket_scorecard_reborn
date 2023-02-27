import React from "react";
import BowlerDetails from "./BowlerDetails";

export default class BowlingScorecard extends React.Component {
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
