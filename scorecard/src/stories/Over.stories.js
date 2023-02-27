import React from "react";

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
  value: [1, 2, 3, "Wkt", 5, 6],
  score: 20,
  wickets: 2,
};

export const Secondary = Template.bind({});
Secondary.args = {
  value: [0, 0, 0, 0, 0, 0],
  score: 5,
  wickets: 1,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  value: [0, 0, 0, 0],
  score: 100,
  wickets: 1,
};
