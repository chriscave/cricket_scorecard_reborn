import React from "react";
import BowlerNameDropdown from "../BowlerNameDropdown";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default {
  title: "BowlerNameDropdown",
  component: BowlerNameDropdown,
};

const Template = (args) => <BowlerNameDropdown {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  bowlerChosen: false,
  names: ["Bowler 1", "Bowler 2"],
  onClick: () => null,
};
