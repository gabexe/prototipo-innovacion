/**
 * Datos iniciales y constantes para Proyecto Vivo UBP
 * Universidad Blas Pascal - Córdoba, Argentina
 */

export const INITIAL_DATA = {
  project: {
    id: "pv-ubp-2026-01",
    name: "App de Economía Circular y Reciclaje para el Campus UBP",
    subject: "Innovación Tecnológica y Emprendedurismo",
    career: "Ingeniería en Informática / Lic. en Administración",
    tutor: "Ing. Marcelo Bustamante",
    type: "thesis", // 'thesis' (Alternativa a tesis) | 'practice' (Práctica profesional)
    stage: "in_progress", // 'draft' | 'in_progress' | 'ready' | 'submitted'
    createdAt: "2026-08-10",
    currentWeek: 6,
    totalWeeks: 16,
    pdfUploaded: {
      name: "Trabajo_Final_Innovacion_Campus_Verde_v2.pdf",
      size: "3.4 MB",
      date: "12 de Agosto, 2026",
      status: "Aprobado por cátedra"
    },
    nextControl: {
      title: "Punto de control este viernes",
      description: "Subí tu avance del análisis de mercado para que tu docente tutor lo revise antes de la devolución semanal.",
      date: "Viernes 24 de Octubre",
      daysLeft: 2
    },
    futurePath: "startup", // 'startup' (Emprendimiento) | 'impact' (Iniciativa de impacto)
    presentationDate: "A coordinar con tribunal académico",
    presentationScheduled: false,
    scheduledSession: null
  },

  milestones: [
    {
      id: 1,
      title: "Problema validado",
      description: "Entrevistas a 25 miembros de la comunidad UBP y validación de la tasa de residuos en el campus universitario.",
      week: 2,
      status: "completed", // 'completed' | 'in_progress' | 'pending'
      completedDate: "28 de Agosto, 2026",
      feedback: "Excelente relevamiento de datos primarios en el comedor y aulas del campus. Criterio de validación cumplido con holgura.",
      deliverable: "Informe_Validacion_Problema_vFinal.pdf"
    },
    {
      id: 2,
      title: "Prototipo testeado",
      description: "Desarrollo del primer MVP funcional en Figma y pruebas de usabilidad con 10 estudiantes de diferentes facultades.",
      week: 4,
      status: "completed",
      completedDate: "15 de Septiembre, 2026",
      feedback: "Flujo de usuario muy intuitivo. El registro mediante el correo institucional @ubp.edu.ar resuelve la autenticación.",
      deliverable: "Reporte_Pruebas_Usabilidad_MVP.pdf"
    },
    {
      id: 3,
      title: "Análisis de mercado",
      description: "Estudio de soluciones análogas en universidades de LATAM, estimación de costos y alianzas con empresas de reciclaje de Córdoba.",
      week: 7,
      status: "in_progress",
      completedDate: null,
      feedback: "Recuerda incluir métricas de reducción de huella de carbono estimadas para el campus de Argüello.",
      deliverable: null,
      dueDate: "Viernes 24 de Octubre"
    },
    {
      id: 4,
      title: "Plan de negocio y viabilidad",
      description: "Estructura de costos, modelo de incentivos sustentables (UBP Green Points) y proyección de escalabilidad.",
      week: 11,
      status: "pending",
      completedDate: null,
      feedback: "Pendiente de inicio tras la aprobación del análisis de mercado.",
      deliverable: null,
      dueDate: "14 de Noviembre, 2026"
    },
    {
      id: 5,
      title: "Presentación final y defensa",
      description: "Defensa oral del proyecto ante tribunal académico de la UBP como acreditación de tesis o práctica profesional.",
      week: 16,
      status: "pending",
      completedDate: null,
      feedback: "Se habilitará automáticamente una vez aprobados los 4 hitos previos.",
      deliverable: null,
      dueDate: "Diciembre, 2026"
    }
  ],

  categories: [
    { id: "all", label: "Todos", count: 6 },
    { id: "legal", label: "Legal", count: 2 },
    { id: "tecnico", label: "Técnico", count: 2 },
    { id: "financiero", label: "Financiero", count: 1 },
    { id: "comercial", label: "Comercial", count: 1 }
  ],

  mentors: [
    {
      id: "mentor-lg",
      initials: "LG",
      name: "Ab. Lucas Gigena",
      avatarColor: "#1F4E8C",
      role: "Abogado especialista en Startups y PI",
      degree: "Egresado UBP · Abogacía",
      category: "legal",
      isSuggested: true,
      tags: ["Contratos", "Habilitaciones", "Emprendimientos", "Propiedad Intelectual"],
      quote: "Acompaño proyectos de estudiantes en la parte legal: cómo formalizarlos, proteger la idea y qué permisos necesitan para arrancar en Córdoba y el país.",
      experience: "8 años asesorando startups en Córdoba Incuba y empresas de software. Magíster en Derecho Empresario.",
      availableDays: ["Martes 16:00 a 19:00", "Jueves 10:00 a 13:00"],
      linkedin: "https://www.linkedin.com"
    },
    {
      id: "mentor-mr",
      initials: "MR",
      name: "Cra. María Rodríguez",
      avatarColor: "#2F6B4F",
      role: "Contadora Pública y Asesora Financiera",
      degree: "Egresada UBP · Ciencias Económicas",
      category: "financiero",
      isSuggested: false,
      tags: ["Impuestos PyME", "Flujo de fondos", "Monotributo / SAS", "Costos"],
      quote: "Te ayudo a transformar tu idea en números reales: proyecciones financieras, estructura impositiva y punto de equilibrio sin sorpresas.",
      experience: "Consultora senior de finanzas para emprendimientos de impacto y pymes tecnológicas en la región centro.",
      availableDays: ["Lunes 14:00 a 17:00", "Miércoles 09:00 a 12:00"],
      linkedin: "https://www.linkedin.com"
    },
    {
      id: "mentor-fa",
      initials: "FA",
      name: "Ing. Facundo Albarracín",
      avatarColor: "#9E1B34",
      role: "Lead Software Architect & Tech Lead",
      degree: "Egresado UBP · Ingeniería Informática",
      category: "tecnico",
      isSuggested: false,
      tags: ["Arquitectura Cloud", "Apps Móviles", "AWS / Firebase", "Seguridad"],
      quote: "Si tenés dudas con el stack, la infraestructura o cómo validar tu prototipo técnico antes del lanzamiento, lo vemos juntos en código.",
      experience: "10 años en la industria del software. Actual Staff Engineer en empresa global y mentor en DoingLABS UBP.",
      availableDays: ["Miércoles 18:00 a 20:00", "Viernes 15:00 a 18:00"],
      linkedin: "https://www.linkedin.com"
    },
    {
      id: "mentor-sb",
      initials: "SB",
      name: "Lic. Sofía Benítez",
      avatarColor: "#7A5C00",
      role: "Growth Manager & Estrategia Comercial",
      degree: "Egresada UBP · Marketing & Comunicación",
      category: "comercial",
      isSuggested: false,
      tags: ["Validación B2B", "Adquisición", "Pitch Deck", "Pricing"],
      quote: "Definimos la propuesta de valor y armamos un pitch contundente para conseguir tus primeros usuarios o presentar ante inversores.",
      experience: "Ex-líder de producto en fintech cordobesa. Mentora de incubación y aceleración de negocios.",
      availableDays: ["Jueves 14:00 a 18:00", "Viernes 09:00 a 12:00"],
      linkedin: "https://www.linkedin.com"
    },
    {
      id: "mentor-pa",
      initials: "PA",
      name: "Dra. Patricia Arrieta",
      avatarColor: "#1F4E8C",
      role: "Especialista en Compliance y Protección de Datos",
      degree: "Docente y Graduada UBP · Derecho",
      category: "legal",
      isSuggested: false,
      tags: ["Privacidad GDPR/LPDP", "Términos y Condiciones", "SaaS Legal"],
      quote: "Aseguramos que tu software cumpla con las leyes de protección de datos personales desde el diseño (Privacy by Design).",
      experience: "Miembro del comité de ética digital y consultora de ciberseguridad legal.",
      availableDays: ["Lunes 10:00 a 13:00", "Viernes 14:00 a 17:00"],
      linkedin: "https://www.linkedin.com"
    },
    {
      id: "mentor-gc",
      initials: "GC",
      name: "Ing. Germán Casalis",
      avatarColor: "#2F6B4F",
      role: "Especialista en IoT y Automatización",
      degree: "Egresado UBP · Telecomunicaciones",
      category: "tecnico",
      isSuggested: false,
      tags: ["Hardware & IoT", "Sensores", "Redes LoRaWAN", "Prototipado rápido"],
      quote: "Conectamos tu hardware con la nube. Si tu proyecto tiene sensores físicos o telemetría, optimizamos el circuito y la conectividad.",
      experience: "Desarrollador de proyectos de Smart Cities para municipios de la provincia de Córdoba.",
      availableDays: ["Martes 09:00 a 12:00", "Jueves 15:00 a 18:00"],
      linkedin: "https://www.linkedin.com"
    }
  ],

  bookedSessions: [
    {
      id: "ses-01",
      mentorId: "mentor-lg",
      mentorName: "Ab. Lucas Gigena",
      date: "28 de Octubre, 2026 - 16:30 hs",
      type: "Virtual (Google Meet)",
      topic: "Estructura de habilitaciones y convenios de retiro de residuos con el campus UBP",
      status: "Confirmada por mentor"
    }
  ]
};
