import React from "react";
import BallDetailInput from "../BallDetailInput";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "BallDetailInput",
  component: BallDetailInput,
};

const Template = (args) => <BallDetailInput {...args} />;

export const NewBowlerChosen = Template.bind({});
NewBowlerChosen.args = {
  bowlerChosen: true,
  onClick: () => console.log("button pressed"),
};
