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
"Rey": r[0]+r[1],
"Guerrero": r[2]+r[3],
"Mago": r[4]+r[5],
"Amante": r[6]+r[7],
"Explorador": r[8]+r[9],
"Creador": r[10]+r[11],
"Rebelde": r[12]+r[13],
"Bufón": r[14]+r[15],
"Ciudadano": r[16]+r[17],
"Mentor": r[18]+r[19],
"Héroe": r[20]+r[21],
"Sabio": r[22]+r[23]
};

const sorted = Object.entries(arquetipos).sort((a,b)=>b[1]-a[1]);

const top3 = sorted.slice(0,3);

localStorage.setItem("resultadoArquetipos", JSON.stringify(sorted));

document.getElementById("resultado").style.display="block";

document.getElementById("resultado").innerHTML = `
<h2>Tu Arquetipo Principal: ${top3[0][0]}</h2>
<p>Segundo: ${top3[1][0]}</p>
<p>Tercero: ${top3[2][0]}</p>
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
