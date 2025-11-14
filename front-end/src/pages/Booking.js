import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getMentor, createBooking } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Booking() {
  const { mentorId } = useParams();
  const navigate = useNavigate();
  const [mentor, setMentor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [notes, setNotes] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await getMentor(mentorId);
        setMentor(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el mentor");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [mentorId]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!date || !time || !contactEmail) {
      alert("Por favor completa fecha, hora y tu email de contacto.");
      return;
    }

    const payload = {
      mentorId,
      mentorName: mentor?.name || "",
      date,
      time,
      contactEmail,
      notes,
      status: "Pendiente",
      createdAt: new Date().toISOString()
    };

    try {
      await createBooking(payload);
      alert("Reserva enviada. En un entorno real, se confirmaría por email.");
      navigate("/"); // volver al inicio
    } catch (err) {
      alert("No se pudo crear la reserva: " + (err.message || err));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-500">Cargando...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : mentor ? (
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100">
                {mentor.photo ? <img src={mentor.photo} alt={mentor.name} className="w-full h-full object-cover" /> : null}
              </div>
              <div>
                <h2 className="text-xl font-semibold">{mentor.name}</h2>
                <div className="text-sm text-gray-500">{mentor.specialty} • {mentor.title}</div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label className="block text-sm text-gray-600">Tu email de contacto</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="tu@correo.com"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-600">Fecha</label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-600">Hora</label>
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-600">Notas / Motivo</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows="3"
                  placeholder="Breve descripción de lo que quieres tratar en la sesión"
                  className="mt-1 w-full rounded-md border-gray-200 shadow-sm focus:border-primary focus:ring focus:ring-primary/20"
                />
              </div>

              <div className="flex items-center gap-3 justify-end">
                <Link to={`/mentores`} className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-50">
                  Volver
                </Link>
                <button type="submit" className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark">
                  Reservar sesión
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center text-gray-500">Mentor no encontrado</div>
        )}
      </main>
      <Footer />
    </div>
  );
}