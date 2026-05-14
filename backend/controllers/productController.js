import crypto from "crypto";
import { admin, getBucket, getDb, isFirebaseConfigured } from "../config/firebase.js";
import { seedProducts } from "../data/seedProducts.js";

function serializeDoc(doc) {
  const data = doc.data();
  return {
    id: doc.id,
    ...data,
    createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt || null,
    updatedAt: data.updatedAt?.toDate?.().toISOString() || data.updatedAt || null
  };
}

function parseBoolean(value) {
  return value === true || value === "true" || value === "on";
}

function sanitizeFileName(name = "product-image") {
  return name.toLowerCase().replace(/[^a-z0-9.]+/g, "-").replace(/(^-|-$)/g, "");
}

async function uploadProductImage(file) {
  if (!file) {
    return "";
  }

  const bucket = getBucket();
  const token = crypto.randomUUID();
  const filename = `products/${Date.now()}-${sanitizeFileName(file.originalname)}`;
  const storageFile = bucket.file(filename);

  await storageFile.save(file.buffer, {
    resumable: false,
    metadata: {
      contentType: file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: token
      }
    }
  });

  return `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(filename)}?alt=media&token=${token}`;
}

export async function listProducts(req, res, next) {
  try {
    if (!isFirebaseConfigured()) {
      return res.json({ products: seedProducts, source: "seed" });
    }

    const snapshot = await getDb().collection("products").orderBy("createdAt", "desc").get();
    const products = snapshot.docs.map(serializeDoc);
    return res.json({ products: products.length ? products : seedProducts, source: products.length ? "firebase" : "seed" });
  } catch (error) {
    return next(error);
  }
}

export async function getProduct(req, res, next) {
  try {
    if (!isFirebaseConfigured()) {
      const product = seedProducts.find((item) => item.id === req.params.id);
      return product ? res.json({ product }) : res.status(404).json({ message: "Product not found." });
    }

    const doc = await getDb().collection("products").doc(req.params.id).get();
    if (!doc.exists) {
      return res.status(404).json({ message: "Product not found." });
    }
    return res.json({ product: serializeDoc(doc) });
  } catch (error) {
    return next(error);
  }
}

export async function createProduct(req, res, next) {
  try {
    const { name, price, category, description } = req.body;
    if (!name || !category || !description) {
      return res.status(400).json({ message: "Name, category and description are required." });
    }

    const image = await uploadProductImage(req.file);
    const now = admin.firestore.FieldValue.serverTimestamp();
    const payload = {
      name,
      price: price || "Price on request",
      category,
      image,
      description,
      featured: parseBoolean(req.body.featured),
      createdAt: now,
      updatedAt: now
    };

    const ref = await getDb().collection("products").add(payload);
    const created = await ref.get();
    return res.status(201).json({ product: serializeDoc(created) });
  } catch (error) {
    return next(error);
  }
}

export async function updateProduct(req, res, next) {
  try {
    const ref = getDb().collection("products").doc(req.params.id);
    const current = await ref.get();
    if (!current.exists) {
      return res.status(404).json({ message: "Product not found." });
    }

    const updates = {
      name: req.body.name,
      price: req.body.price || "Price on request",
      category: req.body.category,
      description: req.body.description,
      featured: parseBoolean(req.body.featured),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    if (req.file) {
      updates.image = await uploadProductImage(req.file);
    }

    Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);
    await ref.update(updates);
    const updated = await ref.get();
    return res.json({ product: serializeDoc(updated) });
  } catch (error) {
    return next(error);
  }
}

export async function deleteProduct(req, res, next) {
  try {
    const ref = getDb().collection("products").doc(req.params.id);
    const current = await ref.get();
    if (!current.exists) {
      return res.status(404).json({ message: "Product not found." });
    }
    await ref.delete();
    return res.json({ message: "Product deleted." });
  } catch (error) {
    return next(error);
  }
}
