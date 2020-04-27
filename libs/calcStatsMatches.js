module.exports = (localObj, visitorObj, matches) => {
    localObj.statistics.dif = 0;
    localObj.statistics.gp = 0;
    localObj.statistics.gr = 0;
    localObj.statistics.gs = 0;
    localObj.statistics.lm = 0;
    localObj.statistics.pts = 0;
    localObj.statistics.tm = 0;
    localObj.statistics.wm = 0;
    visitorObj.statistics.dif = 0;
    visitorObj.statistics.gp = 0;
    visitorObj.statistics.gr = 0;
    visitorObj.statistics.gs = 0;
    visitorObj.statistics.lm = 0;
    visitorObj.statistics.pts = 0;
    visitorObj.statistics.tm = 0;
    visitorObj.statistics.wm = 0;
    // Recorro todos los partidos
    for (const i in matches) {
        // Si el local es local
        if (matches[i].local == localObj._id.toString()) {
            localObj.statistics.gp = localObj.statistics.gp + 1; // Partidos jugados
            localObj.statistics.gr = localObj.statistics.gr + matches[i].goals_visitor; // Goles recibidos
            localObj.statistics.gs = localObj.statistics.gs + matches[i].goals_local; // Goles marcados
            localObj.statistics.dif = localObj.statistics.gs - localObj.statistics.gr; // Dif goles
            // Si gano el local
            if (matches[i].goals_local > matches[i].goals_visitor) {
                // Local
                localObj.statistics.wm = localObj.statistics.wm + 1; // Ganados
                localObj.statistics.pts = localObj.statistics.pts + 3; // Puntos
            }
            // Si gana visitor
            if (matches[i].goals_local < matches[i].goals_visitor) {
                // Local
                localObj.statistics.lm = localObj.statistics.lm + 1; // Perdidos
            }
            // Si empatan
            if (matches[i].goals_local === matches[i].goals_visitor) {
                // Local
                localObj.statistics.tm = localObj.statistics.tm + 1; // Empatados
                localObj.statistics.pts = localObj.statistics.pts + 1; // Puntos
            }
        }
        // Si el local es visitor
        if (matches[i].visitor == localObj._id.toString()) {
            localObj.statistics.gp = localObj.statistics.gp + 1; // Partidos jugados
            localObj.statistics.gr = localObj.statistics.gr + matches[i].goals_local; // Goles recibidos
            localObj.statistics.gs = localObj.statistics.gs + matches[i].goals_visitor; // Goles marcados
            localObj.statistics.dif = localObj.statistics.gs - localObj.statistics.gr; // Dif goles
            // Si gano el visitor
            if (matches[i].goals_local < matches[i].goals_visitor) {
                // Local
                localObj.statistics.wm = localObj.statistics.wm + 1; // Ganados
                localObj.statistics.pts = localObj.statistics.pts + 3; // Puntos
            }
            // Si gana local
            if (matches[i].goals_local > matches[i].goals_visitor) {
                // Local
                localObj.statistics.lm = localObj.statistics.lm + 1; // Perdidos
            }
            // Si empatan
            if (matches[i].goals_local === matches[i].goals_visitor) {
                // Local
                localObj.statistics.tm = localObj.statistics.tm + 1; // Empatados
                localObj.statistics.pts = localObj.statistics.pts + 1; // Puntos
            }
        }
        // Si el visitor es visitor
        if (matches[i].visitor == visitorObj._id.toString()) {
            visitorObj.statistics.gp = visitorObj.statistics.gp + 1; // Partidos jugados
            visitorObj.statistics.gr = visitorObj.statistics.gr + matches[i].goals_local; // Goles recibidos
            visitorObj.statistics.gs = visitorObj.statistics.gs + matches[i].goals_visitor; // Goles marcados
            visitorObj.statistics.dif = visitorObj.statistics.gs - visitorObj.statistics.gr; // Dif goles
            // Si gano el visitor
            if (matches[i].goals_visitor > matches[i].goals_local) {
                // Visitor
                visitorObj.statistics.wm = visitorObj.statistics.wm + 1; // Ganados
                visitorObj.statistics.pts = visitorObj.statistics.pts + 3; // Puntos
            }
            // Si gana local
            if (matches[i].goals_visitor < matches[i].goals_local) {
                // Visitor
                visitorObj.statistics.lm = visitorObj.statistics.lm + 1; // Perdidos
            }
            // Si empatan
            if (matches[i].goals_local === matches[i].goals_visitor) {
                // Local
                visitorObj.statistics.tm = visitorObj.statistics.tm + 1; // Empatados
                visitorObj.statistics.pts = visitorObj.statistics.pts + 1; // Puntos
            }
        }
        // Si el visitor es local
        if (matches[i].local == visitorObj._id.toString()) {
            visitorObj.statistics.gp = visitorObj.statistics.gp + 1; // Partidos jugados
            visitorObj.statistics.gr = visitorObj.statistics.gr + matches[i].goals_visitor; // Goles recibidos
            visitorObj.statistics.gs = visitorObj.statistics.gs + matches[i].goals_local; // Goles marcados
            visitorObj.statistics.dif = visitorObj.statistics.gs - visitorObj.statistics.gr; // Dif goles
            // Si gano el local
            if (matches[i].goals_visitor < matches[i].goals_local) {
                // Visitor
                visitorObj.statistics.wm = visitorObj.statistics.wm + 1; // Ganados
                visitorObj.statistics.pts = visitorObj.statistics.pts + 3; // Puntos
            }
            // Si gana visitor
            if (matches[i].goals_visitor > matches[i].goals_local) {
                // Visitor
                visitorObj.statistics.lm = visitorObj.statistics.lm + 1; // Perdidos
            }
            // Si empatan
            if (matches[i].goals_local === matches[i].goals_visitor) {
                // Local
                visitorObj.statistics.tm = visitorObj.statistics.tm + 1; // Empatados
                visitorObj.statistics.pts = visitorObj.statistics.pts + 1;
            }
        }
    }
}