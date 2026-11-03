import { useEffect, useState } from "react";
import { useTicket } from "../context/TicketContext";

function TicketSummary() {
  const { tickets } = useTicket();

  const [categories, setCategories] = useState([]);     //g

    useEffect(() => {
    fetch("/categories.json")
        .then((response) => {
        if (!response.ok) {
            throw new Error("Gagal mengambil data kategori.");
        }

        return response.json();
        })
        .then((data) => {
        setCategories(data);
        })
        .catch((error) => {
        console.error("Terjadi kesalahan:", error);
        });
    }, []);

  const total = tickets.length;

  const open = tickets.filter(
    (ticket) => ticket.status === "Open"
  ).length;

  const progress = tickets.filter(
    (ticket) => ticket.status === "In Progress"
  ).length;

  const resolved = tickets.filter(
    (ticket) => ticket.status === "Resolved"
  ).length;

  return (
    <>
    <div className="row g-3 mb-4">
      <div className="col-md-3">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h6 className="text-muted">Total Ticket</h6>
            <h2>{total}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h6 className="text-muted">Open</h6>
            <h2>{open}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h6 className="text-muted">In Progress</h6>
            <h2>{progress}</h2>
          </div>
        </div>
      </div>

      <div className="col-md-3">
        <div className="card shadow-sm text-center">
          <div className="card-body">
            <h6 className="text-muted">Resolved</h6>
            <h2>{resolved}</h2>
          </div>
        </div>
      </div>
    </div>

    <h6 className="text-muted mb-2">Ticket per Kategori</h6>
    <div className="row g-3 mb-4">
      {categories.map((category) => {
        const count = tickets.filter(
          (ticket) => ticket.category === category.name
        ).length;

        return (
          <div className="col-6 col-md" key={category.id}>
            <div className="card shadow-sm text-center">
              <div className="card-body">
                <h6 className="text-muted">{category.name}</h6>
                <h2>{count}</h2>
              </div>
            </div>
          </div>
        );
      })}
    </div>
    </>
  );
}

export default TicketSummary;