const { pacientes, formatearContextoPaciente } = require('../utils/datosPrueba');

class PacienteService {
  obtenerTodosPacientes() {
    return pacientes.map(p => ({
      id: p.id,
      nombre: p.nombre,
      edad: p.edad,
      diagnostico: p.diagnosticoPrincipal,
      ultimoExamen: p.examenes.length > 0 ? p.examenes[p.examenes.length - 1].fecha : 'No disponible'
    }));
  }
  
  obtenerPacientePorId(id) {
    const paciente = pacientes.find(p => p.id === id);
    
    if (!paciente) return null;
    
    return {
      id: paciente.id,
      informacionBasica: {
        nombre: paciente.nombre,
        edad: paciente.edad,
        genero: paciente.genero,
        diagnostico: paciente.diagnosticoPrincipal
      },
      tratamiento: {
        medicamentos: paciente.medicamentos,
        alergias: paciente.alergias
      },
      resumenExamenes: paciente.examenes.slice(-3).map(e => ({
        fecha: e.fecha,
        tipo: e.tipo,
        resultadosDestacados: Object.entries(e.resultados)
          .filter(([_, data]) => data.estado !== 'normal')
          .map(([param, data]) => `${param}: ${data.valor} ${data.unidad} (${data.estado})`)
      }))
    };
  }
  
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
  
  buscarExamenesPorParametro(pacienteId, parametro) {
    const paciente = pacientes.find(p => p.id === pacienteId);
    
    if (!paciente) return [];
    
    const resultados = [];
    
    paciente.examenes.forEach(examen => {
      Object.entries(examen.resultados).forEach(([param, data]) => {
        if (param.toLowerCase().includes(parametro.toLowerCase())) {
          resultados.push({
            fecha: examen.fecha,
            examen: examen.tipo,
            parametro: param,
            valor: `${data.valor} ${data.unidad}`,
            estado: data.estado,
            referencia: data.normal
          });
        }
      });
    });
    
    return resultados;
  }
  
  obtenerContextoPaciente(pacienteId) {
    return formatearContextoPaciente(pacienteId);
  }
  
  verificarValoresCriticos(pacienteId) {
    const paciente = pacientes.find(p => p.id === pacienteId);
    
    if (!paciente) return [];
    
    const criticos = [];
    
    paciente.examenes.forEach(examen => {
      Object.entries(examen.resultados).forEach(([param, data]) => {
        if (data.estado === 'alto' || data.estado === 'bajo') {
          const valor = parseFloat(data.valor);
          const [min, max] = data.normal.split('-').map(Number);
          
          let severidad = 'leve';
          if (data.estado === 'alto' && max) {
            const porcentaje = ((valor - max) / max) * 100;
            severidad = porcentaje > 50 ? 'grave' : porcentaje > 20 ? 'moderado' : 'leve';
          }
          
          criticos.push({
            fecha: examen.fecha,
            parametro: param,
            valor: `${data.valor} ${data.unidad}`,
            normal: data.normal,
            estado: data.estado,
            severidad: severidad,
            examen: examen.tipo
          });
        }
      });
    });
    
    return criticos;
  }
}

module.exports = new PacienteService();