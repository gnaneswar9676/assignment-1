import React, { useState } from "react";
import Grid from "./components/Grid";
import Toolbar from "./components/Toolbar";
import FormulaBar from "./components/FormulaBar";
import "./App.css";

function App() {
  const [gridData, setGridData] = useState(
    Array(20)
      .fill()
      .map(() => Array(26).fill({ value: "", style: {} })) // Expanded to 26 columns (A-Z)
  );
  const [activeCell, setActiveCell] = useState({ row: 0, col: 0 });
  const [formula, setFormula] = useState("");
  const [selection, setSelection] = useState(null);

  const updateCell = (row, col, value) => {
    const newGrid = [...gridData];
    newGrid[row][col] = { ...newGrid[row][col], value };
    setGridData(newGrid);
  };

  const handleCellFocus = (row, col) => {
    setActiveCell({ row, col });
    setFormula(gridData[row][col].value || "");
    setSelection(null);
  };

  const applyStyle = (style) => {
    const newGrid = [...gridData];
    newGrid[activeCell.row][activeCell.col].style = {
      ...newGrid[activeCell.row][activeCell.col].style,
      ...style,
    };
    setGridData(newGrid);
  };

  return (
    <div className="app">
      <Toolbar applyStyle={applyStyle} />
      <FormulaBar
        formula={formula}
        setFormula={setFormula}
        updateCell={updateCell}
        activeCell={activeCell}
        gridData={gridData}
      />
      <Grid
        gridData={gridData}
        updateCell={updateCell}
        activeCell={activeCell}
        onCellFocus={handleCellFocus}
        selection={selection}
        setSelection={setSelection}
      />
    </div>
  );
}

export default App;