const openAIService = require('../services/openAIService');
const pacienteService = require('../services/pacienteService');

class ChatbotController {
  // Procesar consulta médica
  // Procesar consulta médica
  async procesarConsulta(req, res) {
    try {
      // MODIFICACIÓN: Extraemos también 'historial' del body
      const { pregunta, pacienteId = 1, historial = [] } = req.body;

      if (!pregunta || pregunta.trim().length === 0) {
        return res.status(400).json({
          success: false,
          error: 'La pregunta es requerida'
        });
      }

      const pacienteIdInt = parseInt(pacienteId);

      // Llamamos al servicio pasando el historial
      const resultado = await openAIService.procesarConsultaMedica(pacienteIdInt, pregunta, historial);

      res.json({
        success: true,
        respuesta: resultado.respuesta,
        metadata: {
          pacienteId: pacienteIdInt,
          timestamp: new Date().toISOString()
        }
      });

    } catch (error) {
      console.error('❌ Error en controlador:', error);
      res.status(500).json({
        success: false,
        error: 'Error interno del servidor'
      });
    }
  }

  // Obtener información del paciente
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
      console.error('❌ Error obteniendo información:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo información del paciente'
      });
    }
  }

  // ✅ NUEVO: Actualizar datos del paciente
  async actualizarPaciente(req, res) {
    try {
      const { pacienteId } = req.params;
      const { peso, frecuenciaCardiaca, edad, altura } = req.body;

      const pacienteIdInt = parseInt(pacienteId);

      // Validar datos
      if (peso && (peso < 20 || peso > 300)) {
        return res.status(400).json({
          success: false,
          error: 'Peso inválido. Debe estar entre 20 y 300 kg.'
        });
      }

      if (frecuenciaCardiaca && (frecuenciaCardiaca < 40 || frecuenciaCardiaca > 200)) {
        return res.status(400).json({
          success: false,
          error: 'Frecuencia cardíaca inválida. Debe estar entre 40 y 200 lpm.'
        });
      }

      // Actualizar paciente
      const pacienteActualizado = pacienteService.actualizarPaciente(pacienteIdInt, {
        peso,
        frecuenciaCardiaca,
        edad,
        altura
      });

      if (!pacienteActualizado) {
        return res.status(404).json({
          success: false,
          error: 'Paciente no encontrado'
        });
      }

      console.log(`✅ Paciente ${pacienteId} actualizado:`, { peso, frecuenciaCardiaca });

      res.json({
        success: true,
        mensaje: 'Datos actualizados correctamente',
        paciente: pacienteService.obtenerPacientePorId(pacienteIdInt),
        nota: '⚠️ En Render.com, estos cambios se perderán cuando el servidor se reinicie.'
      });

    } catch (error) {
      console.error('❌ Error actualizando paciente:', error);
      res.status(500).json({
        success: false,
        error: 'Error al actualizar datos del paciente'
      });
    }
  }

  // Obtener todos los pacientes
  async obtenerTodosPacientes(req, res) {
    try {
      const pacientes = pacienteService.obtenerTodosPacientes();

      res.json({
        success: true,
        total: pacientes.length,
        pacientes: pacientes
      });

    } catch (error) {
      console.error('❌ Error obteniendo pacientes:', error);
      res.status(500).json({
        success: false,
        error: 'Error obteniendo lista de pacientes'
      });
    }
  }

  // Obtener datos completos (para debug)
  async obtenerDatosCompletos(req, res) {
    try {
      const pacientesCompletos = pacienteService.obtenerPacientesCompletos();

      res.json({
        success: true,
        total: pacientesCompletos.length,
        pacientes: pacientesCompletos,
        nota: '⚠️ Estos son los datos en memoria del servidor'
      });

    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Error obteniendo datos completos'
      });
    }
  }

  // Endpoint de salud
  async healthCheck(req, res) {
    res.json({
      status: '✅ Funcionando',
      servicio: 'Chatbot Médico con OpenAI',
      version: '1.1.0', // Actualizado
      pacientes: pacienteService.obtenerTodosPacientes().length,
      entorno: process.env.NODE_ENV || 'development',
      despliegue: 'Render.com Ready',
      endpoints: [
        'GET  /api/health',
        'GET  /api/ejemplos',
        'GET  /api/chatbot/pacientes',
        'GET  /api/chatbot/paciente/:id',
        'PUT  /api/chatbot/paciente/:id', // ← NUEVO
        'POST /api/chatbot/consultar',
        'GET  /api/debug/datos' // ← Para debug
      ],
      nota: '⚠️ Servidor gratuito: puede tardar 30-50s en "despertar" tras 15min de inactividad'
    });
  }
}

module.exports = new ChatbotController();