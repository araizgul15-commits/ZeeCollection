import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const { name, phone, address, items } = req.body;

  if (!name || !phone || !address || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: "Missing order data" });
  }

  // Calculate total
  const totalCents = items.reduce((sum: number, it: any) => sum + it.priceCents * (it.quantity || 1), 0);

  try {
    const order = await prisma.order.create({
      data: {
        name,
        phone,
        address,
        totalCents,
        status: "pending_cod",
        items: {
          create: items.map((it: any) => ({
            productId: it.productId,
            name: it.name,
            size: it.size || "",
            quantity: it.quantity || 1,
            priceCents: it.priceCents
          }))
        }
      },
      include: { items: true }
    });

    return res.status(201).json({ orderId: order.id });
  } catch (err: any) {
    console.error(err);
    return res.status(500).json({ error: "Failed to create order" });
  }
}
