export const calculate = (formula, gridData) => {
    if (!formula.startsWith("=")) return formula;
  
    const func = formula.slice(1).toUpperCase();
    const [name, range] = func.split("(");
    const rangeEnd = range.slice(0, -1).split(":");
    const [startCell, endCell] = rangeEnd;
  
    const parseCell = (cell) => {
      const col = cell.charCodeAt(0) - 65; // A=0, B=1, etc.
      const row = parseInt(cell.slice(1)) - 1;
      return [row, col];
    };
  
    const [startRow, startCol] = parseCell(startCell);
    const [endRow, endCol] = endCell ? parseCell(endCell) : [startRow, startCol];
  
    let values = [];
    for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
      for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
        values.push(parseFloat(gridData[r][c].value) || 0);
      }
    }
  
    switch (name) {
      case "SUM":
        return values.reduce((a, b) => a + b, 0);
      case "AVERAGE":
        return values.length ? values.reduce((a, b) => a + b, 0) / values.length : 0;
      case "MAX":
        return Math.max(...values);
      case "MIN":
        return Math.min(...values);
      case "COUNT":
        return values.filter((v) => !isNaN(v) && v !== 0).length;
      default:
        return "Invalid Formula";
    }
  };
  
  export const trim = (value) => (typeof value === "string" ? value.trim() : value);
  
  export const upper = (value) => (typeof value === "string" ? value.toUpperCase() : value);
  
  export const lower = (value) => (typeof value === "string" ? value.toLowerCase() : value);
  
  export const removeDuplicates = (gridData, selection) => {
    if (!selection) return gridData;
    const { start, end } = selection;
    const rows = [];
    const seen = new Set();
  
    for (let r = Math.min(start.row, end.row); r <= Math.max(start.row, end.row); r++) {
      const row = gridData[r].slice(start.col, end.col + 1).map((cell) => cell.value).join(",");
      if (!seen.has(row)) {
        seen.add(row);
        rows.push(gridData[r]);
      }
    }
    const newGrid = [...gridData];
    for (let i = 0; i < rows.length; i++) {
      newGrid[start.row + i] = rows[i];
    }
    return newGrid.slice(0, start.row + rows.length);
  };
  
  export const findAndReplace = (gridData, find, replace) => {
    const newGrid = gridData.map((row) =>
      row.map((cell) => ({
        ...cell,
        value:
          typeof cell.value === "string" ? cell.value.replace(new RegExp(find, "g"), replace) : cell.value,
      }))
    );
    return newGrid;
  };