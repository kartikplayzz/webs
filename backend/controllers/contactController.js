import { admin, getDb, isFirebaseConfigured } from "../config/firebase.js";

function serializeDoc(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt || null
  };
}

export async function createInquiry(req, res, next) {
  try {
    const { name, phone, email, service, message } = req.body;
    if (!name || !phone || !message) {
      return res.status(400).json({ message: "Name, phone and message are required." });
    }

    if (!isFirebaseConfigured()) {
      return res.status(503).json({ message: "Firebase is not configured, so inquiries cannot be stored yet." });
    }

    const payload = {
      name,
      phone,
      email: email || "",
      service: service || "Product Inquiry",
      message,
      source: "website",
      status: "new",
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const ref = await getDb().collection("inquiries").add(payload);
    const created = await ref.get();
    return res.status(201).json({ inquiry: serializeDoc(created), message: "Inquiry saved." });
  } catch (error) {
    return next(error);
  }
}

export async function listInquiries(req, res, next) {
  try {
    if (!isFirebaseConfigured()) {
      return res.status(503).json({ message: "Firebase is not configured, so inquiries cannot be loaded yet." });
    }

    const snapshot = await getDb().collection("inquiries").orderBy("createdAt", "desc").limit(100).get();
    return res.json({ inquiries: snapshot.docs.map(serializeDoc) });
  } catch (error) {
    return next(error);
  }
}
