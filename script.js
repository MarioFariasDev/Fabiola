const treinos = [
    {
        dia: "DIA 1 – Posterior + Glúteo (Tempo + Bi-set)",
        tecnica: "Tempo controlado + Bi-set reverso",
        objetivo: "Ativação profunda de glúteos e posteriores",
        exercicios: [
            ["Stiff com halteres", "4", "12", "3s descida / 1s subida", "Foco na postura e alongamento posterior"],
            ["Elevação pélvica com peso", "4", "15 + 10s isometria", "Bi-set", "Sobe com força e trava no topo"],
            ["Agachamento sumô com elástico", "3", "20", "Bi-set reverso", "Logo após a elevação pélvica"],
            ["Cadeira na parede (isometria)", "3", "1min", "-", "Segurar com peso se possível"],
            ["Abdução deitada com elástico", "3", "20 + 20s isometria", "Pump final", "Sentir queimar o glúteo médio"]
        ],
        cardio: "Caminhada ou escada leve 10min"
    },
    {
        dia: "DIA 2 – Core + Mobilidade Ativa",
        tecnica: "Circuito com pausa ativa",
        objetivo: "Fortalecer o core e melhorar mobilidade",
        exercicios: [
            ["Prancha com elevação de perna", "3", "30s", "Core", "Manter quadril estável"],
            ["Abdominal infra com elástico", "3", "15", "-", "Controle total"],
            ["Prancha lateral com apoio", "3", "30s por lado", "-", "Ativar oblíquos"],
            ["Abdominal V-sit lento", "3", "15", "-", "Contrair no centro"],
            ["Mobilidade: Gato-vaca / quadril / torácica", "1", "10min", "-", "Movimentos controlados"]
        ],
        cardio: "Incluso nos exercícios"
    },
    {
        dia: "DIA 3 – Full Body Metabólico (Circuitão)",
        tecnica: "Circuito A/B com descanso curto",
        objetivo: "Gasto calórico + resistência muscular",
        exercicios: [
            ["Flexão com toques no ombro", "3", "12", "Circuito A", "Foco no core"],
            ["Agachamento + elevação lateral", "3", "15", "Circuito A", "Halter ou mochila"],
            ["Afundo alternado", "3", "10 por perna", "Circuito A", "Passos largos"],
            ["Prancha dinâmica", "3", "30s", "Circuito A", "Ritmo firme"],
            ["Burpee adaptado", "2", "12", "Circuito B", "Sem salto se necessário"],
            ["Abdominal cruzado", "2", "20", "Circuito B", "-"],
            ["Stiff com mochila", "2", "12", "Circuito B", "Foco no posterior"],
            ["Polichinelo", "2", "30s", "Circuito B", "Finalização"]
        ],
        cardio: "Incluso nos circuitos"
    },
    {
        dia: "DIA 4 – Superiores + Core Estático",
        tecnica: "Bi-set + isometria",
        objetivo: "Fortalecer parte superior e abdômen",
        exercicios: [
            ["Flexão com tempo (3s descida)", "3", "10", "-", "Controle total"],
            ["Remada unilateral", "3", "12 por lado", "-", "Postura e puxada firme"],
            ["Desenvolvimento alternado (ombros)", "3", "15", "-", "Garrafas ou halteres"],
            ["Tríceps banco + prancha 30s", "3", "15 + 30s", "Bi-set", "Sem pressa"],
            ["Rosca direta + prancha lateral", "3", "15 + 30s por lado", "Bi-set", "Foco no bíceps e core"]
        ],
        cardio: "Caminhada leve ou subir escadas 10min"
    },
    {
        dia: "DIA 5 – Glúteo Foco + HIIT Finalizador",
        tecnica: "Isolamento + HIIT",
        objetivo: "Esfolar o glúteo e finalizar com explosão",
        exercicios: [
            ["Ponte unilateral", "4", "12 por perna", "Isolado", "Subida explosiva e segura"],
            ["Abdução deitada com peso", "3", "20", "Pump", "Peso no quadril ou elástico forte"],
            ["Cadeira + abdução simultânea", "3", "15", "Bi-set", "Desafio total de glúteo"],
            ["Skater jump (salto lateral)", "3", "30s", "HIIT", "Controle e equilíbrio"],
            ["Mountain climber + prancha", "3", "30s cada", "HIIT", "Respiração consciente"]
        ],
        cardio: "Incluso no finalizador"
    }
];


const treinoContainer = document.getElementById("treinoContainer");
const progresso = JSON.parse(localStorage.getItem("progresso") || "{}");

treinos.forEach((treino, i) => {
    const card = document.createElement("div");
    card.className = "card";

    let html = `
    <h2>${treino.dia}</h2>
    <p><strong>Técnica:</strong> ${treino.tecnica}</p>
    <p><strong>Objetivo:</strong> ${treino.objetivo}</p>
    <table class="exercise-table">
      <thead>
        <tr>
          <th>✔</th>
          <th>Exercício</th>
          <th>Séries</th>
          <th>Reps</th>
          <th>Técnica</th>
          <th>Obs</th>
          <th>Descanso</th>
        </tr>
      </thead>
      <tbody>
  `;

    treino.exercicios.forEach((ex, j) => {
        const key = `d${i}_e${j}`;
        const checked = progresso[key]?.feito ? "checked" : "";
        const doneClass = progresso[key]?.feito ? "done" : "";

        html += `
      <tr class="exercise-row ${doneClass}" data-key="${key}">
        <td><input type="checkbox" ${checked}></td>
        <td>${ex[0]}</td>
        <td>${ex[1]}</td>
        <td>${ex[2]}</td>
        <td>${ex[3]}</td>
        <td>${ex[4]}</td>
        <td>
          <button class="timer-btn" onclick="iniciarTimer(this)">⏱️</button>
          <span class="timer-display">00:00</span>
        </td>
      </tr>
    `;
    });

    html += `</tbody></table>`;
    if (treino.cardio) html += `<p><strong>Cardio:</strong> ${treino.cardio}</p>`;
    card.innerHTML = html;
    treinoContainer.appendChild(card);
});

document.querySelectorAll(".exercise-row input[type='checkbox']").forEach(input => {
    input.addEventListener("change", function () {
        const row = this.closest(".exercise-row");
        const key = row.dataset.key;
        const feito = this.checked;
        row.classList.toggle("done", feito);
        progresso[key] = { feito };
        localStorage.setItem("progresso", JSON.stringify(progresso));
    });
});

function iniciarTimer(btn) {
    const span = btn.nextElementSibling;
    let tempo = 60;
    span.textContent = formatar(tempo);
    btn.disabled = true;

    const intervalo = setInterval(() => {
        tempo--;
        span.textContent = formatar(tempo);
        if (tempo <= 0) {
            clearInterval(intervalo);
            btn.disabled = false;
            span.textContent = "✔️";
        }
    }, 1000);
}

function formatar(s) {
    const m = String(Math.floor(s / 60)).padStart(2, "0");
    const sec = String(s % 60).padStart(2, "0");
    return `${m}:${sec}`;
}

const feedback = document.getElementById("feedback");
const feedbackSalvo = localStorage.getItem("feedbackGlobal");
if (feedbackSalvo) feedback.value = feedbackSalvo;

document.getElementById("salvarFeedback").addEventListener("click", () => {
    localStorage.setItem("feedbackGlobal", feedback.value);
    alert("Feedback salvo com sucesso!");
});

document.getElementById("darkToggle").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
});
