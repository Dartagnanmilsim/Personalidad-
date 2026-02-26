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
Rey:{descripcion:"Líder natural orientado al orden.",fortalezas:"Autoridad, visión.",riesgos:"Control excesivo.",evolucion:"Delegar y confiar."},
Guerrero:{descripcion:"Ejecutor disciplinado.",fortalezas:"Acción, disciplina.",riesgos:"Estrés.",evolucion:"Equilibrar descanso."},
Mago:{descripcion:"Estratega analítico.",fortalezas:"Inteligencia.",riesgos:"Aislamiento.",evolucion:"Aplicar conocimiento."},
Amante:{descripcion:"Conector emocional.",fortalezas:"Empatía.",riesgos:"Dependencia.",evolucion:"Límites sanos."},
Explorador:{descripcion:"Buscador de libertad.",fortalezas:"Curiosidad.",riesgos:"Inestabilidad.",evolucion:"Compromiso."},
Creador:{descripcion:"Innovador.",fortalezas:"Creatividad.",riesgos:"Perfeccionismo.",evolucion:"Ejecutar."},
Rebelde:{descripcion:"Transformador.",fortalezas:"Valentía.",riesgos:"Conflicto.",evolucion:"Construir."},
Bufón:{descripcion:"Carismático.",fortalezas:"Alegría.",riesgos:"Inmadurez.",evolucion:"Responsabilidad."},
Ciudadano:{descripcion:"Responsable.",fortalezas:"Lealtad.",riesgos:"Conformismo.",evolucion:"Iniciativa."},
Mentor:{descripcion:"Guía.",fortalezas:"Enseñanza.",riesgos:"Rigidez.",evolucion:"Humildad."},
Héroe:{descripcion:"Competidor.",fortalezas:"Logro.",riesgos:"Ego.",evolucion:"Propósito."},
Sabio:{descripcion:"Reflexivo.",fortalezas:"Perspectiva.",riesgos:"Pasividad.",evolucion:"Acción."}
};

const contenedor = document.getElementById("questions");

preguntas.forEach((p,i)=>{
    contenedor.innerHTML += `
    <div class="question">
        <div class="question-text">${i+1}. ${p}</div>
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
let ultimoResultado = null;

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

ultimoResultado = {arquetipos, top3};

let principal = top3[0][0];
let p = perfiles[principal];

document.getElementById("resultado").style.display="block";
document.getElementById("resultado").innerHTML = `
<h2>Arquetipo Principal: ${principal}</h2>

<p><b>Descripción:</b> ${p.descripcion}</p>
<p><b>Fortalezas:</b> ${p.fortalezas}</p>
<p><b>Riesgos:</b> ${p.riesgos}</p>
<p><b>Evolución:</b> ${p.evolucion}</p>

<hr>

<p><b>Combinación:</b> ${top3[0][0]}, ${top3[1][0]}, ${top3[2][0]}</p>
`;

document.getElementById("pdfBtn").style.display="block";

crearGrafico(arquetipos);

}

function crearGrafico(data){

const ctx = document.getElementById('grafico');

if(chart) chart.destroy();

chart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'Nivel de desarrollo',
            data: Object.values(data),
            backgroundColor: 'rgba(56,189,248,0.2)',
            borderColor: '#38bdf8',
            pointBackgroundColor: '#38bdf8',
            borderWidth:2
        }]
    },
    options:{
        plugins:{
            legend:{
                labels:{color:"white",font:{size:14}}
            }
        },
        scales:{
            r:{
                angleLines:{color:"#334155"},
                grid:{color:"#334155"},
                pointLabels:{color:"white",font:{size:12}},
                ticks:{color:"white",backdropColor:"transparent"}
            }
        }
    }
});

}

async function descargarPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

let principal = ultimoResultado.top3[0][0];
let p = perfiles[principal];

doc.setFontSize(16);
doc.text("Resultado Test de Arquetipos", 10, 15);

doc.setFontSize(12);
doc.text(`Arquetipo principal: ${principal}`,10,30);
doc.text(`Descripción: ${p.descripcion}`,10,40);
doc.text(`Fortalezas: ${p.fortalezas}`,10,50);
doc.text(`Riesgos: ${p.riesgos}`,10,60);
doc.text(`Evolución: ${p.evolucion}`,10,70);

doc.text(`Combinación: ${ultimoResultado.top3.map(t=>t[0]).join(", ")}`,10,90);

const canvas = document.getElementById("grafico");
const imgData = canvas.toDataURL("image/png",1.0);

doc.addImage(imgData,"PNG",10,100,180,80);

doc.save("resultado_arquetipos.pdf");

}
