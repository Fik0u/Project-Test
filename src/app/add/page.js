"use client";

import { useState } from "react";


export default function AddProductPage() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("electronics");
    const [image, setImage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

    const newProduct = {
        title,
        price: parseFloat(price),
        description,
        image,
        category,
    };

    try {
        const res = await fetch("https://fakestoreapi.com/products", {
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await res.json();
        console.log("Product added :", data);
        alert("Product successfully added !");
    } catch (error) {
        console.error("Error :", error);
        alert("Error adding product. Please try again.");
    }
};

return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "auto" }}>
        <h1>Add Product</h1>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
            />
            <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
            />
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="electronics">electronics</option>
                <option value="jewelery">jewelery</option>
                <option value="men's clothing">men's clothing</option>
                <option value="women's clothing">women's clothing</option>
            </select>
            <button type="submit" style={{ padding: "0.5rem", fontWeight: "bold" }}>
                Add
            </button>
        </form>
    </div>
);
}
