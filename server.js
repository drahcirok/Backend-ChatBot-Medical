const express = require('express');
const cors = require('cors');
require('dotenv').config();

const chatbotController = require('./src/controllers/chatbotController');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.path}`);
  next();
});

app.get('/api/health', chatbotController.healthCheck);

app.post('/api/chatbot/consultar', chatbotController.procesarConsulta);

app.get('/api/chatbot/pacientes', chatbotController.obtenerTodosPacientes);

app.get('/api/chatbot/paciente/:pacienteId', chatbotController.obtenerInformacionPaciente);

app.post('/api/chatbot/tendencias', chatbotController.analizarTendencias);

app.get('/api/chatbot/:pacienteId/resumen', chatbotController.generarResumenSalud);

app.get('/api/chatbot/:pacienteId/criticos', chatbotController.verificarValoresCriticos);

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
      pregunta: "¿Cómo mejorar mis niveles de colesterol?",
      endpoint: "POST /api/chatbot/consultar",
      body: { pregunta: "¿Cómo mejorar mis niveles de colesterol?", pacienteId: 1 }
    },
    {
      accion: "Analizar tendencias de hemoglobina",
      endpoint: "POST /api/chatbot/tendencias",
      body: { parametro: "hemoglobina", pacienteId: 1 }
    }
  ];
  
  res.json({
    success: true,
    ejemplos: ejemplos
  });
});

app.use((err, req, res, next) => {
  console.error('❌ Error no manejado:', err);
  
  res.status(500).json({
    success: false,
    error: 'Error interno del servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
🚀 **Chatbot Médico con OpenAI**
🌐 Servidor corriendo en: http://localhost:${PORT}
📊 Pacientes cargados: 3
💡 OpenAI: ${process.env.OPENAI_API_KEY ? '✅ Configurado' : '❌ No configurado'}
  
📋 **Endpoints disponibles:**
  GET  /api/health                → Verificar estado
  GET  /api/ejemplos             → Ejemplos de uso
  GET  /api/chatbot/pacientes    → Listar pacientes
  GET  /api/chatbot/paciente/1   → Ver paciente específico
  
💬 **Chatbot:**
  POST /api/chatbot/consultar    → Consultar al médico virtual
  
📈 **Análisis:**
  POST /api/chatbot/tendencias   → Analizar tendencias
  GET  /api/chatbot/1/resumen    → Resumen de salud
  GET  /api/chatbot/1/criticos   → Valores críticos
  
🔧 **Para probar:**
  curl -X POST http://localhost:${PORT}/api/chatbot/consultar \\
    -H "Content-Type: application/json" \\
    -d '{"pregunta":"¿Por qué tengo baja la hemoglobina?", "pacienteId":1}'
  `);
});