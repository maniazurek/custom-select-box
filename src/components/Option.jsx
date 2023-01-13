import React, { useEffect, useState } from "react";

const Option = ({ optionsToSelect, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState({});
  const [selectedOptionDraft, setSelectedOptionDraft] = useState({});
  const [selectedOptionSubbmited, setSelectedOptionSubbmited] = useState({});
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [internalSuggestions, setInternalSugestions] =
    useState(optionsToSelect);

  useEffect(() => {
    window.addEventListener("click", () => setIsOptionsOpen(false));
  }, []);

  const onOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptionDraft(option);
    setSelectedOptionSubbmited(option);
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
    setIsOptionsOpen(false);
  };

  return (
    <div className="option_container">
      <div className="option__choosen-container">
        <div className="option__choosen">Choosen option:</div>
        <div className="option__choosen-element">
          {selectedOptionDraft.name && (
            <div style={{ display: "flex", gap: "5px" }}>
              <span>{selectedOptionSubbmited.name}</span>
              <span className="option__delete" onClick={onOptionDelete}>
                &#10005;
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="option__selected">
        <input
          className="option__selected-input"
          value={selectedOptionDraft.name}
          placeholder={placeholder}
          onChange={onOptionDraftEdit}
          onKeyUp={onOptionSubmit}
          onClick={(event) => {
            setIsOptionsOpen(true);
            event.stopPropagation();
          }}
        />
      </div>
      {isOptionsOpen && (
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
      )}
    </div>
  );
};

export default Option;
