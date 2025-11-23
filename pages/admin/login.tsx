import React, { useState } from "react";
import { useRouter } from "next/router";

export default function AdminLogin() {
  const [secret, setSecret] = useState("");
  const router = useRouter();

  const login = () => {
    // store secret in localStorage for admin UI usage
    localStorage.setItem("admin_secret", secret);
    router.push("/admin");
  };

  return (
    <main style={{ padding: 20 }}>
      <h1>Admin Login</h1>
      <div>
        <label>Admin secret</label>
        <input value={secret} onChange={(e) => setSecret(e.target.value)} />
      </div>
      <div style={{ marginTop: 12 }}>
        <button onClick={login}>Enter Admin</button>
      </div>
      <p style={{ marginTop: 12, color: "#666" }}>The admin secret is set via ADMIN_SECRET env variable on the server.</p>
    </main>
  );
}
