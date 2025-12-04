const { OpenAI } = require('openai');
const { formatearContextoPaciente, valoresReferencia } = require('../utils/datosPrueba');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const SYSTEM_PROMPT = `Eres MEDIChat, un asistente médico virtual especializado en análisis de exámenes clínicos.

ROLES Y RESPONSABILIDADES:
1. Especialista en interpretación de laboratorios clínicos
2. Educador en terminología médica para pacientes
3. Orientador en seguimiento de tratamientos
4. Analista de tendencias en resultados

METODOLOGÍA DE RESPUESTA:
1. CONTEXTUALIZA siempre los resultados del paciente
2. MENCIONA valores de referencia pertinentes
3. EXPLICA términos médicos de manera sencilla
4. SEÑALA hallazgos relevantes
5. SUGIERE preguntas para el médico tratante
6. IDENTIFICA patrones o tendencias

LÍMITES PROFESIONALES:
- NO das diagnósticos definitivos
- NO prescribes medicamentos
- NO sustituyes consulta médica
- EN CASOS CRÍTICOS: derivar a urgencias

ESTILO DE COMUNICACIÓN:
- Empático pero profesional
- Claro sin tecnicismos innecesarios
- Estructurado pero conversacional
- Incluye emojis médicos relevantes (🩺, 💊, 📈, 📉)

MARCO DE REFERENCIA PARA VALORES:
${JSON.stringify(valoresReferencia, null, 2)}

SIEMPRE finaliza recordando: "Consulta estos hallazgos con tu médico en la próxima cita."`;

class OpenAIService {
  async procesarConsultaMedica(pacienteId, pregunta) {
    try {
      const contextoPaciente = formatearContextoPaciente(pacienteId);
      
      if (!contextoPaciente) {
        throw new Error('Paciente no encontrado');
      }
      
      const messages = [
        { 
          role: "system", 
          content: SYSTEM_PROMPT 
        },
        { 
          role: "user", 
          content: `CONTEXTO DEL PACIENTE:\n${contextoPaciente}\n\nPREGUNTA DEL PACIENTE:\n${pregunta}\n\nPOR FAVOR RESPONDE:` 
        }
      ];
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.3,
        max_tokens: 800,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0
      });
      
      return {
        respuesta: response.choices[0].message.content,
        modelo: "gpt-3.5-turbo",
        tokens: response.usage.total_tokens
      };
      
    } catch (error) {
      console.error('Error en OpenAIService:', error);
      
      return {
        respuesta: `🔧 Estoy teniendo dificultades técnicas. 

Mientras resolvemos esto, te puedo orientar que:

• Los valores de referencia para hemoglobina son: 13.5-17.5 g/dL (hombres) y 12.0-15.5 g/dL (mujeres)
• Para colesterol LDL ideal es menor a 100 mg/dL
• La glucosa en ayunas normal es 70-100 mg/dL

¿Podrías reformular tu pregunta o intentar nuevamente en un momento?`,
        modelo: "fallback",
        error: error.message
      };
    }
  }
  
  async analizarTendencias(pacienteId, parametro) {
    try {
      const contextoPaciente = formatearContextoPaciente(pacienteId);
      
      const messages = [
        { 
          role: "system", 
          content: `Eres un analista de tendencias médicas. Analiza la evolución del parámetro solicitado a través del tiempo. Identifica patrones, mejoras o deterioros.` 
        },
        { 
          role: "user", 
          content: `Contexto del paciente:\n${contextoPaciente}\n\nAnaliza específicamente el parámetro: ${parametro}\n\nProporciona: 1. Tendencia temporal 2. Posibles causas 3. Recomendaciones de seguimiento` 
        }
      ];
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.4,
        max_tokens: 600
      });
      
      return response.choices[0].message.content;
      
    } catch (error) {
      return "No puedo analizar tendencias en este momento. Por favor, consulta directamente con tu médico.";
    }
  }
  
  async generarResumenSalud(pacienteId) {
    try {
      const contextoPaciente = formatearContextoPaciente(pacienteId);
      
      const messages = [
        { 
          role: "system", 
          content: `Genera un resumen ejecutivo de salud en formato de informe médico. Incluye: 1. Estado general 2. Principales hallazgos 3. Áreas de atención 4. Recomendaciones generales` 
        },
        { 
          role: "user", 
          content: `Contexto del paciente:\n${contextoPaciente}\n\nGenera un resumen conciso:` 
        }
      ];
      
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        temperature: 0.3,
        max_tokens: 500
      });
      
      return response.choices[0].message.content;
      
    } catch (error) {
      return "No puedo generar el resumen en este momento.";
    }
  }
}

module.exports = new OpenAIService();