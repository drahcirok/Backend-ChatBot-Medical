# 🏥 Chatbot Médico - Backend con OpenAI

Backend para un sistema médico con chatbot inteligente que analiza exámenes clínicos usando **OpenAI GPT-3.5**.

---

## 🌟 Características

- 🤖 Chatbot médico especializado en análisis de exámenes clínicos  
- 🧪 3 pacientes predefinidos con historiales médicos completos  
- 🧠 Integración con OpenAI GPT-3.5 para respuestas inteligentes  
- 📊 Endpoints RESTful para consultas y gestión de pacientes  
- 🔄 Actualización en tiempo real de datos del paciente  
- 🚀 Preparado para despliegue en Render.com  

---

## 📋 Requisitos Previos

- Node.js 14 o superior  
- npm 6 o superior  
- Cuenta en OpenAI  
- Git (opcional)

---
🚀 Instalación Rápida
1. Clonar el repositorio
```bash
git clone https://github.com/drahcirok/Backend-ChatBot-Medical.git
cd chatbot-medico-backend
```
2. Instalar dependencias
```bash
npm install
```
3. Configurar variables de entorno
Crea un archivo .env en la raíz del proyecto:

env
PORT=3000
OPENAI_API_KEY=tu_clave_api_de_openai_aqui
NODE_ENV=development
4. Obtener API Key de OpenAI
Ve a https://platform.openai.com/api-keys

Inicia sesión o crea una cuenta

Haz clic en "Create new secret key"

Copia la clave (comienza con sk-proj-)

Pégala en el archivo .env como OPENAI_API_KEY

5. Iniciar el servidor
```bash
# Modo desarrollo (con recarga automática)
npm run dev

# Modo producción
npm start
```
🌐 Acceso al Servidor
Una vez ejecutado, el servidor estará disponible en:

URL Local: http://localhost:3000

API Base: http://localhost:3000/api

📡 Endpoints de la API
Salud del sistema

GET /api/health
Listar pacientes

GET /api/chatbot/pacientes
Obtener paciente específico

GET /api/chatbot/paciente/{id}
Ejemplo: GET /api/chatbot/paciente/1

Consultar al chatbot médico

POST /api/chatbot/consultar
Body:

json
{
  "pregunta": "¿Por qué tengo baja la hemoglobina?",
  "pacienteId": 1
}
Actualizar datos del paciente

PUT /api/chatbot/paciente/{id}
Body:

json
{
  "peso": 85,
  "frecuenciaCardiaca": 72,
  "edad": 46,
  "altura": 1.75
}
Ejemplos de uso

GET /api/ejemplos
🧪 Pruebas con cURL
1. Verificar que el servidor funciona
```bash
curl http://localhost:3000/api/health
```
3. Consultar al chatbot
```bash
curl -X POST http://localhost:3000/api/chatbot/consultar \
  -H "Content-Type: application/json" \
  -d '{"pregunta":"¿Por qué tengo baja la hemoglobina?", "pacienteId":1}'
```
5. Actualizar peso del paciente
```bash
curl -X PUT http://localhost:3000/api/chatbot/paciente/1 \
  -H "Content-Type: application/json" \
  -d '{"peso": 88, "frecuenciaCardiaca": 75}'
```
7. Obtener información del paciente 1
```bash
curl http://localhost:3000/api/chatbot/paciente/1
```
📊 Datos Predefinidos
El sistema incluye 3 pacientes con historiales completos:

Paciente 1: Juan Carlos Pérez (45 años)
Diagnóstico: Hipertensión arterial

Exámenes: Hemograma, Perfil lipídico, Química sanguínea

Valores destacados: Hemoglobina baja (12.5 g/dL), Colesterol LDL alto

Paciente 2: María Fernanda López (32 años)
Diagnóstico: Hipotiroidismo subclínico

Exámenes: Hormonas tiroideas, Hemoglobina glicosilada

Valores destacados: TSH elevada (4.8 mIU/L), Prediabetes

Paciente 3: Carlos Alberto Ramírez (58 años)
Diagnóstico: Diabetes tipo 2

Exámenes: Curva de tolerancia a glucosa, Hemoglobina glicosilada

Valores destacados: Glucosa elevada, HbA1c alto (7.8%)

🏗️ Estructura del Proyecto
backend-chatbot-medico/
├── src/
│   ├── controllers/          # Controladores de rutas
│   │   └── chatbotController.js
│   ├── services/             # Lógica de negocio
│   │   ├── openAIService.js  # Integración con OpenAI
│   │   └── pacienteService.js # Gestión de pacientes
│   └── utils/
│       └── datosPrueba.js    # Datos de pacientes
├── server.js                 # Servidor principal
├── package.json              # Dependencias
├── .env                      # Variables de entorno (NO SUBIR A GITHUB)
├── .env.example              # Ejemplo de variables
└── README.md                 # Este archivo
🔧 Configuración para Desarrollo
1. Variables de entorno necesarias
env
PORT=3000                         # Puerto del servidor
OPENAI_API_KEY=sk-...             # Tu clave de OpenAI
NODE_ENV=development              # Entorno
2. Scripts disponibles
```bash
npm run dev      # Inicia con nodemon (recarga automática)
npm start        # Inicia en modo producción
npm test         # Ejecuta tests (si los hay)
```
3. Dependencias principales
express: Framework web

