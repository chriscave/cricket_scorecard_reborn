import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function Ball(props) {
  return <span className="ball"> {props.value}</span>;
}

class Over extends React.Component {
  // renderRow(i) {
  //   let ball_numbers;
  //   if (i === 0) {
  //     ball_numbers = [0, 3];
  //   } else if (i === 1) {
  //     ball_numbers = [1, 4];
  //   } else {
  //     ball_numbers = [2, 5];
  //   }

  //   return (
  //     <>
  //       <div>
  //         {" "}
  //         <Ball value={this.props.value[ball_numbers[0]]} />
  //       </div>
  //       <div>
  //         <Ball value={this.props.value[ball_numbers[1]]} />
  //       </div>
  //     </>
  //   );
  // }

  render() {
    return (
      <div className="over">
        {" "}
        <div>
          <Ball value={1} />
          <Ball value={2} />
        </div>
        <div>
          <Ball value={1} />
          <Ball value={2} />
        </div>
        <div>
          <Ball value={1} />
          <Ball value={2} />
        </div>
      </div>
      // <div className="over">
      //   {this.renderRow(0)}
      //   {this.renderRow(1)}
      //   {this.renderRow(2)}
      //   <div className="over-score">score</div>
      // </div>
    );
  }
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Over value={[3, ".", 2, 3, ".", 5]} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
