import React, { useEffect, useState } from "react";

import SelectedOption from "./SelectedOption";

const Option = ({ optionsToSelect, placeholder }) => {
  const [selectedOption, setSelectedOption] = useState({ name: "", id: "" });
  const [selectedOptionDraft, setSelectedOptionDraft] = useState({
    name: "",
    id: "",
  });
  const [selectedOptionSubbmited, setSelectedOptionSubbmited] = useState({});
  const [areOptionsOpen, setAreOptionsOpen] = useState(false);

  useEffect(() => {
    const onWindowClick = () => setAreOptionsOpen(false);
    window.addEventListener("click", onWindowClick);
    return () => window.removeEventListener("click", onWindowClick);
  }, []);

  const onOptionSelect = (option) => {
    setSelectedOption(option);
    setSelectedOptionDraft(option);
    setSelectedOptionSubbmited(option);
  };

  const onOptionDelete = () => {
    setSelectedOption({ name: "", id: "" });
    setSelectedOptionDraft({ name: "", id: "" });
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
        setAreOptionsOpen(false);
      });
      if (matchingOption) {
        setSelectedOption(selectedOptionDraft);
        setAreOptionsOpen(false);
      } else {
        setSelectedOptionDraft(selectedOption);
        setSelectedOptionSubbmited(selectedOption);
      }
    }
  };

  const onOptionsOpen = (event) => {
    event.stopPropagation();
    setAreOptionsOpen(true);
  };

  return (
    <div className="container">
      <div className="option_container">
        <div className="option__selected">
          <input
            className="option__selected-input"
            value={selectedOptionDraft.name}
            placeholder={placeholder}
            onChange={onOptionDraftEdit}
            onKeyUp={onOptionSubmit}
            onClick={onOptionsOpen}
          />
          {selectedOption.name && (
            <span className="option__delete" onClick={onOptionDelete}>
              &#10005;
            </span>
          )}
        </div>
        {areOptionsOpen && (
          <ul className="option__list">
            {optionsToSelect
              .filter((option) =>
                option.name
                  .toLowerCase()
                  .includes(selectedOptionDraft.name.toLowerCase())
              )
              .map((option) => (
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
      <SelectedOption
        selectedOptionDraft={selectedOptionDraft}
        selectedOptionSubbmited={selectedOptionSubbmited}
      />
    </div>
  );
};

export default Option;
