import React from "react";
import BowlerDetails from "../BowlerDetails";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "BowlerDetails",
  component: BowlerDetails,
};

const Template = (args) => <BowlerDetails {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  name: "Bowler 1",
  value: [
    [1, 2, 3, 4, 5, 6],
    ["Wkt", 3, 4, 5, 6, 7],
  ],
};
