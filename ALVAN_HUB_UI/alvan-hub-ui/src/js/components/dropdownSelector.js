import React, { useEffect, useState } from "react";
import './dropdownSelector.scss';

function Selector (props) {
  const {options, selectedOption, onChange, isUnselectable, showSettingsButton, settingsButtonOnClick} = props;
  const [isOpen, setIsOpen] = useState(false);
  const toggleOpen = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  }

  document.addEventListener("click", (event) => {
    if (isOpen) {
      const selector = document.getElementsByClassName("selector-header")[0];
      const isClickInside = selector.contains(event.target);
      if (!isClickInside) {
        setIsOpen(false);
      }
    }
  });

  return (
    <div className="dropdown-selector">
      <div
        className="selector-header"
        onClick={(event) => {
          if (!isUnselectable && options.length > 1) {
            toggleOpen(event)
          }
        }}
        onTouch={toggleOpen}
      >
        <div className="default-selection selector-selected">{options.filter(option => option.key === selectedOption.key)[0]?.value}</div>
        <div className="spacer" />
        {
          options.length > 1 &&
          (
            <div className={`selector-caret ${isOpen ? 'caret-up' : 'caret-down' }`}><ion-icon name='caret-up-outline'></ion-icon></div>
          )
        }
      </div>

      {
        showSettingsButton &&
        (
          <div className='list-settings-icon button' onClick={(event) => {event.stopPropagation(); settingsButtonOnClick(event);}}>
            <ion-icon name="ellipsis-horizontal-outline"></ion-icon>
          </div>
        )
      }
      <div className={`selector-dropdown-body-container`}>
        {
          <div className={`${isOpen ? 'body-down' : 'body-up'} selector-dropdown-body`}>
            {
              isOpen &&
              options.map((option, index) => (
                <div onClick={() => onChange(option)} onTouch={() => onChange(option)} className={`selector-option ${index + 1  !== options.length ? 'selector-option-non-final' : ''}`}>
                  {option.value}
                </div>
              ))
            }
          </div>
        }
      </div>

    </div> 
  );
}

export default Selector;