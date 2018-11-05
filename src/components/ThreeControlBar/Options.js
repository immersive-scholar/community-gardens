import React from "react";
import { Icon } from "react-icons-kit";
import { equalizer } from "react-icons-kit/icomoon/equalizer";
import { cancelCircle } from "react-icons-kit/icomoon/cancelCircle";

const Options = ({ optionsOpen, toggleOptions }) => (
  <div
    onClick={() => toggleOptions()}
    style={{ color: "#ffffff", display: "inlineBlock" }}
  >
    {!optionsOpen ? (
      <Icon size={24} icon={equalizer} />
    ) : (
      <Icon size={24} icon={cancelCircle} />
    )}
  </div>
);

export default Options;
