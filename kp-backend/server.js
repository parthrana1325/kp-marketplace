require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { createClient } = require("@supabase/supabase-js");

const app = express();

app.use(cors());
app.use(express.json());

// Supabase Client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

console.log("🚀 Server Starting...");
console.log("Supabase Connected");

// ================= HOME =================
app.get("/", (req, res) => {
  res.send("Backend running with Supabase 🚀");
});

// ================= USERS =================
app.get("/users", async (req, res) => {
  const { data, error } = await supabase
    .from("users")
    .select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ================= SIGNUP =================
app.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const { error } = await supabase
    .from("users")
    .insert([{ name, email, password, role: "user" }]);

  if (error) {
    return res.status(400).json({ message: error.message });
  }

  res.json({ message: "Account Created Successfully" });
});

// ================= LOGIN =================
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .eq("password", password)
    .single();

  if (error || !data) {
    return res.status(401).json({
      message: "Invalid Email or Password"
    });
  }

  res.json({
    message: "Login Successful",
    user: data
  });
});

// ================= PRODUCTS GET =================
app.get("/products", async (req, res) => {
  const { data, error } = await supabase
    .from("products")
    .select("*");

  if (error) return res.status(500).json(error);

  res.json(data);
});

// ================= ADD PRODUCT =================
app.post("/products", async (req, res) => {
  const { name, price, image, category, description } = req.body;

  const { error } = await supabase
    .from("products")
    .insert([
      { name, price, image, category, description }
    ]);

  if (error) return res.status(400).json(error);

  res.json({ message: "Product Added Successfully" });
});

// ================= DELETE PRODUCT =================
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;

  const { error } = await supabase
    .from("products")
    .delete()
    .eq("id", id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Product Deleted Successfully" });
});

// ================= UPDATE PRODUCT =================
app.put("/products/:id", async (req, res) => {
  const { id } = req.params;

  const { name, price, image, category, description, stock } = req.body;

  const { error } = await supabase
    .from("products")
    .update({
      name,
      price,
      image,
      category,
      description,
      stock
    })
    .eq("id", id);

  if (error) return res.status(400).json(error);

  res.json({ message: "Product Updated Successfully" });
});

// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});