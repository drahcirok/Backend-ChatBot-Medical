const { OpenAI } = require('openai');
const { formatearContextoPaciente, valoresReferencia } = require('../utils/datosPrueba');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// MODIFICACIÓN 1: Prompt más flexible e inteligente
const SYSTEM_PROMPT = `Eres MEDIChat, un asistente médico virtual avanzado.

TIENES DOS FUENTES DE INFORMACIÓN:
1. CONOCIMIENTO MÉDICO GENERAL: Úsalo para responder preguntas teóricas, definiciones, o consejos de salud generales (ej: "¿Qué es la diabetes?", "¿Es bueno correr?").
2. CONTEXTO DEL PACIENTE: Úsalo SOLO si la pregunta se refiere específicamente al usuario (ej: "¿Cómo salieron mis exámenes?", "¿Puedo tomar ibuprofeno con mis medicamentos actuales?").

REGLAS DE COMPORTAMIENTO:
- Si el usuario pregunta algo general, RESPONDE GENERALMENTE. No fuerces los datos del paciente si no vienen al caso.
- Si el usuario pregunta por "mis datos", "mi salud" o "mis exámenes", consulta el contexto adjunto.
- Si el usuario saluda o conversa casualmente, sé amable y breve.
- Mantén un tono profesional, empático y claro.

ADVERTENCIA: Tú no sustituyes a un médico real. En casos graves, sugiere ir a urgencias.`;

class OpenAIService {

  // MODIFICACIÓN 2: Ahora aceptamos 'historial' como parámetro
  async procesarConsultaMedica(pacienteId, pregunta, historial = []) {
    try {
      const contextoPaciente = formatearContextoPaciente(pacienteId);

      // Construimos la memoria del chat
      // 1. Mensaje del Sistema (Instrucciones + Datos del Paciente)
      const messages = [
        {
          role: "system",
          content: `${SYSTEM_PROMPT}\n\n=== DATOS DEL PACIENTE ACTUAL (ID: ${pacienteId}) ===\n${contextoPaciente}\n=====================================`
        }
      ];

      // 2. Insertamos el historial previo (limpiando formatos si es necesario)
      // El frontend manda role 'bot', OpenAI espera 'assistant'
      historial.forEach(msg => {
        messages.push({
          role: msg.role === 'bot' ? 'assistant' : 'user',
          content: msg.content
        });
      });

      // 3. La pregunta actual del usuario
      messages.push({ role: "user", content: pregunta });

      console.log(`🧠 Enviando a OpenAI ${messages.length} mensajes (Contexto + ${historial.length} historia + 1 actual)`);

      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // O "gpt-4" si tienes acceso y presupuesto
        messages: messages,
        temperature: 0.7, // Un poco más creativo para charlas generales
        max_tokens: 500
      });

      return {
        respuesta: response.choices[0].message.content,
        modelo: response.model
      };

    } catch (error) {
      console.error('Error en OpenAI:', error);
      return {
        respuesta: "Lo siento, tuve un problema técnico consultando mi base de conocimientos médica.",
        modelo: "error"
      };
    }
  }

  // ... (puedes dejar el método generarResumenSalud igual o borrarlo si no lo usas) ...
}

module.exports = new OpenAIService();