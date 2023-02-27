import React from "react";
import BowlingScorecard from "../BowlingScorecard";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "BowlingScorecard",
  component: BowlingScorecard,
};

const Template = (args) => <BowlingScorecard {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: [[]],
  names: ["Bowler1", "Bowler2"],
  order: [],
};
