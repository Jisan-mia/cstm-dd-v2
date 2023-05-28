/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import ArrowIcon from "./ArrowIcon";
import CloseIcon from "./CloseIcon";
import "./CustomDropdown.css";

const CustomDropdown = ({
  placeholder,
  options,
  isMulti,
  isSearchable,
  onChange,
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValue, setSelectedValue] = useState(isMulti ? [] : null);
  const [searchValue, setSearchValue] = useState("");
  const searchRef = useRef();
  const inputRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    window.addEventListener("click", handler);

    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  useEffect(() => {
    setSearchValue("");
    if (showMenu && searchRef.current) {
      searchRef.current.focus();
    }
  }, [showMenu]);

  // show selected item label or list of selected item label
  const getDisplay = () => {
    if (!selectedValue || selectedValue.length == 0) {
      return placeholder;
    }

    if (isMulti) {
      return (
        <div className="dropdown-tags">
          {selectedValue.map((option) => (
            <div key={option.value} className="dropdown-tag-item">
              {option.label}
              <button
                className="dropdown-tag-close"
                onClick={(e) => onTagRemove(e, option)}
              >
                <CloseIcon />
              </button>
            </div>
          ))}
        </div>
      );
    }

    return selectedValue.label;
  };

  // remove an option from selected value
  const removeOption = (option) => {
    return selectedValue.filter((item) => item.value !== option.value);
  };

  // remove tag when multi select is on
  const onTagRemove = (e, option) => {
    e.stopPropagation();
    const newValue = removeOption(option);

    setSelectedValue(newValue);
    onChange(newValue);
  };

  // show/hide dropdown
  const handleInputClick = () => {
    setShowMenu(!showMenu);
  };

  const onItemSelect = (option) => {
    let newValue;

    if (isMulti) {
      if (selectedValue.findIndex((o) => o.value === option.value) !== -1) {
        newValue = removeOption(option);
      } else {
        newValue = [...selectedValue, option];
      }
    } else {
      newValue = option;
    }

    setSelectedValue(newValue);
    onChange(newValue);
  };

  const isSelected = (option) => {
    if (isMulti) {
      return selectedValue.filter((o) => o.value === option.value).length > 0;
    }
    if (!selectedValue) {
      return false;
    }
    return selectedValue.value === option.value;
  };

  const onSearch = (e) => {
    setSearchValue(e.target.value);
  };

  const getOptions = () => {
    if (!searchValue) {
      return options;
    }
    return options.filter(
      (option) =>
        option.label.toLowerCase().indexOf(searchValue.toLowerCase()) !== -1
    );
  };

  return (
    <div className="dropdown-container">
      <div ref={inputRef} onClick={handleInputClick} className="dropdown-input">
        <div className="dropdown-selected-value"> {getDisplay()}</div>
        <div className="dropdown-tools">
          <div className={`dropdown-tool ${showMenu && "invert"}`}>
            <ArrowIcon />
          </div>
        </div>
      </div>

      {showMenu && (
        <div className="dropdown-menu">
          {isSearchable && (
            <div className="search-box">
              <input onChange={onSearch} value={searchValue} ref={searchRef} />
            </div>
          )}
          {getOptions().map((option) => (
            <div
              onClick={() => onItemSelect(option)}
              key={option.value}
              className={`dropdown-item ${isSelected(option) && "selected"}`}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;