// 1. Atletas con edad entre 20 y 30 años
// Propósito: Encontrar atletas en plena capacidad competitiva
db.Atletas.find({
    edad: { $gte: 20, $lte: 30 }
});

// 2. Delegaciones que han ganado al menos una medalla de oro
// Propósito: Identificar los países más exitosos
db.Delegacion.find({
    "medallas.oro": { $exists: true, $ne: [] }
});

// 3. Competiciones que no son de atletismo
// Propósito: Filtrar eventos no-atléticos
db.Competiciones.find({
    disciplina: { $nin: ["Atletismo - 100m planos", "Atletismo - 200m planos", "Atletismo - 400m planos"] }
});

// 4. Atletas que compiten en natación o ciclismo
// Propósito: Encontrar atletas de deportes acuáticos o de ruedas
db.Atletas.find({
    disciplinas: { $in: ["Natación - 200m libre", "Ciclismo BMX"] }
});

// 5. Equipos con más de 5 partidos ganados y menos de 8 jugados
// Propósito: Identificar equipos con alto rendimiento
db.Estadisticas_Equipos.find({
    $and: [
        { partidos_ganados: { $gt: 5 } },
        { partidos_jugados: { $lt: 8 } }
    ]
});

// 6. Atletas que no son de América
// Propósito: Encontrar competidores de otros continentes
db.Atletas.find({
    nacionalidad: { $nin: ["Colombia", "Ecuador", "Estados Unidos", "Brasil", "Argentina"] }
});

// 7. Disciplinas individuales con participantes femeninos
// Propósito: Listar deportes individuales para mujeres
db.Disciplina.find({
    $and: [
        { tipo: "Individual" },
        { categoria: "Femenino" }
    ]
});

// 8. Competiciones realizadas en la segunda quincena de agosto
// Propósito: Filtrar eventos de la fase final
db.Competiciones.find({
    fecha: { $gte: "2024-08-15", $lte: "2024-08-31" }
});

// 9. Atletas que miden más de 1.80m pero pesan menos de 80kg
// Propósito: Encontrar atletas con complexión delgada y alta
db.Atletas.find({
    $and: [
        { altura: { $gt: 1.80 } },
        { peso: { $lt: 80 } }
    ]
});

// 10. Logros históricos obtenidos después del año 2010
// Propósito: Mostrar récords recientes
db.Logros_Historicos.find({
    ano: { $gt: 2010 }
});

// 11. Equipos que han jugado entre 5 y 7 partidos
// Propósito: Identificar equipos con participación media
db.Estadisticas_Equipos.find({
    partidos_jugados: { $gte: 5, $lte: 7 }
});

// 12. Atletas que no han ganado medallas
// Propósito: Encontrar competidores sin podios
db.Atletas.find({
    medallas: { $exists: false }
});