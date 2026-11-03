import { createContext, useContext, useRef, useState } from "react";

const TicketContext = createContext();

export function TicketProvider({ children }) {
const [tickets, setTickets] = useState([]);
const ticketCounter = useRef(0);

// Menambahkan ticket
    const addTicket = (ticket) => {
    ticketCounter.current += 1;
    const ticketNumber = `HD-${String(
        ticketCounter.current
    ).padStart(3, "0")}`;

    setTickets((previousTickets) => [
        ...previousTickets,
        {
        ...ticket,
        id: Date.now(),
        ticketNumber,
        status: "Open",
        createdAt: new Date().toLocaleString("id-ID"),
        },
    ]);
    };

  // Mengubah status ticket
    const updateTicketStatus = (id, status) => {
    setTickets((previousTickets) =>
        previousTickets.map((ticket) => {
        if (ticket.id !== id) {
            return ticket;
        }

        // Ticket Resolved tidak boleh kembali ke Open
        if (ticket.status === "Resolved" && status === "Open") {
            return ticket;
        }

        return { 
            ...ticket,
            status,
        };
        })
    );
    };

  // Menghapus satu ticket
    const deleteTicket = (id) => {  //f
    setTickets((previousTickets) =>
        previousTickets.filter((ticket) => ticket.id !== id)
    );
    };

  // Menghapus seluruh ticket
  const clearTickets = () => {
    setTickets([]);
  };

  return (
    <TicketContext.Provider
      value={{
        tickets,
        addTicket,
        updateTicketStatus,
        deleteTicket,   //f
        clearTickets,
      }}
    >
      {children}
    </TicketContext.Provider>
  );
}

export function useTicket() {
  return useContext(TicketContext);
}