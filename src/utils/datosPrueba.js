// Datos de pacientes predefinidos
const pacientes = [
  {
    id: 1,
    nombre: "Juan Carlos Pérez",
    edad: 45,
    genero: "M",
    peso: 85,                    // ← AGREGADO
    tipoSangre: "O+",            // ← AGREGADO
    frecuenciaCardiaca: 72,      // ← AGREGADO
    altura: 1.75,               // ← AGREGADO (metros)
    diagnosticoPrincipal: "Hipertensión arterial grado 1",
    medicamentos: ["Losartán 50mg 1x día", "Atorvastatina 20mg 1x día"],
    alergias: ["Penicilina", "Ibuprofeno"],
    antecedentes: ["Padre con diabetes", "Madre hipertensa"],

    examenes: [
      {
        id: 1,
        fecha: "2024-01-15",
        tipo: "Hemograma completo",
        resultados: {
          hemoglobina: { valor: "12.5", unidad: "g/dL", normal: "13.5-17.5", estado: "bajo" },
          hematocrito: { valor: "38", unidad: "%", normal: "40-52", estado: "bajo" },
          leucocitos: { valor: "7.2", unidad: "x10³/μL", normal: "4.5-11.0", estado: "normal" },
          plaquetas: { valor: "250", unidad: "x10³/μL", normal: "150-450", estado: "normal" },
          VCM: { valor: "88", unidad: "fL", normal: "80-100", estado: "normal" }
        },
        observaciones: "Anemia leve microcítica. Sugerir ferritina y hierro sérico."
      },
      {
        id: 2,
        fecha: "2024-02-20",
        tipo: "Perfil lipídico",
        resultados: {
          colesterolTotal: { valor: "210", unidad: "mg/dL", normal: "<200", estado: "alto" },
          colesterolHDL: { valor: "45", unidad: "mg/dL", normal: ">40", estado: "normal" },
          colesterolLDL: { valor: "130", unidad: "mg/dL", normal: "<100", estado: "alto" },
          trigliceridos: { valor: "150", unidad: "mg/dL", normal: "<150", estado: "normal" }
        },
        observaciones: "Dislipidemia tipo IIa. LDL elevado, controlar con dieta."
      },
      {
        id: 3,
        fecha: "2024-03-10",
        tipo: "Química sanguínea",
        resultados: {
          glucosa: { valor: "95", unidad: "mg/dL", normal: "70-100", estado: "normal" },
          creatinina: { valor: "0.9", unidad: "mg/dL", normal: "0.7-1.3", estado: "normal" },
          ureia: { valor: "30", unidad: "mg/dL", normal: "15-40", estado: "normal" },
          ALT: { valor: "35", unidad: "U/L", normal: "7-56", estado: "normal" },
          AST: { valor: "28", unidad: "U/L", normal: "5-40", estado: "normal" }
        }
      }
    ],

    consultas: [
      {
        fecha: "2024-03-15",
        motivo: "Control hipertensión",
        diagnostico: "HTA controlada",
        tratamiento: "Continuar mismo tratamiento",
        proximaCita: "2024-06-15"
      }
    ]
  },

  {
    id: 2,
    nombre: "María Fernanda López",
    edad: 32,
    genero: "F",
    peso: 62,                    // ← AGREGADO
    tipoSangre: "A-",            // ← AGREGADO
    frecuenciaCardiaca: 68,      // ← AGREGADO
    altura: 1.65,               // ← AGREGADO
    diagnosticoPrincipal: "Hipotiroidismo subclínico",
    medicamentos: ["Levotiroxina 50μg 1x día"],
    alergias: [],
    antecedentes: ["Tiroiditis autoinmune familiar"],

    examenes: [
      {
        id: 4,
        fecha: "2024-02-10",
        tipo: "Hormonas tiroideas",
        resultados: {
          TSH: { valor: "4.8", unidad: "mIU/L", normal: "0.4-4.0", estado: "alto" },
          T4Libre: { valor: "1.1", unidad: "ng/dL", normal: "0.8-1.8", estado: "normal" },
          T3: { valor: "120", unidad: "ng/dL", normal: "80-200", estado: "normal" },
          antiTPO: { valor: "150", unidad: "UI/mL", normal: "<35", estado: "alto" }
        },
        observaciones: "Hipotiroidismo subclínico de origen autoinmune. Iniciar tratamiento sustitutivo."
      },
      {
        id: 5,
        fecha: "2024-03-05",
        tipo: "Hemoglobina glicosilada",
        resultados: {
          HbA1c: { valor: "6.1", unidad: "%", normal: "<5.7", estado: "alto" }
        },
        observaciones: "Prediabetes. Controlar con dieta y ejercicio."
      }
    ],

    consultas: [
      {
        fecha: "2024-03-25",
        motivo: "Control hipotiroidismo",
        diagnostico: "Hipotiroidismo compensado",
        tratamiento: "Mantener levotiroxina 50μg",
        proximaCita: "2024-09-25"
      }
    ]
  },

  {
    id: 3,
    nombre: "Carlos Alberto Ramírez",
    edad: 58,
    genero: "M",
    peso: 92,                    // ← AGREGADO
    tipoSangre: "B+",            // ← AGREGADO
    frecuenciaCardiaca: 85,      // ← AGREGADO (un poco elevada)
    altura: 1.78,               // ← AGREGADO
    diagnosticoPrincipal: "Diabetes tipo 2",
    medicamentos: ["Metformina 850mg 2x día", "Gliclazida 30mg 1x día"],
    alergias: ["Sulfas"],
    antecedentes: ["Diabetes familiar", "Obesidad grado I"],

    examenes: [
      {
        id: 6,
        fecha: "2024-01-30",
        tipo: "Curva de tolerancia a la glucosa",
        resultados: {
          glucosaAyuno: { valor: "125", unidad: "mg/dL", normal: "70-100", estado: "alto" },
          glucosa120min: { valor: "210", unidad: "mg/dL", normal: "<140", estado: "alto" }
        },
        observaciones: "Diabetes mellitus tipo 2 confirmada."
      },
      {
        id: 7,
        fecha: "2024-03-01",
        tipo: "Hemoglobina glicosilada",
        resultados: {
          HbA1c: { valor: "7.8", unidad: "%", normal: "<5.7", estado: "alto" }
        },
        observaciones: "Control subóptimo. Ajustar tratamiento."
      }
    ]
  }
];

