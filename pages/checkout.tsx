import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Checkout() {
  const router = useRouter();
  const cart = (typeof window !== "undefined" && JSON.parse(localStorage.getItem("cart") || "[]")) || [];
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [loading, setLoading] = useState(false);

  const totalCents = cart.reduce((s: number, it: any) => s + it.priceCents * (it.quantity || 1), 0);

  const placeOrder = async () => {
    if (!name || !phone || !address) return alert("Please fill details");
    setLoading(true);
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, phone, address, items: cart })
    });
    const j = await res.json();
    setLoading(false);
    if (res.ok) {
      localStorage.removeItem("cart");
      router.push("/order-success?orderId=" + j.orderId);
    } else {
      alert("Failed to place order: " + (j.error || "unknown"));
    }
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Checkout — Cash on Delivery</h1>
      <div style={{ maxWidth: 700 }}>
        <div>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <label>Phone</label>
          <input value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div>
          <label>Address</label>
          <textarea value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>

        <div style={{ marginTop: 20 }}>
          <strong>Total: PKR {(totalCents / 100).toFixed(2)}</strong>
        </div>

        <div style={{ marginTop: 20 }}>
          <button onClick={placeOrder} disabled={loading || cart.length === 0}>
            {loading ? "Placing..." : "Place Order (COD)"}
          </button>
        </div>
      </div>
    </main>
  );
}
