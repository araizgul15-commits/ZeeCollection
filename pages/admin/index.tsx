import React, { useEffect, useState } from "react";
import Router from "next/router";

export default function AdminPanel() {
  const [products, setProducts] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    fetch("/api/products").then((r) => r.json()).then((j) => setProducts(j.products || []));
  }, []);

  const adminSecret = typeof window !== "undefined" ? localStorage.getItem("admin_secret") : null;
  if (!adminSecret) {
    if (typeof window !== "undefined") Router.push("/admin/login");
    return null;
  }

  const create = async () => {
    const r = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-admin-secret": adminSecret || "" },
      body: JSON.stringify({ name, description: desc, imageUrl, priceCents: Math.round(price * 100) })
    });
    if (r.ok) {
      setName(""); setPrice(0); setImageUrl(""); setDesc("");
      const j = await r.json();
      setProducts((p) => [j.product, ...p]);
    } else {
      alert("Failed to create");
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin</h1>
      <section style={{ marginBottom: 20 }}>
        <h2>Add product</h2>
        <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input placeholder="Price (e.g. 2000.00)" type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        <input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        <textarea placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <div>
          <button onClick={create}>Create</button>
        </div>
      </section>

      <section>
        <h2>Products</h2>
        {products.map((p) => (
          <div key={p.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
            <strong>{p.name}</strong> — PKR {(p.priceCents / 100).toFixed(2)}
          </div>
        ))}
      </section>
    </main>
  );
}
