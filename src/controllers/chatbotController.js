const openAIService = require('../services/openAIService');
const pacienteService = require('../services/pacienteService');

class ChatbotController {
  async procesarConsulta(req, res) {
    try {
      const { pregunta, pacienteId = 1 } = req.body;
      
      if (!pregunta || pregunta.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'La pregunta es requerida',
          sugerencia: 'Ejemplo: "¿Por qué tengo baja la hemoglobina?"'
        });
      }
      
      const pacienteIdInt = parseInt(pacienteId);
      if (!pacienteService.obtenerPacientePorId(pacienteIdInt)) {
        return res.status(404).json({
          success: false,
          error: 'Paciente no encontrado',
          pacientesDisponibles: pacienteService.obtenerTodosPacientes()
        });
      }
      
      console.log(`📝 Procesando consulta para paciente ${pacienteId}: "${pregunta}"`);
      
      const resultado = await openAIService.procesarConsultaMedica(pacienteIdInt, pregunta);
      
      console.log(`✅ Respuesta generada (${resultado.tokens || 'N/A'} tokens)`);
      
      res.json({
        success: true,
        respuesta: resultado.respuesta,
        metadata: {
          pacienteId: pacienteIdInt,
          pregunta: pregunta,
          modelo: resultado.modelo,
          timestamp: new Date().toISOString()
        }
      });
      
    } catch (error) {
      console.error('❌ Error en controlador:', error);
      
      res.status(500).json({
        success: false,
        error: 'Error procesando la consulta',
        respuesta: `🩺 **Asistente Médico Virtual**
        
Lamento las dificultades técnicas. Mientras tanto:

• Revisa los valores de referencia en tus exámenes
• Anota preguntas específicas para tu médico
• Considera si necesitas atención inmediata

Puedes intentar con preguntas como:
- "Explícame mi último hemograma"
- "¿Qué significa que mi TSH sea 4.8?"
- "¿Cómo mejorar mis niveles de colesterol?"

O intenta nuevamente en unos momentos.`,
        sugerencia: 'Reintenta con una pregunta más específica'
      });
    }
  }
  
  async obtenerInformacionPaciente(req, res) {
    try {
      const { pacienteId } = req.params;
      const pacienteIdInt = parseInt(pacienteId);
      
      const paciente = pacienteService.obtenerPacientePorId(pacienteIdInt);
      
      if (!paciente) {
        return res.status(404).json({
          success: false,
          error: 'Paciente no encontrado',
          pacientesDisponibles: pacienteService.obtenerTodosPacientes()
        });
      }
      
      res.json({
        success: true,
        paciente: paciente
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error obteniendo información del paciente'
      });
    }
  }
  
  async obtenerTodosPacientes(req, res) {
    try {
      const pacientes = pacienteService.obtenerTodosPacientes();
      
      res.json({
        success: true,
        total: pacientes.length,
        pacientes: pacientes
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error obteniendo lista de pacientes'
      });
    }
  }
  
  async analizarTendencias(req, res) {
    try {
      const { pacienteId, parametro } = req.body;
      
      if (!parametro) {
        return res.status(400).json({
          success: false,
          error: 'El parámetro es requerido',
          ejemplo: 'hemoglobina, colesterolLDL, TSH, glucosa'
        });
      }
      
      const pacienteIdInt = parseInt(pacienteId || 1);
      const resultado = await openAIService.analizarTendencias(pacienteIdInt, parametro);
      
      res.json({
        success: true,
        analisis: resultado,
        parametro: parametro,
        pacienteId: pacienteIdInt
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error analizando tendencias'
      });
    }
  }
  
  async generarResumenSalud(req, res) {
    try {
      const { pacienteId } = req.params;
      const pacienteIdInt = parseInt(pacienteId);
      
      const resumen = await openAIService.generarResumenSalud(pacienteIdInt);
      
      res.json({
        success: true,
        resumen: resumen,
        pacienteId: pacienteIdInt,
        fechaGeneracion: new Date().toISOString()
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error generando resumen de salud'
      });
    }
  }
  
  async verificarValoresCriticos(req, res) {
    try {
      const { pacienteId } = req.params;
      const pacienteIdInt = parseInt(pacienteId);
      
      const criticos = pacienteService.verificarValoresCriticos(pacienteIdInt);
      
      res.json({
        success: true,
        totalCriticos: criticos.length,
        valoresCriticos: criticos,
        recomendacion: criticos.length > 0 
          ? 'Se recomienda revisión médica'
          : 'No se detectaron valores críticos'
      });
      
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error verificando valores críticos'
      });
    }
  }
  
  async healthCheck(req, res) {
    res.json({
      status: '✅ Funcionando',
      servicio: 'Chatbot Médico con OpenAI',
      version: '1.0.0',
      pacientes: pacienteService.obtenerTodosPacientes().length,
      endpoints: [
        'POST /api/chatbot/consultar',
        'GET /api/chatbot/pacientes',
        'GET /api/chatbot/paciente/:id',
        'POST /api/chatbot/tendencias',
        'GET /api/chatbot/:id/resumen',
        'GET /api/chatbot/:id/criticos'
      ]
    });
  }
}

module.exports = new ChatbotController();