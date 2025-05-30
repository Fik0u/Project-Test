"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then(res => res.json())
            .then(data => {
            setProduct(data);
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (!product) return <p>Product not found</p>;

    return (
        <div style={{ padding: "2rem" }}>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} style={{ height: 300, objectFit: "contain" }} />
            <p><strong>Price :</strong> ${product.price}</p>
            <p><strong>Category :</strong> {product.category}</p>
            <p><strong>Description :</strong> {product.description}</p>
            <p><strong>Rate :</strong> ⭐ {product.rating?.rate} /5</p>
            <p><strong>Reviews :</strong> {product.rating?.count}</p>
        </div>
    );
}
