import React from "react";

const Toolbar = ({ applyStyle }) => {
  return (
    <div className="toolbar">
      <div className="toolbar-group">
        <button title="Undo">⟲</button>
        <button title="Redo">⟳</button>
      </div>
      <div className="toolbar-group">
        <button onClick={() => applyStyle({ fontWeight: "bold" })} title="Bold">
          B
        </button>
        <button onClick={() => applyStyle({ fontStyle: "italic" })} title="Italic">
          I
        </button>
        <button onClick={() => applyStyle({ textDecoration: "underline" })} title="Underline">
          U
        </button>
      </div>
      <div className="toolbar-group">
        <select onChange={(e) => applyStyle({ fontSize: `${e.target.value}px` })}>
          <option value="10">10</option>
          <option value="12">12</option>
          <option value="14">14</option>
          <option value="16">16</option>
        </select>
        <input
          type="color"
          onChange={(e) => applyStyle({ color: e.target.value })}
          title="Text Color"
        />
        <input
          type="color"
          onChange={(e) => applyStyle({ backgroundColor: e.target.value })}
          title="Fill Color"
        />
      </div>
    </div>
  );
};

export default Toolbar;