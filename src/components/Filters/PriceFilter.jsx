import React, { useState, useEffect } from "react";
import useDebounce from "../../hooks/useDebounce";

export default function PriceFilter({ data, value, onChange }) {
  const [min, setMin] = useState(value.min);
  const [max, setMax] = useState(value.max);

  const debouncedMin = useDebounce(min, 300);
  const debouncedMax = useDebounce(max, 300);

 
  useEffect(() => {
    onChange({ min: Number(debouncedMin), max: Number(debouncedMax) });
  }, [debouncedMin, debouncedMax]);

  useEffect(() => {
    if (!data) return;

    const highest = Math.ceil(Math.max(...data.map(p => p.price)));
    setMax(highest);

  }, [data]);

  return (
    <div style={{ marginBottom: 12}}>
      <label style={{ marginRight: 10 }}>Min Price:</label>
      <input
        type="number"
        value={value.min}
        onChange={(e) => onChange({...value,min:Number(e.target.value)})}
        style={{width:"120px",padding:"6px" }}
      />

      <label style={{marginLeft:20, marginRight:10 }}>Max Price:</label>
      <input
        type="number"
        value={value.max}
          onChange={(e) => onChange({...value,max:Number(e.target.value)})}
          style={{width:"120px",padding:"6px" }}
      />
    </div>
  );
}
