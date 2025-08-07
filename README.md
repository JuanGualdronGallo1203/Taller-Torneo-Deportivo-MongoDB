# Torneo Deportivo Internacional - Base de Datos MongoDB

## 📌 Descripción General
Base de datos diseñada para gestionar el **Torneo Deportivo Internacional** organizado por *GlobalSports Union*. Contiene información sobre atletas, delegaciones, disciplinas, competiciones, estadísticas de equipos y logros históricos, con relaciones coherentes entre colecciones.

---

## 🗃️ Estructura de Colecciones

### 1. `Atletas.json`
**Descripción**: Registra datos personales y deportivos de los participantes.  
**Campos**:
- `nombre` (String): Nombre completo.
- `identificacion` (String): Número de identificación único.
- `nacionalidad` (String): País de origen (relación con `Delegacion.json`).
- `edad` (Number): Edad del atleta.
- `altura` (Number): Altura en metros.
- `peso` (Number): Peso en kg.
- `sexo` (String): Género (masculino/femenino).
- `disciplinas` (Array): Lista de disciplinas que practica (relación con `Disciplina.json`).
- `delegacion` (String): País al que representa (relación con `Delegacion.json`).
- `medallas` (Array): Lista de medallas obtenidas (relación con `Competiciones.json`).

**Justificación**:  
- Normalización parcial: Usa referencias por nombre para `delegacion` y `disciplinas`.
- Datos embebidos en `medallas` para facilitar consultas frecuentes.

---

### 2. `Delegacion.json`
**Descripción**: Países participantes y sus métricas.  
**Campos**:
- `pais` (String): Nombre del país (clave única).
- `continente` (String): Ubicación geográfica.
- `num_atletas` (Number): Cantidad de atletas registrados.
- `atletas` (Array): Nombres de atletas (relación con `Atletas.json`).
- `medallas` (Object): Contador de medallas (oro/plata/bronce).

**Justificación**:  
- Relación uno-a-muchos con `Atletas.json` mediante arrays.
- Optimizado para reportes rápidos de rendimiento por país.

---

### 3. `Disciplina.json`
**Descripción**: Deportes o disciplinas del torneo.  
**Campos**:
- `nombre` (String): Nombre oficial (ej: "Atletismo - 100m planos").
- `tipo` (String): Individual/Equipo/Parejas.
- `categoria` (String): Masculino/Femenino/Mixto.
- `atletas` (Array): Nombres de participantes (relación con `Atletas.json`).

**Justificación**:  
- Diseño flexible para agregar nuevas disciplinas.
- Relación muchos-a-muchos con `Atletas.json`.

---

### 4. `Competiciones.json`
**Descripción**: Eventos programados y resultados.  
**Campos**:
- `evento` (String): Nombre descriptivo (ej: "Final de Atletismo").
- `fecha` (String): Fecha en formato ISO.
- `disciplina` (String): Nombre de la disciplina (relación con `Disciplina.json`).
- `ganadores` (Object): Nombres de atletas/equipos ganadores (oro/plata/bronce).

**Justificación**:  
- Usa nombres exactos para relaciones con `Disciplina.json` y `Atletas.json`.
- Fácil filtrado por fechas o disciplinas.

---

### 5. `Estadisticas_Equipos.json`
**Descripción**: Métricas de equipos por disciplina.  
**Campos**:
- `equipo` (String): Nombre del equipo.
- `pais` (String): País asociado (relación con `Delegacion.json`).
- `disciplina` (String): Disciplina (relación con `Disciplina.json`).
- `jugadores` (Array): Nombres de integrantes (relación con `Atletas.json`).
- `partidos_jugados` (Number).
- `partidos_ganados` (Number).
- Métricas específicas (ej: `goles_a_favor`, `sets_en_contra`).

**Justificación**:  
- Combina referencias (`pais`, `disciplina`) y datos embebidos (`jugadores`).
- Optimizado para análisis de rendimiento.

---

### 6. `Logros_Historicos.json`
**Descripción**: Récords y méritos destacados.  
**Campos**:
- `atleta` (String): Nombre (relación con `Atletas.json`).
- `pais` (String): Nacionalidad (relación con `Delegacion.json`).
- `logro` (String): Descripción del hito.
- `ano` (Number): Año del logro.
- `disciplina` (String): Disciplina asociada (relación con `Disciplina.json`).

**Justificación**:  
- Diseño denormalizado para consultas rápidas de logros por atleta o país.

---

## 🔗 Relaciones entre Colecciones
| Colección A       | Campo de Relación       | Colección B         | Tipo de Relación       |
|--------------------|-------------------------|---------------------|------------------------|
| `Atletas`          | `delegacion`            | `Delegacion`        | Referencia por nombre  |
| `Atletas`          | `disciplinas`           | `Disciplina`        | Array de nombres       |
| `Competiciones`    | `disciplina`            | `Disciplina`        | Referencia por nombre  |
| `Competiciones`    | `ganadores.oro/plata...`| `Atletas`           | Referencia por nombre  |
| `Estadisticas_Equipos` | `jugadores`         | `Atletas`           | Array de nombres       |

---

## 🛠️ Justificación del Modelo
### **Enfoque Híbrido**
- **Normalización** (referencias por nombre):  
  Usado en relaciones uno-a-muchos (ej: `Atletas.delegacion → Delegacion.pais`) para evitar duplicación.

- **Desnormalización** (datos embebidos):  
  Aplicado en arrays como `Atletas.medallas` para optimizar consultas frecuentes.

### **Ventajas**
1. **Flexibilidad**: Agregar nuevas disciplinas o atletas sin modificar esquemas.
2. **Rendimiento**: Reduce operaciones de `$lookup` en consultas comunes.
3. **Legibilidad**: Nombres descriptivos en lugar de IDs crípticos.

---


### 🔥 Características Clave del Documento:
1. **Exhaustividad**: Cubre todas las colecciones, campos y relaciones.
2. **Explicación Técnica**: Detalla el porqué de cada decisión de modelado.
3. **Formato Listo para Producción**: Incluye ejemplos de consultas y recomendaciones operativas.
4. **Adaptabilidad**: Fácil de modificar para futuras expansiones.