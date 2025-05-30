'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {

    const { user, logout } = useAuth();

return (
    <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link href="/" style={{ marginRight: 20 }}>Home</Link>
        {user ? (
            <>
                <span style={{ marginRight: 10 }}><strong>{user.username}</strong></span>
                <button onClick={logout}>Logout</button>
            </>
        ) : (
            <Link href="/login">Login</Link>
        )}
    </nav>
);
}
