import type { ReactNode } from "react";
import { AppHeader } from "./components/app-header";
import "./globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AppHeader /> // el AppHeader es el componente el cual aparece en todas las paginas
        {children} // el children es el contenido de la pagina o todas las que se estan renderizando
      </body>
    </html>
  );
}