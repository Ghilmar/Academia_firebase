import React, { useEffect, useState } from "react";

export default function MentorFormModal({ isOpen, onClose, onSave, initialData = null }) {
  // Campos del usuario (parte del objeto user del modelo Mentor)
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  
  // Campos específicos del mentor
  const [experience, setExperience] = useState("");
  const [languages, setLanguages] = useState("");
  const [certificates, setCertificates] = useState("");
  const [schedules, setSchedules] = useState("");
  
  // Referencias (IDs)
  const [idArea, setIdArea] = useState("");
  const [idPedagogicalMethod, setIdPedagogicalMethod] = useState("");

  useEffect(() => {
    if (initialData) {
      setName(initialData.user?.name || "");
      setEmail(initialData.user?.email || "");
      setExperience(initialData.experience || "");
      setLanguages(Array.isArray(initialData.languages) ? initialData.languages.join(", ") : "");
      setCertificates(Array.isArray(initialData.certificates) ? initialData.certificates.join(", ") : "");
      setSchedules(Array.isArray(initialData.schedules) ? initialData.schedules.join(", ") : "");
      setIdArea(initialData.id_area || "");
      setIdPedagogicalMethod(initialData.id_pedagogicalMethod || "");
    } else {
      setName("");
      setEmail("");
      setExperience("");
      setLanguages("");
      setCertificates("");
      setSchedules("");
      setIdArea("");
      setIdPedagogicalMethod("");
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  function handleSubmit(e) {
    e.preventDefault();
    
    if (!name.trim()) {
      alert("El nombre es requerido");
      return;
    }
    if (!email.trim()) {
      alert("El email es requerido");
      return;
    }
    if (!idArea) {
      alert("El área es requerida");
      return;
    }
    if (!idPedagogicalMethod) {
      alert("El método pedagógico es requerido");
      return;
    }

    // Convertir strings en arrays
    const languagesArray = languages
      .split(",")
      .map(lang => lang.trim())
      .filter(lang => lang.length > 0);
    
    const certificatesArray = certificates
      .split(",")
      .map(cert => cert.trim())
      .filter(cert => cert.length > 0);
    
    const schedulesArray = schedules
      .split(",")
      .map(sch => sch.trim())
      .filter(sch => sch.length > 0);

    const payload = {
      ...(initialData && initialData.id ? { id: initialData.id } : {}),
      experience: experience.trim(),
      languages: languagesArray,
      certificates: certificatesArray,
      schedules: schedulesArray,
      user: {
        ...(initialData?.user?.id && { id: initialData.user.id }),
        name: name.trim(),
        email: email.trim()
      },
      id_area: parseInt(idArea, 10),
      id_pedagogicalMethod: parseInt(idPedagogicalMethod, 10)
    };

    onSave(payload);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      <div className="relative bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg z-10 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b sticky top-0 bg-white">
          <h3 className="text-lg font-semibold text-gray-800">
            {initialData ? "Editar Mentor" : "Añadir Nuevo Mentor"}
          </h3>
          <button onClick={onClose} className="p-2 rounded-md hover:bg-gray-100">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 space-y-4">
          {/* SECCIÓN 1: DATOS DE USUARIO */}
          <fieldset className="border border-blue-200 rounded-lg p-4">
            <legend className="text-sm font-semibold text-blue-900 px-2">📋 Datos del Usuario</legend>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Nombre completo</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="Ej. Ana Fernández García"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Ej. ana@example.com"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
                />
              </div>
            </div>
          </fieldset>

          {/* SECCIÓN 2: DATOS DEL MENTOR */}
          <fieldset className="border border-green-200 rounded-lg p-4">
            <legend className="text-sm font-semibold text-green-900 px-2">🎓 Datos del Mentor</legend>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Experiencia</label>
                <textarea
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="Ej. 5 años en desarrollo web, especialista en React..."
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                  rows="3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Idiomas (separados por comas)</label>
                <input
                  value={languages}
                  onChange={(e) => setLanguages(e.target.value)}
                  type="text"
                  placeholder="Ej. Español, Inglés, Francés"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Certificados (separados por comas)</label>
                <input
                  value={certificates}
                  onChange={(e) => setCertificates(e.target.value)}
                  type="text"
                  placeholder="Ej. Certificado A, Certificado B"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Horarios disponibles (separados por comas)</label>
                <input
                  value={schedules}
                  onChange={(e) => setSchedules(e.target.value)}
                  type="text"
                  placeholder="Ej. Lunes 10:00-12:00, Miércoles 14:00-16:00"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-200"
                />
              </div>
            </div>
          </fieldset>

          {/* SECCIÓN 3: REFERENCIAS */}
          <fieldset className="border border-purple-200 rounded-lg p-4">
            <legend className="text-sm font-semibold text-purple-900 px-2">🔗 Referencias</legend>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Área ID *</label>
                <input
                  value={idArea}
                  onChange={(e) => setIdArea(e.target.value)}
                  type="number"
                  placeholder="Ej. 1"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                />
                <p className="text-xs text-gray-500 mt-1">ID del área especializada</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Método Pedagógico ID *</label>
                <input
                  value={idPedagogicalMethod}
                  onChange={(e) => setIdPedagogicalMethod(e.target.value)}
                  type="number"
                  placeholder="Ej. 1"
                  className="mt-1 w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                />
                <p className="text-xs text-gray-500 mt-1">ID del método pedagógico utilizado</p>
              </div>
            </div>
          </fieldset>

          <div className="pt-4 border-t flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            >
              {initialData ? "Actualizar" : "Crear"} Mentor
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}