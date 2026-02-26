const preguntas = [
"Las personas me buscan para decisiones importantes",
"Asumo responsabilidad por otros",
"Soy persistente hasta lograr objetivos",
"Prefiero actuar rápido",
"Analizo antes de actuar",
"Me gusta aprender profundamente",
"Expreso mis sentimientos fácilmente",
"Disfruto experiencias sensoriales",
"Necesito libertad para decidir",
"Me aburre la rutina",
"Me gusta crear proyectos",
"Disfruto construir algo duradero",
"Cuestiono normas absurdas",
"Voy contra la corriente",
"Uso humor en situaciones difíciles",
"Me consideran divertido",
"Cumplo compromisos",
"Me importa contribuir a otros",
"Personas me piden consejos",
"Disfruto ayudar a crecer",
"Necesito progreso",
"La competencia me motiva",
"Reflexiono sobre la vida",
"Busco comprenderme"
];

const perfiles = {

Rey:{
descripcion:"Líder natural orientado al orden y la estructura.",
fortalezas:"Autoridad, visión, estabilidad y capacidad de organización.",
riesgos:"Control excesivo, rigidez o autoritarismo.",
evolucion:"Aprender a delegar, confiar en otros y desarrollar empatía."
},

Guerrero:{
descripcion:"Ejecutor disciplinado que logra objetivos con determinación.",
fortalezas:"Disciplina, acción, enfoque y resiliencia.",
riesgos:"Estrés, agresividad o exceso de exigencia.",
evolucion:"Equilibrar acción con descanso y conexión emocional."
},

Mago:{
descripcion:"Estratega analítico que comprende sistemas y procesos.",
fortalezas:"Inteligencia, aprendizaje, observación y pensamiento estratégico.",
riesgos:"Aislamiento o manipulación.",
evolucion:"Aplicar el conocimiento en acciones prácticas."
},

Amante:{
descripcion:"Conector emocional sensible y apasionado.",
fortalezas:"Empatía, disfrute, conexión humana y creatividad emocional.",
riesgos:"Dependencia emocional o impulsividad.",
evolucion:"Desarrollar límites sanos y estabilidad interna."
},

Explorador:{
descripcion:"Buscador de libertad, independencia y nuevas experiencias.",
fortalezas:"Curiosidad, adaptabilidad, valentía.",
riesgos:"Inestabilidad o dificultad para comprometerse.",
evolucion:"Construir proyectos con continuidad."
},

Creador:{
descripcion:"Innovador que construye ideas, proyectos o soluciones.",
fortalezas:"Creatividad, visión, capacidad de generar valor.",
riesgos:"Perfeccionismo o frustración.",
evolucion:"Ejecutar sin esperar perfección."
},

Rebelde:{
descripcion:"Transformador que desafía normas y genera cambio.",
fortalezas:"Valentía, pensamiento independiente.",
riesgos:"Destrucción sin propósito o conflicto constante.",
evolucion:"Canalizar la rebeldía en construcción positiva."
},

Bufón:{
descripcion:"Persona carismática que usa humor y ligereza.",
fortalezas:"Alegría, creatividad social, adaptación.",
riesgos:"Inmadurez o evasión de responsabilidades.",
evolucion:"Integrar diversión con compromiso."
},

Ciudadano:{
descripcion:"Responsable y comprometido con su entorno.",
fortalezas:"Lealtad, cooperación, confiabilidad.",
riesgos:"Conformismo o dependencia social.",
evolucion:"Desarrollar iniciativa propia."
},

Mentor:{
descripcion:"Guía que ayuda a otros a crecer mediante experiencia.",
fortalezas:"Sabiduría práctica, enseñanza, liderazgo humano.",
riesgos:"Superioridad moral o rigidez.",
evolucion:"Mantener humildad y aprendizaje continuo."
},

Héroe:{
descripcion:"Competidor que busca superación personal constante.",
fortalezas:"Valentía, logro, ambición.",
riesgos:"Ego o necesidad de aprobación.",
evolucion:"Conectar el logro con propósito profundo."
},

Sabio:{
descripcion:"Persona reflexiva que busca comprensión y sentido.",
fortalezas:"Perspectiva, serenidad, profundidad.",
riesgos:"Pasividad o desconexión de la acción.",
evolucion:"Transformar conocimiento en decisiones."
}

};

const contenedor = document.getElementById("questions");

preguntas.forEach((p,i)=>{
    contenedor.innerHTML += `
    <div class="question">
    ${i+1}. ${p}
    <select id="q${i}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    </div>`;
});

let chart;

function calcular(){

let r = [];
for(let i=0;i<24;i++){
    r.push(parseInt(document.getElementById("q"+i).value));
}

const arquetipos = {
Rey: r[0]+r[1],
Guerrero: r[2]+r[3],
Mago: r[4]+r[5],
Amante: r[6]+r[7],
Explorador: r[8]+r[9],
Creador: r[10]+r[11],
Rebelde: r[12]+r[13],
Bufón: r[14]+r[15],
Ciudadano: r[16]+r[17],
Mentor: r[18]+r[19],
Héroe: r[20]+r[21],
Sabio: r[22]+r[23]
};

const sorted = Object.entries(arquetipos).sort((a,b)=>b[1]-a[1]);

const top3 = sorted.slice(0,3);

localStorage.setItem("resultadoArquetipos", JSON.stringify(sorted));

let principal = top3[0][0];
let segundo = top3[1][0];
let tercero = top3[2][0];

let p = perfiles[principal];

document.getElementById("resultado").style.display="block";

document.getElementById("resultado").innerHTML = `
<h2>Tu Arquetipo Principal: ${principal}</h2>

<p><b>Descripción:</b> ${p.descripcion}</p>
<p><b>Fortalezas:</b> ${p.fortalezas}</p>
<p><b>Riesgos:</b> ${p.riesgos}</p>
<p><b>Evolución recomendada:</b> ${p.evolucion}</p>

<hr>

<h3>Combinación de Personalidad</h3>
<p>
Tu perfil combina <b>${principal}</b>, <b>${segundo}</b> y <b>${tercero}</b>.
Esto indica que tu comportamiento está influenciado por múltiples energías psicológicas.
</p>

<p>
Las personas con esta combinación suelen mostrar patrones específicos en liderazgo,
relaciones y toma de decisiones.
</p>
`;

document.getElementById("pdfBtn").style.display="block";

crearGrafico(arquetipos);

}

function crearGrafico(data){

const ctx = document.getElementById('grafico');

if(chart){
    chart.destroy();
}

chart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'Resultado',
            data: Object.values(data)
        }]
    }
});

}

async function descargarPDF(){

const { jsPDF } = window.jspdf;

let resultados = JSON.parse(localStorage.getItem("resultadoArquetipos"));

const doc = new jsPDF();

doc.text("Resultado Test de Arquetipos", 10, 10);

resultados.slice(0,3).forEach((r,i)=>{
    doc.text(`${i+1}. ${r[0]}: ${r[1]}`, 10, 20 + (i*10));
});

doc.save("resultado_arquetipos.pdf");

}
