import React from "react";

function FilterBox({ onFilter }) {
  const handleChange = (event) => {
    onFilter(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name..."
        onChange={handleChange}
      />
    </div>
  );
}

export default FilterBox;
