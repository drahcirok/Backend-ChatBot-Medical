const { pacientes, formatearContextoPaciente, calcularIMC } = require('../utils/datosPrueba');

class PacienteService {
  // Obtener todos los pacientes
  obtenerTodosPacientes() {
    return pacientes.map(p => ({
      id: p.id,
      nombre: p.nombre,
      edad: p.edad,
      diagnostico: p.diagnosticoPrincipal,
      ultimoExamen: p.examenes.length > 0 ? p.examenes[p.examenes.length - 1].fecha : 'No disponible'
    }));
  }
  
  // Obtener paciente por ID
  obtenerPacientePorId(id) {
    const paciente = pacientes.find(p => p.id === id);
    
    if (!paciente) return null;
    
    const imc = calcularIMC(paciente);
    
    return {
      id: paciente.id,
      informacionBasica: {
        nombre: paciente.nombre,
        edad: paciente.edad,
        genero: paciente.genero,
        peso: paciente.peso,
        altura: paciente.altura,
        tipoSangre: paciente.tipoSangre,
        frecuenciaCardiaca: paciente.frecuenciaCardiaca,
        imc: imc,
        diagnostico: paciente.diagnosticoPrincipal
      },
      tratamiento: {
        medicamentos: paciente.medicamentos,
        alergias: paciente.alergias
      },
      resumenExamenes: paciente.examenes.slice(-2).map(e => ({
        fecha: e.fecha,
        tipo: e.tipo,
        resultadosDestacados: Object.entries(e.resultados)
          .filter(([_, data]) => data.estado !== 'normal')
          .map(([param, data]) => `${param}: ${data.valor} ${data.unidad} (${data.estado})`)
      }))
    };
  }
  
  // Actualizar datos del paciente (EN MEMORIA - para Render.com)
  actualizarPaciente(pacienteId, datosActualizados) {
    const pacienteIndex = pacientes.findIndex(p => p.id === pacienteId);
    
    if (pacienteIndex === -1) return null;
    
    // Actualizar solo los campos permitidos
    const camposPermitidos = ['peso', 'frecuenciaCardiaca', 'edad', 'altura'];
    
    camposPermitidos.forEach(campo => {
      if (datosActualizados[campo] !== undefined) {
        pacientes[pacienteIndex][campo] = datosActualizados[campo];
      }
    });
    
    return pacientes[pacienteIndex];
  }
  
  // Obtener exámenes de paciente
  obtenerExamenesPaciente(pacienteId) {
    const paciente = pacientes.find(p => p.id === pacienteId);
    
    if (!paciente) return null;
    
    return paciente.examenes.map(examen => ({
      id: examen.id,
      fecha: examen.fecha,
      tipo: examen.tipo,
      resultados: examen.resultados,
      observaciones: examen.observaciones || ''
    }));
  }
  
  // Obtener contexto formateado
  obtenerContextoPaciente(pacienteId) {
    return formatearContextoPaciente(pacienteId);
  }
  
  // Obtener pacientes completos (para uso interno)
  obtenerPacientesCompletos() {
    return pacientes;
  }
}

module.exports = new PacienteService();