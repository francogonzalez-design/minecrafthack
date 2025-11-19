TechFlow Task Management
Una aplicación web moderna para la gestión de proyectos y tareas, construida con React, TypeScript y Tailwind CSS.

🚀 Características
Autenticación segura con JWT

Dashboard con estadísticas y métricas

Gestión de proyectos (CRUD completo)

Gestión de tareas con filtros avanzados

Interfaz responsive y moderna

Colaboración en equipo

🛠️ Tecnologías Utilizadas
Frontend: React 18 + TypeScript

Routing: React Router DOM

Estilos: Tailwind CSS

HTTP Client: Axios

Build Tool: Vite

📋 Prerrequisitos
Node.js 16+ instalado

npm o yarn

Navegador web moderno

🚀 Instalación y Ejecución Local
Sigue estos pasos para ejecutar la aplicación en tu máquina local:

1. Clonar el repositorio
bash
git clone <url-del-repositorio>
cd techflow-task-management
2. Instalar dependencias
bash
npm install
3. Configurar variables de entorno (Opcional)
Crea un archivo .env en la raíz del proyecto:

env
VITE_API_URL=https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1
4. Ejecutar en modo desarrollo
bash
npm run dev
La aplicación estará disponible en: http://localhost:5173

5. Para producción
bash
# Build de producción
npm run build

# Preview del build
npm run preview
📁 Estructura del Proyecto
text
src/
├── components/          # Componentes reutilizables
│   ├── common/         # Componentes comunes (Button, Input, Modal)
│   ├── auth/           # Componentes de autenticación
│   ├── projects/       # Componentes de proyectos
│   └── tasks/          # Componentes de tareas
├── pages/              # Páginas de la aplicación
├── services/           # Servicios API
├── context/            # Context de React (Auth)
├── hooks/              # Custom hooks
├── types/              # Definiciones de TypeScript
└── utils/              # Utilidades y constantes
🔑 Credenciales de Prueba
Puedes registrar un nuevo usuario o usar estas credenciales de prueba (si están disponibles):

text
Email: demo@techflow.com
Password: demodemo123
🎯 Funcionalidades Implementadas
✅ Autenticación
Registro de usuario

Inicio de sesión

Rutas protegidas

Manejo de tokens JWT

✅ Dashboard
Estadísticas de proyectos y tareas

Progreso general

Tareas recientes

Proyectos recientes

✅ Gestión de Proyectos
Listar proyectos

Crear nuevo proyecto

Editar proyecto

Eliminar proyecto

Ver detalles

✅ Gestión de Tareas
Listar tareas con paginación

Crear tarea

Editar tarea

Eliminar tarea

Cambiar estado de tarea

Filtros avanzados (estado, prioridad, proyecto)

Búsqueda de tareas

✅ UI/UX
Diseño responsive

Estados de carga

Manejo de errores

Validación de formularios

Navegación intuitiva

🔧 Scripts Disponibles
bash
npm run dev          # Ejecutar en modo desarrollo
npm run build        # Build para producción
npm run preview      # Preview del build de producción
npm run lint         # Ejecutar ESLint
🌐 API Backend
La aplicación consume la API en:

text
https://cs2031-2025-2-hackathon-2-backend-production.up.railway.app/v1
🐛 Solución de Problemas
Error de CORS
Si encuentras errores de CORS, verifica que el backend tenga configurado el origen correcto.

Problemas de autenticación
Limpia el localStorage

Verifica que el token JWT sea válido

Revisa la conexión con el backend

Errores de build
Ejecuta npm install nuevamente

Verifica que todas las dependencias estén instaladas

Revisa la configuración de TypeScript

📞 Soporte
Si encuentras problemas al ejecutar la aplicación:

Verifica que Node.js esté instalado correctamente

Ejecuta npm install para reinstalar dependencias

Revisa la consola del navegador para errores específicos

Asegúrate de tener conexión a internet para consumir la API
