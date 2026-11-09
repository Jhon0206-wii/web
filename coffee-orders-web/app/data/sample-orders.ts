import type { OrderSummary } from "../types/order-summary";

export const sampleOrders: OrderSummary[] = [
  { id: 1, item: "Cappuccino", quantity: 2, status: "pending" },
  { id: 2, item: "Americano", quantity: 1, status: "ready" },
  { id: 3, item: "Latte", quantity: 3, status: "pending" },
]; // esta es la informacion que se consumira en el componente de order-card,
//  es un arreglo de objetos que cumplen con la interfaz de OrderSummary