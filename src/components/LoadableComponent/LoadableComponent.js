import React from "react";
import Animated from "components/Animated";

const LoadableComponent = props => {
  const { error, pastDelay, timedOut, retry, page } = props;
  let message = "";
  if (error) {
    message = (
      <div>
        Error! <button onClick={retry}>Retry</button>
      </div>
    );
  } else if (pastDelay) {
    message = (
      <div>
        <Animated as="h1">Loading</Animated>
      </div>
    );
  } else if (timedOut) {
    message = (
      <div>
        Taking a long time... <button onClick={retry}>Retry</button>
      </div>
    );
  }

  const baseStyles = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100px",
    width: "200px",
    transition: "all 1s",
    margin: "auto"
  };

  const pageStyles = page
    ? {
        height: "100vh",
        width: "100vw"
      }
    : {};

  return (
    <div
      style={{
        ...baseStyles,
        ...pageStyles
      }}
    >
      {message}
    </div>
  );
};

export default LoadableComponent;

export const LoadablePage = props => <LoadableComponent {...props} page />;
