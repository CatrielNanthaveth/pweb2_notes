"use client"
import { useRouter } from 'next/navigation';
import { LeftOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuth } from '@/contexts/AuthContext';
import styles from '@/styles/nav.module.css';

export default function Layout({ children }) {

    const { token } = useAuth();
    const { logout } = useAuth()
    const router = useRouter();

    if (!token) {
        router.push('/login'); // Redirigir a la página de inicio de sesión si no está autenticado
        return null;
    }

    const handleClick = () => {
        const currentUrl = window.location.href;
        const newPath = currentUrl.split("/").slice(0, -1).join("/");
        router.replace(newPath);
    }
    return (
        <>
            <nav className={styles.navbar}>
                <span onClick={handleClick}><LeftOutlined /></span>
                <span onClick={logout}><LogoutOutlined /></span>
            </nav>
            <main>{children}</main>
        </>
    )
}
