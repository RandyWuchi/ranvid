import React from "react";

const SearchBox = ({ value, onChange }) => {
  return (
    <input
      type="text"
      className="form-control my-3"
      name="query"
      value={value}
      placeholder="Search movie..."
      onChange={(e) => onChange(e.currentTarget.value)}
    />
  );
};

export default SearchBox;
