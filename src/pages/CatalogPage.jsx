import React, { useState, useMemo } from "react";
import userproduct from "../hooks/userproduct";
import CategoryFilter from "../components/Filters/CategoryFilter";
import PriceFilter from "../components/Filters/PriceFilter";
import ActiveFilters from "../components/Filters/ActiveFilters";
import { useSearchParams } from "react-router-dom";

export default function CatalogPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const data = userproduct();

  const initialCategory = searchParams.get("category") || "all";
  const initialMin = Number(searchParams.get("min")) || 0;
  const initialMax = Number(searchParams.get("max")) || 1000;

  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState({ min: initialMin, max: initialMax });

  function removeFilter(type) {
    if (type === "category") {
      setCategory("all");
      setSearchParams({
        category: "all",
        min: price.min,
        max: price.max,
      });
    }

    if (type === "price") {
      setPrice({ min: 0, max: 1000 });
      setSearchParams({
        category: category,
        min: 0,
        max: 1000,
      });
    }
  }

  const filtered = useMemo(() => {
    if (!data || !Array.isArray(data)) return [];

    let list = data;

    if (category !== "all") {
      list = list.filter((p) => p.category === category);
    }

    list = list.filter(
      (p) => Number(p.price) >= price.min && Number(p.price) <= price.max
    );

    return list;
  }, [category, price, data]); // ✅ FIXED

  if (!data) return <div>Loading...</div>;

  function handleCategoryChange(value) {
    setCategory(value);
    setSearchParams({
      category: value,
      min: price.min,
      max: price.max,
    });
  }

  function handlePriceChange(p) {
    setPrice(p);
    setSearchParams({
      category,
      min: p.min,
      max: p.max,
    });
  }

  return (
    <div  className="cntainer">
      <h1>Products</h1>

      <CategoryFilter
        data={data}
        value={category}
        onChange={handleCategoryChange}
      />

      <div style={{ height: "10px" }}></div>

      <PriceFilter value={price} onChange={handlePriceChange} />

      <ActiveFilters
        category={category}
        price={price}
        onRemove={removeFilter}
      />

      <ul>
        {filtered.map((p) => (
          <li key={p.id}>{p.title}</li>
        ))}
      </ul>
    </div>
  );
}
