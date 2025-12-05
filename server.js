const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatbotController = require('./src/controllers/chatbotController');

const app = express();

// Configuración para Render.com
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: '*', // Permite cualquier origen (para desarrollo)
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Middleware de logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

// ==================== RUTAS ====================

// Health check
app.get('/api/health', chatbotController.healthCheck);

// Consultar al chatbot médico
app.post('/api/chatbot/consultar', chatbotController.procesarConsulta);

// Obtener todos los pacientes
app.get('/api/chatbot/pacientes', chatbotController.obtenerTodosPacientes);

// Obtener información específica de paciente
app.get('/api/chatbot/paciente/:pacienteId', chatbotController.obtenerInformacionPaciente);

// ✅ NUEVO: Actualizar datos del paciente
app.put('/api/chatbot/paciente/:pacienteId', chatbotController.actualizarPaciente);

// ==================== EJEMPLOS ====================
app.get('/api/ejemplos', (req, res) => {
  const ejemplos = [
    {
      pregunta: "¿Por qué tengo baja la hemoglobina?",
      endpoint: "POST /api/chatbot/consultar",
      body: { pregunta: "¿Por qué tengo baja la hemoglobina?", pacienteId: 1 }
    },
    {
      pregunta: "Explícame los resultados de mi perfil lipídico",
      endpoint: "POST /api/chatbot/consultar",
      body: { pregunta: "Explícame los resultados de mi perfil lipídico", pacienteId: 1 }
    },
    {
      pregunta: "¿Qué significa que mi TSH sea 4.8?",
      endpoint: "POST /api/chatbot/consultar",
      body: { pregunta: "¿Qué significa que mi TSH sea 4.8?", pacienteId: 2 }
    },
    {
      descripcion: "Actualizar peso del paciente 1",
      endpoint: "PUT /api/chatbot/paciente/1",
      body: { peso: 88, frecuenciaCardiaca: 75 }
    }
  ];
  
  res.json({
    success: true,
    ejemplos: ejemplos
  });
});

// Ruta para debug (ver datos en memoria)
app.get('/api/debug/datos', chatbotController.obtenerDatosCompletos);

// Ruta raíz
app.get('/', (req, res) => {
  res.send(`
    <html>
      <head>
        <title>🤖 Chatbot Médico - Backend</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
          }
          .container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 15px;
            padding: 30px;
            margin-top: 20px;
          }
          h1 { color: white; margin-bottom: 10px; }
          h2 { color: #e0e0ff; margin-top: 30px; }
          a {
            color: #4fc3f7;
            text-decoration: none;
            font-weight: bold;
          }
          a:hover { text-decoration: underline; }
          .endpoint {
            background: rgba(0, 0, 0, 0.2);
            padding: 15px;
            border-radius: 8px;
            margin: 10px 0;
            border-left: 4px solid #4fc3f7;
          }
          code {
            background: rgba(0, 0, 0, 0.3);
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
          }
          .note {
            background: rgba(255, 193, 7, 0.2);
            border-left: 4px solid #ffc107;
            padding: 10px;
            margin: 15px 0;
            border-radius: 4px;
          }
        </style>
      </head>
      <body>
        <h1>🤖 Chatbot Médico - Backend</h1>
        <p>Servidor funcionando correctamente.</p>
        
        <div class="note">
          <strong>⚠️ IMPORTANTE PARA RENDER.COM:</strong><br>
          • El servidor gratuito "duerme" tras 15min de inactividad<br>
          • La primera petición puede tardar 30-50s en "despertar"<br>
          • Los datos se pierden al reiniciar (se usan en memoria)
        </div>
        
        <div class="container">
          <h2>📋 Endpoints disponibles:</h2>
          
          <div class="endpoint">
            <strong><a href="/api/health">GET /api/health</a></strong><br>
            Verificar estado del servidor
          </div>
          
          <div class="endpoint">
            <strong><a href="/api/chatbot/pacientes">GET /api/chatbot/pacientes</a></strong><br>
            Listar pacientes disponibles
          </div>
          
          <div class="endpoint">
            <strong><a href="/api/ejemplos">GET /api/ejemplos</a></strong><br>
            Ejemplos de uso de la API
          </div>
          
          <div class="endpoint">
            <strong>POST /api/chatbot/consultar</strong><br>
            Consultar al chatbot médico<br>
            <code>{"pregunta": "tu pregunta", "pacienteId": 1}</code>
          </div>
          
          <div class="endpoint">
            <strong>PUT /api/chatbot/paciente/:id</strong><br>
            Actualizar datos del paciente<br>
            <code>{"peso": 85, "frecuenciaCardiaca": 72}</code>
          </div>
          
          <h2>🔧 Para probar con cURL:</h2>
          <pre style="background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px; overflow-x: auto;">
curl -X POST https://tu-backend.onrender.com/api/chatbot/consultar \\
  -H "Content-Type: application/json" \\
  -d '{"pregunta":"¿Por qué tengo baja la hemoglobina?", "pacienteId":1}'</pre>
          
          <h2>📊 Pacientes disponibles:</h2>
          <ul>
            <li><strong>ID 1:</strong> Juan Carlos Pérez (45 años) - Hipertensión</li>
            <li><strong>ID 2:</strong> María Fernanda López (32 años) - Hipotiroidismo</li>
            <li><strong>ID 3:</strong> Carlos Alberto Ramírez (58 años) - Diabetes</li>
          </ul>
        </div>
        
        <p style="margin-top: 30px; font-size: 0.9em; opacity: 0.8;">
          Backend preparado para Render.com | OpenAI GPT-3.5 Turbo | Node.js Express
        </p>
      </body>
    </html>
  `);
});

// ==================== INICIAR SERVIDOR ====================
app.listen(PORT, () => {
  console.log(`
🚀 **Chatbot Médico con OpenAI**
🌐 Servidor corriendo en: http://localhost:${PORT}
📊 Pacientes cargados: 3
💡 OpenAI: ${process.env.OPENAI_API_KEY ? '✅ Configurado' : '❌ No configurado'}
⚙️  Entorno: ${process.env.NODE_ENV || 'development'}
  
📋 **Endpoints:**
  GET  /api/health                → Verificar estado
  GET  /api/ejemplos             → Ejemplos de uso
  GET  /api/chatbot/pacientes    → Listar pacientes
  GET  /api/chatbot/paciente/:id → Información de paciente
  PUT  /api/chatbot/paciente/:id → Actualizar paciente
  POST /api/chatbot/consultar    → Consultar chatbot
  
🔧 **Para Render.com:**
  1. Sube a GitHub
  2. Conecta en Render.com
  3. Agrega variable: OPENAI_API_KEY=tu_clave
  4. Build Command: npm install
  5. Start Command: node server.js
  
⚠️  **Nota importante:**
   El servidor gratuito "duerme" tras 15min de inactividad.
   La primera petición puede tardar 30-50s en "despertar".
  `);
});