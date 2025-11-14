import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCourse } from "../api";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CourseView() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setError(null);
      try {
        const data = await getCourse(id);
        setCourse(data);
      } catch (err) {
        setError(err.message || "No se pudo cargar el curso");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />
      <main className="container mx-auto px-4 py-10">
        {loading ? (
          <div className="text-center text-gray-500">Cargando curso...</div>
        ) : error ? (
          <div className="text-center text-red-600">{error}</div>
        ) : course ? (
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 bg-white rounded-lg shadow-md p-6">
              <h1 className="text-3xl font-extrabold text-gray-800">{course.title}</h1>
              <div className="mt-2 text-sm text-gray-500">Categoría: {course.category || "-"}</div>
              <div className="mt-4 text-gray-600">{course.description}</div>

              <div className="mt-6 flex gap-3">
                <Link
                  to="/admin/cursos"
                  className="px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Volver a la lista de Cursos
                </Link>

                <a
                  href="#enroll"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primaryDark"
                >
                  Inscribirme / Más info
                </a>
              </div>
            </div>

            <aside className="bg-white rounded-lg shadow-md p-6">
              <div className="text-sm text-gray-500">Estado</div>
              <div className="mt-2">
                {course.status === "Publicado" ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Publicado
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-700">
                    {course.status}
                  </span>
                )}
              </div>

              <div className="mt-6">
                <div className="text-sm text-gray-500">Acciones</div>
                <div className="mt-3">
                  <Link
                    to={`/admin/cursos`}
                    className="inline-block px-4 py-2 border border-gray-200 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Administrar curso
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        ) : (
          <div className="text-center text-gray-500">Curso no encontrado</div>
        )}
      </main>
      <Footer />
    </div>
  );
}