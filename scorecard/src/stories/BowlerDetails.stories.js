import React from "react";
import BowlerDetails from "../BowlerDetails";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Ball from "../Ball";

export default {
  title: "BowlerDetails",
  component: BowlerDetails,
};

const Template = (args) => <BowlerDetails {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: "Bowler 1",
  value: [
    [
      new Ball(1),
      new Ball(2),
      new Ball(3),
      new Ball(4),
      new Ball(5),
      new Ball(6),
    ],
    [
      new Ball("Wkt"),
      new Ball(3),
      new Ball(4),
      new Ball(5),
      new Ball(6),
      new Ball(7),
    ],
  ],
};

export const Extras = Template.bind({});
Extras.args = {
  name: "Bowler 1",
  value: [[new Ball("Wide", 3), new Ball("No ball", 1)]],
};
