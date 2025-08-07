//1. Atletas con edad entre 20 y 30 años
//Propósito: Encontrar atletas en plena capacidad competitiva (rango de edad óptimo).
//consulta:
db.Atletas.find({
    edad: { $gte: 20, $lte: 30 }
});

//2. Delegaciones que han ganado al menos una medalla de oro
//Propósito: Identificar los países más exitosos en el torneo.
//consulta
