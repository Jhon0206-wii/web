
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
//formData.get lo que hace es que obtiene el valor del input que se le pasa por el name, en este caso email y password 

//const token = data?.access_token; lo que hace es que obtiene el valor del token que se le pasa por el name, en este caso access_token
// cuando obtiene la cookie
async function login(formData: FormData) { 
  "use server";

  const email = formData.get("email"); // cuando la pagina detecte que hay un error=1 lo que hace es mostrar el mensaje de error, y si detecta que hay un registered=1 lo que hace es mostrar el mensaje de cuenta creada
  const password = formData.get("password");

  const response = await fetch(`${process.env.COFFEE_API_URL}/auth/login`, { // el fetch es una funcion que hace una peticion a un servidor, en este caso al servidor de la api de coffee, y le pasa los datos del email y password, y si la respuesta es ok, redirige a la pagina de orders, si no es ok, redirige a la pagina de login con un error=1
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  }).catch(() => null);

  if (!response?.ok) redirect("/login?error=1");

  const data = await response.json().catch(() => null); //  el .json() es una funcion que convierte la respuesta del servidor en un objeto json, y el .catch() es una funcion que captura el error si es que hay uno, y retorna null
  const token = data?.access_token; //lo que hace es que obtiene el valor del token que se le pasa por el name, en este caso access_token
  if (typeof token !== "string" || !token) redirect("/login?error=1");

  const cookieStore = await cookies(); // cookies() es una funcion que obtiene las cookies del navegador y la envia al servidor
  cookieStore.set("coffee_token", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 15 * 60,
  });

  redirect("/orders"); // 
}

type LoginPageProps = {
  searchParams: Promise<{ error?: string; registered?: string }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const { error, registered } = await searchParams;

  return (
    <main>
      <h1>Iniciar sesión</h1>
      {registered === "1" && <p>Cuenta creada. Ya puedes iniciar sesión.</p>} // estos son mensajes de error los cuales funcionan en la fucion de login
      {error === "1" && <p role="alert">No se pudo iniciar sesión. Revisar los datos o la conexión.</p>}

      <form action={login}>
        <p>
          <label>
            Email <input name="email" type="email" autoComplete="email" required />
          </label>
        </p>
        <p>
          <label>
            Contraseña
            <input name="password" type="password" autoComplete="current-password" required />
          </label>
        </p>
        <button type="submit">Entrar</button>
      </form>
    </main>
  );
}
// cuando le de la funcion type summit entrar el lo que hace es que busca la funcion logion, recibe en el enter y porteriormente un resutado
//