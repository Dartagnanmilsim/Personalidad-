const preguntas = [

"Me preocupo por el bienestar de las personas",
"Busco mantener un ambiente positivo en el equipo",

"Tomo decisiones rápidamente para avanzar",
"Me enfoco en lograr resultados concretos",

"Analizo información antes de decidir",
"Prefiero trabajar con procesos claros",

"Me gusta motivar e influir en otros",
"Disfruto interactuar y comunicar ideas"
];

const estilos = {
Afable: [0,1],
Emprendedor: [2,3],
Analitico: [4,5],
Extrovertido: [6,7]
};

const contenedor = document.getElementById("questions");

preguntas.forEach((p,i)=>{

contenedor.innerHTML += `
<div class="question-row">
    <div class="question-text">${i+1}. ${p}</div>
    <select id="q${i}">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3" selected>3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
</div>
`;
});

let chart;
let ultimoResultado;

function calcular(){

let r = [];
for(let i=0;i<preguntas.length;i++){
    r.push(parseInt(document.getElementById("q"+i).value));
}

let resultados = {};

for(let estilo in estilos){
    let idx = estilos[estilo];
    resultados[estilo] = r[idx[0]] + r[idx[1]];
}

const sorted = Object.entries(resultados).sort((a,b)=>b[1]-a[1]);
const top3 = sorted.slice(0,3);

ultimoResultado = {resultados, top3};

let principal = top3[0][0];

document.getElementById("resultado").style.display="block";
document.getElementById("resultado").innerHTML = `
<h2>Estilo Principal: ${principal}</h2>

<p>
Tu estilo dominante refleja tu forma natural de liderar,
tomar decisiones y relacionarte con otros en entornos de trabajo.
</p>

<p><b>Combinación:</b> ${top3[0][0]}, ${top3[1][0]}, ${top3[2][0]}</p>
`;

document.getElementById("pdfBtn").style.display="block";

crearGrafico(resultados);

}

function crearGrafico(data){

const ctx = document.getElementById('grafico');

if(chart) chart.destroy();

chart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: Object.keys(data),
        datasets: [{
            label: 'Nivel',
            data: Object.values(data),
            backgroundColor: 'rgba(56,189,248,0.2)',
            borderColor: '#38bdf8'
        }]
    }
});

}

async function descargarPDF(){

const { jsPDF } = window.jspdf;
const doc = new jsPDF();

let principal = ultimoResultado.top3[0][0];

doc.text("Informe Estilos de Liderazgo",10,20);
doc.text(`Estilo principal: ${principal}`,10,30);

const canvas = document.getElementById("grafico");
const imgData = canvas.toDataURL("image/png",1.0);

doc.addImage(imgData,"PNG",10,40,180,100);

doc.save("liderazgo.pdf");

}
