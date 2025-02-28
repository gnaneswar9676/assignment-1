import React, { useState } from "react";
import { calculate } from "../utils/functions";

const Grid = ({ gridData, updateCell, activeCell, onCellFocus, selection, setSelection }) => {
  const [dragging, setDragging] = useState(false);
  const [dragType, setDragType] = useState(null); // "selection" or "fill"

  const handleChange = (row, col, e) => {
    const value = e.target.value;
    const result = value.startsWith("=") ? calculate(value, gridData) : value;
    updateCell(row, col, result);
  };

  const handleMouseDown = (row, col, type) => {
    setDragging(true);
    setDragType(type);
    if (type === "selection") {
      setSelection({ start: { row, col }, end: { row, col } });
    }
  };

  const handleMouseOver = (row, col) => {
    if (dragging) {
      setSelection((prev) => {
        if (!prev) return { start: { row, col }, end: { row, col } };
        return { ...prev, end: { row, col } };
      });
    }
  };

  const handleMouseUp = () => {
    if (dragging && selection && dragType === "fill") {
      const { start, end } = selection;
      const sourceValue = gridData[activeCell.row][activeCell.col].value;
      const newGrid = [...gridData];
      
      // Fill the dragged range with the source value
      for (let r = Math.min(start.row, end.row); r <= Math.max(start.row, end.row); r++) {
        for (let c = Math.min(start.col, end.col); c <= Math.max(start.col, end.col); c++) {
          const result = sourceValue.startsWith("=") ? calculate(sourceValue, gridData) : sourceValue;
          newGrid[r][c] = { ...newGrid[r][c], value: result };
        }
      }
      updateCell(0, 0, newGrid[0][0].value); // Trigger re-render by updating a cell
    }
    setDragging(false);
    setDragType(null);
    if (selection && dragType === "selection") {
      const { start, end } = selection;
      if (start.row === end.row && start.col === end.col) {
        setSelection(null);
      }
    }
  };

  const isSelected = (row, col) => {
    if (!selection || !selection.start || !selection.end) return false;
    const { start, end } = selection;
    return (
      row >= Math.min(start.row, end.row) &&
      row <= Math.max(start.row, end.row) &&
      col >= Math.min(start.col, end.col) &&
      col <= Math.max(start.col, end.col)
    );
  };

  return (
    <div className="grid-container" onMouseUp={handleMouseUp}>
      <div className="corner" />
      <div className="col-labels">
        {gridData[0].map((_, colIndex) => (
          <div key={colIndex} className="col-label">
            {String.fromCharCode(65 + colIndex)}
          </div>
        ))}
      </div>
      <div className="row-labels">
        {gridData.map((_, rowIndex) => (
          <div key={rowIndex} className="row-label">
            {rowIndex + 1}
          </div>
        ))}
      </div>
      <div className="grid" onMouseUp={handleMouseUp}>
        {gridData.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <div className="cell-wrapper" key={`${rowIndex}-${colIndex}`}>
                <input
                  value={cell.value}
                  onChange={(e) => handleChange(rowIndex, colIndex, e)}
                  onFocus={() => onCellFocus(rowIndex, colIndex)}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex, "selection")}
                  onMouseOver={() => handleMouseOver(rowIndex, colIndex)}
                  className={
                    activeCell.row === rowIndex && activeCell.col === colIndex
                      ? "cell active"
                      : isSelected(rowIndex, colIndex)
                      ? "cell selected"
                      : "cell"
                  }
                  style={cell.style}
                />
                {activeCell.row === rowIndex && activeCell.col === colIndex && (
                  <div
                    className="fill-handle"
                    onMouseDown={(e) => {
                      e.stopPropagation(); // Prevent cell selection
                      handleMouseDown(rowIndex, colIndex, "fill");
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;