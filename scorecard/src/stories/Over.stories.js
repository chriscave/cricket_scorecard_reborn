import React from "react";
import Ball from "../Ball";
import Over from "../Over";

import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "Over",
  component: Over,
};

const Template = (args) => <Over {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  value: [
    new Ball(1),
    new Ball(2),
    new Ball(3),
    new Ball("Wkt"),
    new Ball(5),
    new Ball(6),
  ],
  score: 20,
  wickets: 2,
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: [
    new Ball(0),
    new Ball(0),
    new Ball(0),
    new Ball(0),
    new Ball(0),
    new Ball(0),
  ],
  score: 5,
  wickets: 1,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  value: [new Ball(0), new Ball(0), new Ball(0), new Ball(0)],
  score: 100,
  wickets: 1,
};

export const NoBall = Template.bind({});
NoBall.args = {
  value: [
    new Ball(1),
    new Ball(2),
    new Ball("No ball", 0),
    new Ball("No ball", 1),
    new Ball("No ball", 2),
    new Ball("No ball", 3),
    new Ball("No ball", 4),
    new Ball("No ball", 5),
    new Ball("No ball", 6),
  ],
  score: 0,
};

export const Wide = Template.bind({});
Wide.args = {
  value: [
    new Ball("Wide", 0),
    new Ball("Wide", 1),
    new Ball("Wide", 2),
    new Ball("Wide", 3),
    new Ball("Wide", 4),
  ],
  score: 2,
};
