import React from "react";

class BallDetailInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { widePenalty: false };
  }

  handleExtraClick(i) {
    let widePenalty = this.state.widePenalty.valueOf();
    widePenalty = !widePenalty;
    this.setState({ widePenalty: widePenalty });
    return this.props.onClick(i);
  }
  renderButton(i) {
    return <button onClick={() => this.props.onClick(i)}>{i}</button>;
  }

  renderPenaltyButton(i) {
    return <button onClick={() => this.handleExtraClick(i)}>{i}</button>;
  }
  render() {
    if (this.props.bowlerChosen) {
      if (this.state.widePenalty === false) {
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
            <div>{this.renderButton("Wkt")}</div>
            <div>
              {this.renderPenaltyButton("Wide")}

              {/* <button>Bye</button> */}
              {/* <button>LB</button> */}
            </div>
          </div>
        );
      } else {
        return (
          <div>
            {this.renderPenaltyButton(0)}
            {this.renderPenaltyButton(1)}
            {this.renderPenaltyButton(2)}
            {this.renderPenaltyButton(3)}
            {this.renderPenaltyButton(4)}
            {this.renderPenaltyButton(6)}
          </div>
        );
      }
    } else {
      return <div></div>;
    }
  }
}

export default BallDetailInput;
