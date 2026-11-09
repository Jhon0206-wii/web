import type { OrderSummary } from "@/types/order-summary"; 

type OrderCardProps = {
  order: OrderSummary;
};

export const OrderCard = ({ order }: OrderCardProps) => {
  return (
    <article className="order-card">
      <h2>Pedido #{order.id}</h2>
      <p>{order.item}</p>
      <p>Cantidad: {order.quantity}</p>
      <p className={`status ${order.status}`}> // las commillas invertidas permiten poner una clase dinamica, en este caso la clase sera status y el estado de la orden
        {order.status === "ready" ? "Listo" : "Pendiente"}
      </p>
    </article>
  );
} //cuando reciba una orden si o si debe parecerce a la interfaz de OrderSummary, si no es asi no se podra renderizar el componente