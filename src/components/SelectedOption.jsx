import React, { useState } from "react";

const SelectedOption = ({
  selectedOptionDraft,
  selectedOptionSubbmited,
}) => {
  return (
    <div className="option__choosen-container">
      {selectedOptionSubbmited.name && (
        <div className="option__choosen">
          Your favorite character for today is...
        </div>
      )}
      <div className="option__choosen-element">
        {selectedOptionDraft.name && (
          <div style={{ display: "flex", gap: "5px" }}>
            <span>{selectedOptionSubbmited.name}</span>
          </div>
        )}
      </div>
      <div
        className="option__submitted"
        style={{ backgroundImage: `url(${selectedOptionDraft.imageURL})` }}
      ></div>
    </div>
  );
};

export default SelectedOption;
