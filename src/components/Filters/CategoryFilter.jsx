import React from "react";
export default function CategoryFilter({ data, value, onChange }) {
  if (!data) return null;
  const categories = Array.from(new Set(data.map((item) => item.category)));
  return (
    <div style={{ marginBottom:"10px" }}>
      <label style={{ marginRight: "10px" }}>Category</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">All</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
