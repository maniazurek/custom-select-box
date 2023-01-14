import React from "react";

import Option from "./components/Option";

import optionsToSelect from "./utils/optionsToSelect";

const App = () => {
  return (
    <>
      <Option optionsToSelect={optionsToSelect} placeholder="Choose your favorite character" />
    </>
  );
};

export default App;
