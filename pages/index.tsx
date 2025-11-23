import React from "react";
import useSWR from "swr";
import ProductCard from "../components/ProductCard";
import Link from "next/link";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error } = useSWR("/api/products", fetcher);

  if (error) return <div>Failed to load products</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, sans-serif" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>Zee Collection — Shop</h1>
        <Link href="/admin/login">Admin</Link>
      </header>

      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 16 }}>
        {data.products.length === 0 && <div>No products yet — add via Admin</div>}
        {data.products.map((p: any) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
      <div style={{ marginTop: 30 }}>
        <Link href="/checkout">Go to Checkout</Link>
      </div>
    </main>
  );
}
