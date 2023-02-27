import React from "react";

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
          <div>{this.renderButton("Wkt")}</div>
          <div>
            <div>{this.renderButton("No ball")}</div>
            <div>{this.renderButton("Wide")}</div>

            {/* <button>Bye</button> */}
            {/* <button>LB</button> */}
          </div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }
}

export default BallDetailInput;
