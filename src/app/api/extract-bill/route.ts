import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { imageBase64 } = await request.json();

  if (!imageBase64) {
    return NextResponse.json({ error: "No image provided" }, { status: 400 });
  }

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content:
            "You read purchase bills and receipts. Return a JSON object with keys: product_name (string), shop_name (string or null), purchase_date (string, format YYYY-MM-DD), warranty_months (number, your best guess if not printed on the bill, default 12). Only return the JSON object, nothing else.",
        },
        {
          role: "user",
          content: [
            { type: "text", text: "Read this bill and extract the details." },
            { type: "image_url", image_url: { url: imageBase64 } },
          ],
        },
      ],
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    return NextResponse.json({ error }, { status: 500 });
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  try {
    const extracted = JSON.parse(content);
    return NextResponse.json(extracted);
  } catch {
    return NextResponse.json({ error: "Could not read the bill, please enter details manually" }, { status: 500 });
  }
}
