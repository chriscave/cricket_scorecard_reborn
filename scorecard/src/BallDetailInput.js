import React, { useState } from "react";
import Ball from "./Ball";

function BallDetailInput(props) {
  const [extra, setExtra] = useState(null);

  function renderButton(i) {
    return <button onClick={() => props.onClick(new Ball(i))}>{i}</button>;
  }

  function renderExtraRunButton(i) {
    return (
      <button
        onClick={() => {
          props.onClick(new Ball(extra, i));
          setExtra(null);
        }}
      >
        {i}
      </button>
    );
  }
  if (props.bowlerChosen) {
    if (extra === null) {
      return (
        <div>
          <div>
            {renderButton(0)}
            {renderButton(1)}
            {renderButton(2)}
          </div>
          <div>
            {renderButton(3)}
            {renderButton(4)}
            {renderButton(6)}
          </div>
          <div>{renderButton("Wkt")}</div>
          <div>
            <button onClick={() => setExtra("Wide")}> Wide</button>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          {renderExtraRunButton(1)}
          {renderExtraRunButton(2)}
          {renderExtraRunButton(3)}
          {renderExtraRunButton(4)}
          {renderExtraRunButton(5)}
          {renderExtraRunButton(6)}
        </div>
      );
    }
  } else {
    return <div></div>;
  }
}
export default BallDetailInput;
