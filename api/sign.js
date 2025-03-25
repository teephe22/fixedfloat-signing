const crypto = require("crypto");

export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { requestBody } = req.body;
  const secretKey = process.env.FIXEDFLOAT_SECRET;

  if (!secretKey) {
    return res.status(500).json({ error: "Secret key not set" });
  }

  // Generate HMAC SHA256 signature
  const payload = JSON.stringify(requestBody);
  const signature = crypto.createHmac("sha256", secretKey).update(payload).digest("hex");

  res.json({ signature });
}