openai: Cliente para OpenAI API

cors: Middleware para CORS

dotenv: Manejo de variables de entorno

nodemon: Recarga automática en desarrollo

🚀 Despliegue en Render.com (Para producción)
Pasos para desplegar:
Sube el código a GitHub

Crea cuenta en Render.com

Haz clic en "New +" → "Web Service"

Conecta tu repositorio de GitHub

Configura:

Build Command: npm install

Start Command: node server.js

Agrega variables de entorno en Render:

OPENAI_API_KEY: Tu clave de OpenAI

NODE_ENV: production

Haz clic en "Create Web Service"

Nota importante para Render.com:
Plan gratuito: El servidor "duerme" tras 15 min de inactividad

Cold start: Primera petición tarda 30-50 segundos

Datos en memoria: Se pierden al reiniciar el servidor

💡 Ejemplos de Preguntas para el Chatbot
Análisis de exámenes:

"¿Por qué tengo baja la hemoglobina?"

"Explícame los resultados de mi perfil lipídico"

"¿Qué significa que mi TSH sea 4.8?"

Interpretación de valores:

"¿Mis niveles de glucosa son normales?"

"¿Cómo mejorar mi colesterol LDL?"

"¿Debo preocuparme por mi frecuencia cardíaca?"

Recomendaciones generales:

"¿Qué dieta debo seguir con hipertensión?"

"¿Cómo controlar la diabetes tipo 2?"

"¿Qué ejercicios son recomendables para mi?"

⚠️ Limitaciones y Advertencias
1. Uso de OpenAI
Costo: ~$0.002 por consulta (con crédito inicial gratuito)

Rate limits: Límites de solicitudes por minuto

Precisión: Las respuestas son orientativas, no diagnósticos

2. Datos en memoria
Los cambios se pierden al reiniciar el servidor

Solo para desarrollo/demo (no usar en producción real)

3. Para uso real
Agregar base de datos (MongoDB, PostgreSQL)

Implementar autenticación de usuarios

Agregar validación de datos más estricta

🔍 Solución de Problemas
Error: "Cannot find module"
```bash
# Si falta algún módulo:
npm install
```
Error: "No API key provided"
```bash
# Verifica que el archivo .env tenga:
OPENAI_API_KEY=tu_clave_aqui
```
Error: "Port 3000 already in use"
```bash
# Cambia el puerto en .env o usa:
PORT=3001 npm run dev
```
El servidor no responde
```bash
# Verifica que esté ejecutándose:
1. Revisa los logs: Deberías ver "🚀 Servidor en http://localhost:3000"
2. Prueba en navegador: http://localhost:3000
3. Verifica que no haya errores en la terminal
```
📞 Soporte
Para problemas con OpenAI:
Verifica tu API key en OpenAI Dashboard

Revisa tu saldo en Usage Dashboard

Para problemas con el código:
Verifica que todas las dependencias estén instaladas

Revisa que el archivo .env esté correctamente configurado

Asegúrate de usar Node.js 14 o superior

Mensajes de error comunes:
"Rate limit exceeded": Espera unos minutos antes de hacer más consultas

"Invalid API key": Genera una nueva clave en OpenAI

"Server sleeping": Es normal en Render.com, espera 30-50 segundos

📝 Notas para el Desarrollo
Agregar un nuevo paciente:
Edita src/utils/datosPrueba.js

Agrega un nuevo objeto en el array pacientes

Incluye todos los campos requeridos (nombre, edad, examenes, etc.)

Modificar endpoints:
Edita src/controllers/chatbotController.js

Agrega tu nuevo método

Registra la ruta en server.js

Conectar con frontend:
El frontend debe apuntar a:

Local: http://localhost:3000

Producción: https://tu-backend.onrender.com

📄 Licencia
Este proyecto es para fines educativos. No usar para diagnóstico médico real.

🎯 Resumen para Comenzar
```bash
# 1. Clonar (o descargar) el proyecto
git clone https://github.com/tuusuario/chatbot-medico-backend.git

# 2. Instalar dependencias
npm install

# 3. Configurar OpenAI (OBLIGATORIO)
# - Ve a https://platform.openai.com/api-keys
# - Crea una nueva clave
# - Crea archivo .env y pega: OPENAI_API_KEY=tu_clave

# 4. Ejecutar
npm run dev

# 5. Probar
curl http://localhost:3000/api/health
```
¡Listo! El backend está funcionando y listo para recibir consultas del frontend. 🚀
