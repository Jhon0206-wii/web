import Link from "next/link"; // funciona como el react router, permite navegar entre paginas sin recargar la pagina

export const AppHeader = () => {
  return (
    <header className="site-header">
      <p className="brand">Coffee Orders</p>
      <nav aria-label="Navegación principal">
        <Link href="/">Inicio</Link>
        <Link href="/orders">Pedidos</Link>
        <Link href="/login">Iniciar sesión</Link>
        <Link href="/register">Crear cuenta</Link>
      </nav>
    </header>
  );
}