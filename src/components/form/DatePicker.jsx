import React, { useState } from 'react';

const DatePicker = ({ placeholder = "Select date", onChange, className = "" }) => {
  const [hasValue, setHasValue] = useState(false);

  const handleChange = (e) => {
    setHasValue(!!e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`relative flex items-center ${className}`}>
      {!hasValue && (
        <>
          <div className="absolute left-3 z-10 flex items-center text-text-muted pointer-events-none">
            <i className="material-icons text-[1.1rem] mr-2">calendar_today</i>
            <span className="text-[0.85rem]">{placeholder}</span>
          </div>
          <i className="material-icons absolute right-2.5 z-10 text-[1.3rem] text-text-muted pointer-events-none">keyboard_arrow_down</i>
        </>
      )}
      <input
        type="date"
        onChange={handleChange}
        className={`relative m-0 h-9 border border-border rounded-lg pl-3 text-[0.85rem] w-[140px] box-border bg-card-bg cursor-pointer font-sans focus:outline-none focus:border-accent-blue [color-scheme:dark] [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:top-0 [&::-webkit-calendar-picker-indicator]:left-0 [&::-webkit-calendar-picker-indicator]:w-full [&::-webkit-calendar-picker-indicator]:h-full [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer ${hasValue ? 'text-text-main pr-3' : 'text-transparent pr-2'
          }`}
      />
    </div>
  );
};

export default DatePicker;
