import React, { useState } from "react";

const Option = ({ optionsToSelect, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedOptionDraft, setSelectedOptionDraft] = useState({});
  const [selectedOptionSubbmited, setSelectedOptionSubbmited] = useState({});

  const onOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptionDraft(option);
  };

  const onOptionDelete = () => {
    setSelectedOption({ name: "" });
    setSelectedOptionDraft({ name: "" });
    setSelectedOptionSubbmited({});
  };

  const onOptionDraftEdit = (event) => {
    const optionEdited = { ...selectedOption, name: event.target.value };
    setSelectedOptionDraft(optionEdited);
  };

  const onOptionSubmit = (event) => {
    if (event.key === "Enter") {
      const matchingOption = optionsToSelect.find((option) => {
        option.name === selectedOptionDraft.name;
      });
      if (matchingOption) {
        setSelectedOption(selectedOptionDraft);
      } else {
        setSelectedOptionDraft(selectedOption);
        setSelectedOptionSubbmited(selectedOption);
      }
    }
  };

  return (
    <>
      <div className="option_container">
        <div className="option__selected">
          <input
            className="option__selected-input"
            value={selectedOptionDraft.name}
            placeholder={placeholder}
            onChange={onOptionDraftEdit}
            onKeyUp={onOptionSubmit}
          />
          {selectedOptionDraft.name && (
            <span className="option__delete" onClick={onOptionDelete}>
              &#10005;
            </span>
          )}
        </div>
        <ul className="option__list">
          {optionsToSelect.map((option) => (
            <li
              className="option__list-element"
              key={option.id}
              onClick={() => onOptionSelect(option)}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
      <div>{selectedOptionSubbmited.name}</div>
    </>
  );
};

export default Option;
