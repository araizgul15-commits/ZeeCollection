import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

const ADMIN_SECRET = process.env.ADMIN_SECRET || "ZeeCollection_PLACEHOLDER_ChangeMe_8f4b2c9a5f1e2d3";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
    const productsWithParsedSizes = products.map(p => ({
      ...p,
      sizes: JSON.parse(p.sizes)
    }));
    return res.status(200).json({ products: productsWithParsedSizes });
  }

  // Admin-only actions (create/delete) protected by x-admin-secret header
  const provided = req.headers["x-admin-secret"] as string | undefined;
  if (provided !== ADMIN_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "POST") {
    const { name, description, imageUrl, priceCents, sizes } = req.body;
    if (!name || typeof priceCents !== "number") {
      return res.status(400).json({ error: "Missing name or priceCents" });
    }
    const product = await prisma.product.create({
      data: {
        name,
        description: description || "",
        imageUrl: imageUrl || "",
        priceCents,
        sizes: JSON.stringify(sizes || [])
      }
    });
    return res.status(201).json({ product });
  }

  if (req.method === "DELETE") {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Missing id" });
    await prisma.product.delete({ where: { id: Number(id) } });
    return res.status(200).json({ ok: true });
  }

  res.setHeader("Allow", "GET, POST, DELETE");
  res.status(405).end("Method Not Allowed");
}
