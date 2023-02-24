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
  value: [1, 2, 3, 4, 5, 6],
  score: 20,
  wickets: 2,
};
