import React from "react";

export default function ProductCard({ product }: { product: any }) {
  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    cart.push({ productId: product.id, name: product.name, priceCents: product.priceCents, quantity: 1 });
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart");
  };

  return (
    <div style={{ border: "1px solid #eaeaea", borderRadius: 8, padding: 12 }}>
      <img src={product.imageUrl || "https://placehold.co/600x400?text=No+Image"} alt={product.name} style={{ width: "100%", height:160, objectFit: "cover", borderRadius:6 }} />
      <h3>{product.name}</h3>
      <p style={{ color: "#666" }}>{product.description}</p>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <strong>PKR {(product.priceCents / 100).toFixed(2)}</strong>
        <button onClick={addToCart} style={{ padding: "8px 12px", background: "#111827", color: "white", borderRadius: 6 }}>
          Add
        </button>
      </div>
    </div>
  );
}
