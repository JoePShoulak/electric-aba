import React from "react";

const DivisionForm = ({
  divisionData,
  handleInputChange,
  handleSubmit,
  buttonText,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={divisionData.name}
        placeholder="Division Name"
        onChange={handleInputChange}
      />
      <input
        type="number"
        name="teamCap"
        value={divisionData.teamCap}
        placeholder="Team Cap"
        onChange={handleInputChange}
      />
      <button type="submit">{buttonText}</button>
    </form>
  );
};

export default DivisionForm;
