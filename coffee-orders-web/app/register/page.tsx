// app/register/page.tsx
import Link from "next/link";
import { redirect } from "next/navigation";

type RegisterPageProps = {
  searchParams: Promise<{ error?: string }>;
};

const errorMessages: Record<string, string> = {
  missing: "Completa todos los campos obligatorios.",
  mismatch: "Las contraseñas no coinciden.",
  password: "La contraseña debe tener al menos 8 caracteres, una letra y un número.",
  exists: "Ya existe una cuenta con ese email. Puedes iniciar sesión.",
  network: "No se pudo crear la cuenta. Revisa la conexión e inténtalo de nuevo.",
};

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

async function register(formData: FormData) {
  "use server";

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  // Validación en servidor (no confiar solo en el cliente)
  if (!name || !email || !password || !confirmPassword) {
    redirect("/register?error=missing");
  }
  if (password !== confirmPassword) {
    redirect("/register?error=mismatch");
  }
  if (!PASSWORD_REGEX.test(password)) {
    redirect("/register?error=password");
  }

  const response = await fetch(`${process.env.COFFEE_API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
    cache: "no-store",
  }).catch(() => null);

  // Sin respuesta (backend dormido, sin red, etc.)
  if (!response) redirect("/register?error=network");

  // El backend responde 409 cuando el email ya existe
  if (response.status === 409) redirect("/register?error=exists");

  if (!response.ok) redirect("/register?error=network");

  redirect("/login?registered=1");
}

export default async function RegisterPage({ searchParams }: RegisterPageProps) {
  const { error } = await searchParams;
  const errorMessage = error ? errorMessages[error] : undefined;

  return (
    <main>
      <h1>Crear cuenta</h1>

      {errorMessage && <p role="alert">{errorMessage}</p>}

      <form action={register}>
        <p>
          <label>
            Nombre
            <input name="name" type="text" autoComplete="name" minLength={2} required />
          </label>
        </p>
        <p>
          <label>
            Email
            <input name="email" type="email" autoComplete="email" required />
          </label>
        </p>
        <p>
          <label>
            Contraseña
            <input
              name="password"
              type="password"
              autoComplete="new-password"
              required
              pattern="(?=.*[A-Za-z])(?=.*\d).{8,}"
              title="Mínimo 8 caracteres, con al menos una letra y un número"
            />
          </label>
          <small>Mínimo 8 caracteres, con al menos una letra y un número.</small>
        </p>
        <p>
          <label>
            Confirmar contraseña
            <input name="confirmPassword" type="password" autoComplete="new-password" required />
          </label>
        </p>
        <button type="submit">Registrarme</button>
      </form>

      <p>
        ¿Ya tienes cuenta? <Link href="/login">Inicia sesión</Link>
      </p>
    </main>
  );
}