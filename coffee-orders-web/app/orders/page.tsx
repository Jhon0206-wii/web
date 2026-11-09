import { OrderCard } from "../components/order-card/order-card";
import { sampleOrders } from "../data/sample-orders";

export default function OrdersPage() {
  return (
    <main>
      <h1>Pedidos</h1>
      <p>Datos temporales. Todavía no se consulta el backend.</p>
      <section className="orders-grid" aria-label="Listado de pedidos">
        {sampleOrders.map((order) => ( // el map recorre el arreglo y retorna algo, en cambio el forEach recorre el arreglo pero no retorna nada, solo ejecuta una funcion por cada elemento del arreglo
          <OrderCard key={order.id} order={order} />
        ))}
      </section>
    </main>
  );
}