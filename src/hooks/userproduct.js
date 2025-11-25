
import { useEffect, useState, useRef } from "react";

const CACHE = { data: null, promise: null };

export default function userproduct() {
  const mounted = useRef(true);
  const [data, setData] = useState(CACHE.data);

  useEffect(() => {
    mounted.current = true;

    if (CACHE.data) {
      setData(CACHE.data);

     
      if (!CACHE.promise) {
        CACHE.promise = fetch("https://fakestoreapi.com/products")
          .then(res => res.json())
          .then(fresh => {
            CACHE.data = fresh;
            CACHE.promise = null;
            if (mounted.current) setData(fresh);
          });
      }
      return () => (mounted.current = false);
    }

    
    CACHE.promise = fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(json => {
        CACHE.data = json;
        CACHE.promise = null;
        if (mounted.current) setData(json);
      });

    return () => (mounted.current = false);
  }, []);

  return data;
}
