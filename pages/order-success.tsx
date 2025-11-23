import React from "react";
import { useRouter } from "next/router";

export default function OrderSuccess() {
  const router = useRouter();
  const { orderId } = router.query;
  return (
    <main style={{ padding: 20 }}>
      <h1>Thank you!</h1>
      <p>Your order has been placed. Order ID: {orderId}</p>
    </main>
  );
}
