"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';


export default function Home() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://fakestoreapi.com/products');
      const data = await result.json();
      setProducts(data);
      setLoading(false);
    };
    const fetchCategories = async () => {
      const result = await fetch('https://fakestoreapi.com/products/categories');
      const data = await result.json();
      setCategories(data);
    };
    fetchData();
    fetchCategories();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });

      setProducts(products.filter(product => product.id !== id));
      alert("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product");
    }
  };

  if (loading) return <p>Loading products...</p>

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Products</h1>
      <div style={{ marginBottom: '1rem' }}>
        <input 
          type= 'text'
          placeholder='Search products...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '0.5rem', width: '100%', maxWidth: '400px' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value={"all"}>All categories</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {filteredProducts.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
            <img src={product.image} alt={product.title} style={{ height: '150px', objectFit: 'contain' }} />
            <h3>{product.title}</h3>
            <p>${product.price}</p>
            <p style={{ fontStyle: 'italic' }}>{product.category}</p>
            <Link href={`/product/${product.id}`}>
            <button style={{ marginRight: "0.5rem", cursor: 'pointer' }}>Details</button>
            </Link>
            {user?.role === 'admin' && (
              <div style={{ marginTop: '1rem' }}>
                <Link href={`/edit/${product.id}`}>
                  <button style={{ backgroundColor: '#0070f3', color: 'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Edit</button>
                </Link>
                <button onClick={() => handleDelete(product.id)} style={{ backgroundColor: 'crimson', color:'white', border: 'none', padding: '0.5rem', cursor: 'pointer' }}>Delete</button>
              </div>
            )}
          </div>
        ))}
        </div>
    </div>
  );
}