// Función para formatear contexto del paciente
function formatearContextoPaciente(pacienteId) {
  const paciente = pacientes.find(p => p.id === pacienteId);
  if (!paciente) return null;

  let contexto = `=== INFORMACIÓN DEL PACIENTE ===
Nombre: ${paciente.nombre}
Edad: ${paciente.edad} años
Género: ${paciente.genero}
Peso: ${paciente.peso} kg
Altura: ${paciente.altura} m
Tipo de sangre: ${paciente.tipoSangre}
Frecuencia cardíaca: ${paciente.frecuenciaCardiaca} lpm
Diagnóstico principal: ${paciente.diagnosticoPrincipal}
Medicamentos actuales: ${paciente.medicamentos.join(', ')}
Alergias: ${paciente.alergias.length > 0 ? paciente.alergias.join(', ') : 'Ninguna'}
Antecedentes relevantes: ${paciente.antecedentes.join('; ')}

=== EXAMENES RECIENTES ===\n`;

  paciente.examenes.forEach(examen => {
    contexto += `\n📅 ${examen.fecha} - ${examen.tipo}:\n`;

    Object.entries(examen.resultados).forEach(([param, data]) => {
      const emoji = data.estado === 'normal' ? '✅' :
                   data.estado === 'alto' ? '📈' :
                   data.estado === 'bajo' ? '📉' : '⚪';
      contexto += `  ${emoji} ${param}: ${data.valor} ${data.unidad} (Normal: ${data.normal})\n`;
    });

    if (examen.observaciones) {
      contexto += `  📝 Observaciones: ${examen.observaciones}\n`;
    }
  });

  return contexto;
}

// Valores de referencia globales
const valoresReferencia = {
  "Hemograma": {
    "hemoglobina": { min: 13.5, max: 17.5, unidad: "g/dL" },
    "hematocrito": { min: 40, max: 52, unidad: "%" },
    "leucocitos": { min: 4.5, max: 11.0, unidad: "x10³/μL" }
  },
  "Lípidos": {
    "colesterolTotal": { max: 200, unidad: "mg/dL" },
    "colesterolLDL": { max: 100, unidad: "mg/dL" },
    "colesterolHDL": { min: 40, unidad: "mg/dL" }
  },
  "Glucosa": {
    "glucosa": { min: 70, max: 100, unidad: "mg/dL" },
    "HbA1c": { max: 5.7, unidad: "%" }
  },
  "Tiroides": {
    "TSH": { min: 0.4, max: 4.0, unidad: "mIU/L" },
    "T4Libre": { min: 0.8, max: 1.8, unidad: "ng/dL" }
  },
  "Vitales": {
    "frecuenciaCardiaca": { min: 60, max: 100, unidad: "lpm" },
    "peso": { imcMin: 18.5, imcMax: 24.9 }
  }
};

// Función para calcular IMC
function calcularIMC(paciente) {
  if (!paciente.peso || !paciente.altura) return null;
  return (paciente.peso / (paciente.altura * paciente.altura)).toFixed(1);
}

module.exports = {
  pacientes,
  formatearContextoPaciente,
  valoresReferencia,
  calcularIMC
};