import React from "react";
import Header from "../components/Header";
import MentorCard from "../components/MentorCard";

export default function Home() {
  const mentors = [
    {
      photo: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=7f0e0b2b0d6a2b1b7a3f7a06a1b7f3f3",
      name: "María López",
      specialty: "Desarrollo Frontend"
    },
    {
      photo: "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=4d6f7d2f5b6a9f9203a7e5be0c8f9a0a",
      name: "David Pérez",
      specialty: "Data Science"
    },
    {
      photo: "https://images.unsplash.com/photo-1545996124-1f6ea6d8b3b5?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=9e3f0f6b8c2d2b6a76f8f9d3a1f5a2d0",
      name: "Laura García",
      specialty: "Mentoría de carrera"
    },
    {
      photo: "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?q=80&w=800&auto=format&fit=crop&ixlib=rb-4.0.3&s=bb6f6a7b8f9c0d5a3e4e5b8c0a7d1c3b",
      name: "Javier Martínez",
      specialty: "Cloud & DevOps"
    }
  ];

  const courses = [
    {
      title: "Introducción a React",
      desc: "Construye interfaces modernas con componentes reutilizables."
    },
    {
      title: "Data Science para principiantes",
      desc: "Fundamentos de análisis de datos y visualización."
    },
    {
      title: "Productividad y Orientación Profesional",
      desc: "Habilidades blandas y camino profesional para desarrolladores."
    }
  ];

  return (
    <div>
      <Header />

      {/* Hero */}
      <section className="hero-bg py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight">
                Aprende. Mejora. Acelera tu carrera profesional.
              </h1>
              <p className="mt-4 text-gray-600 max-w-2xl">
                Cursos prácticos, mentoría personalizada y una comunidad que impulsa tu crecimiento.
                Comienza hoy con un plan flexible adaptado a tus metas.
              </p>
              <div className="mt-6 flex gap-3">
                <a
                  href="#cursos"
                  className="inline-block px-6 py-3 bg-primary text-white rounded-md shadow hover:bg-primaryDark transition"
                >
                  Ver cursos
                </a>
                <a
                  href="#mentores"
                  className="inline-block px-6 py-3 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50 transition"
                >
                  Conoce a los mentores
                </a>
              </div>
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
                <div className="text-sm text-gray-500">Comienza con una clase gratuita</div>
                <div className="mt-4">
                  <div className="bg-gradient-to-r from-primary to-primaryDark text-white rounded-md p-4">
                    <div className="font-semibold">Clase Intro: "De Cero a Frontend"</div>
                    <div className="text-sm mt-1">20/12 · 18:00 · Online</div>
                    <button className="mt-4 px-4 py-2 bg-white text-primary rounded-md font-medium">
                      Reservar plaza
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos */}
      <section id="cursos" className="py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Cursos destacados</h2>
            <a href="#cursos" className="text-sm text-primary hover:underline">Ver todos</a>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {courses.map((c) => (
              <div key={c.title} className="bg-white rounded-lg shadow-sm p-6 flex flex-col">
                <div className="text-lg font-semibold text-gray-800">{c.title}</div>
                <div className="text-sm text-gray-500 mt-2 flex-1">{c.desc}</div>
                <div className="mt-4">
                  <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark transition">
                    Ver curso
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentores */}
      <section id="mentores" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">Nuestros mentores</h2>
            <p className="text-sm text-gray-500">Mentoría experta, sesiones 1:1</p>
          </div>

          <div className="mt-6 grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-4">
            {mentors.map((m) => (
              <MentorCard
                key={m.name}
                photo={m.photo}
                name={m.name}
                specialty={m.specialty}
              />
            ))}
          </div>
        </div>
      </section>

      <footer className="py-8">
        <div className="container mx-auto px-4 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Academia Pro · Todos los derechos reservados
        </div>
      </footer>
    </div>
  );
}