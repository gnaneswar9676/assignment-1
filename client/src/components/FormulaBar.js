import React from "react";
import { calculate, trim, upper, lower } from "../utils/functions";

const FormulaBar = ({ formula, setFormula, updateCell, activeCell, gridData }) => {
  const handleFormulaChange = (e) => {
    setFormula(e.target.value);
  };

  const handleFormulaSubmit = (e) => {
    if (e.key === "Enter") {
      let result = formula;
      if (formula.startsWith("=")) {
        const funcName = formula.slice(1).split("(")[0].toUpperCase();
        switch (funcName) {
          case "TRIM":
            result = trim(formula.slice(5, -1));
            break;
          case "UPPER":
            result = upper(formula.slice(6, -1));
            break;
          case "LOWER":
            result = lower(formula.slice(6, -1));
            break;
          default:
            result = calculate(formula, gridData);
        }
      }
      updateCell(activeCell.row, activeCell.col, result);
    }
  };

  return (
    <div className="formula-bar">
      <span className="cell-label">
        {String.fromCharCode(65 + activeCell.col)}
        {activeCell.row + 1}
      </span>
      <input
        type="text"
        value={formula}
        onChange={handleFormulaChange}
        onKeyDown={handleFormulaSubmit}
        placeholder="fx"
      />
    </div>
  );
};

export default FormulaBar;