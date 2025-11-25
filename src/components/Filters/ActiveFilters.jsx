import React from "react";

export default function ActiveFilters({category,price,onRemove}) {
  const items = [];
  if (category !== "all") {
    items.push({
      label: `Category:${category}`,
      key: "category",
    });
  }
  if (price.min !== 0 || price.max !== 1000) {
    items.push({
label:`price: ${price.min}-${price.max}`,
      key: "price",
    });
  }
  if (items.length === 0) return null;
  return (
    <div style={{ margin:"10px 0" }}>
      <strong>Active Filters :</strong>
      {items.map((item) => (
        <span
          key={item.key}
          style={{
            padding: "5px 10px",
            marginTop:"5PX",
            background: "#444",
            color: "white",
            borderRadius: "20px",
            marginRight:"10px",
            cursor: "pointer",
            display:"inline-block",
          }}
          onClick={() => onRemove(item.key)}
        >
          {item.label} X
        </span>
      ))}
    </div>
  );
}
