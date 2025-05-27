import EventsPage from "./pages/EventsPage";
import EventDetail from "./pages/EventDetail";

const HOTEL_ID = "682764ddde5c1b9daaa35a76"; // ID del hotel para pruebas

export const routes = [
  // Página principal (EventsPage)
  { path: "/", element: <EventsPage hotelId={HOTEL_ID} /> },

  // Detalle de un evento
  { path: "/eventos/detalle/:eventId", element: <EventDetail /> },

  // Ruta por defecto (fallback)
  { path: "*", element: <EventsPage hotelId={HOTEL_ID} /> },
];