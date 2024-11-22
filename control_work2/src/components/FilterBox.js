import React from "react";

function FilterBox({ onFilter }) {
  const handleChange = (event) => {
    onFilter(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by name, last name, or email..."
        className="form-control m-0"
        style={{ width: "300px" }}
        onChange={handleChange}
      />
    </div>
  );
}

export default FilterBox;
