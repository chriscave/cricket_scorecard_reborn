import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

function BowlerNameDropdown(props) {
  if (props.bowlerChosen) {
    return <div></div>;
  } else {
    return (
      <DropdownButton id="bowlerNameDropdown" title="Choose a Bowler">
        {props.names.map((name) => (
          <Dropdown.Item key={name} onClick={() => props.onClick(name)}>
            {name}
          </Dropdown.Item>
        ))}
      </DropdownButton>
    );
  }
}

export default BowlerNameDropdown;
