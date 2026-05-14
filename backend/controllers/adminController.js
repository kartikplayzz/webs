import jwt from "jsonwebtoken";

export function loginAdmin(req, res) {
  const { password } = req.body;

  if (!process.env.ADMIN_PASSWORD || !process.env.JWT_SECRET) {
    return res.status(500).json({ message: "Admin auth is not configured. Set ADMIN_PASSWORD and JWT_SECRET." });
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return res.status(401).json({ message: "Invalid admin password." });
  }

  const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET, { expiresIn: "8h" });
  return res.json({ token });
}
