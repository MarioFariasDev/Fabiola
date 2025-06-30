const treinos = [
    {
        dia: "DIA 1 – Full Body com Bi-set + Cardio Intervalado",
        tecnica: "Bi-set + Circuito",
        objetivo: "Ativação geral + alto gasto calórico",
        exercicios: [
            ["Agachamento com halteres", "4", "15", "Bi-set", "Contração de glúteo no topo"],
            ["Flexão de braço no solo", "4", "12", "Bi-set", "Pode fazer com joelhos apoiados"],
            ["Afundo alternado", "3", "20 (10 por perna)", "Bi-set", "Pode usar halteres ou peso corporal"],
            ["Remada unilateral com halteres", "3", "12 por lado", "Bi-set", "Postura firme, cotovelo fechado"],
            ["Elevação pélvica (Glute Bridge)", "4", "20", "-", "Contração máxima no topo"],
            ["Circuito final: Polichinelos + prancha + mountain climber", "3", "30s cada", "HIIT", "Sem descanso entre"]
        ],
        cardio: "3 rounds: 30s polichinelo + 30s prancha + 30s mountain climber"
    },
    {
        dia: "DIA 2 – Pernas e Glúteo com foco em posterior",
        tecnica: "Rest-pause + Isometria",
        objetivo: "Fortalecer glúteos e posteriores",
        exercicios: [
            ["Stiff com halteres", "4", "12 + 5", "Rest-pause", "Descer devagar, subir explosivo"],
            ["Elevação pélvica unilateral", "3", "15 por lado", "-", "Apoiar em cadeira ou sofá"],
            ["Cadeira improvisada na parede", "3", "45s", "Isometria", "Segurar peso no colo se possível"],
            ["Agachamento sumô com halteres", "4", "15", "-", "Abrir joelhos e contrair interno de coxa"],
            ["Abdução de quadril com elástico", "3", "20", "-", "Foco no glúteo médio"]
        ],
        cardio: "Corrida leve 15min ou escada alternada 10min"
    },
    {
        dia: "DIA 3 – Core + HIIT Funcional",
        tecnica: "Circuito",
        objetivo: "Fortalecimento do core + resistência cardiovascular",
        exercicios: [
            ["Circuito 1: prancha com toque no ombro", "3", "30s", "Circuito", "-"],
            ["Abdominal infra com pernas estendidas", "3", "20", "Circuito", "-"],
            ["Mountain climber", "3", "30s", "Circuito", "-"],
            ["Russian twist", "3", "30 reps", "Circuito", "-"],
            ["Burpee adaptado (sem salto)", "3", "12", "Circuito", "-"],
            ["Polichinelo", "3", "30s", "Circuito", "-"],
            ["Prancha isométrica", "3", "40s", "Circuito", "-"],
            ["Abdominal remador", "3", "20", "Circuito", "-"]
        ],
        cardio: "Incluído no circuito"
    },
    {
        dia: "DIA 4 – Superiores + Glúteo",
        tecnica: "Bi-set",
        objetivo: "Ganho de tônus muscular superior e inferior",
        exercicios: [
            ["Flexão de braço", "4", "10", "Bi-set", "Pode apoiar joelhos"],
            ["Elevação de quadril (glúteo)", "4", "20", "Bi-set", "Contração máxima"],
            ["Remada curvada com halter", "3", "12", "Bi-set", "Usar mochila ou peso"],
            ["Agachamento com halter", "3", "15", "Bi-set", "Controle no movimento"],
            ["Desenvolvimento de ombro", "3", "12", "Bi-set", "Pode usar garrafas ou halteres"],
            ["Abdução de quadril com elástico", "3", "20", "Bi-set", "-"],
            ["Tríceps banco (cadeira)", "4", "15", "Bi-set", "-"],
            ["Elevação de pernas", "4", "15", "Bi-set", "Foco no abdômen inferior"]
        ],
        cardio: "Caminhada rápida 15min ou escada"
    },
    {
        dia: "DIA 5 – Full Body HIIT + Mobilidade",
        tecnica: "HIIT + Recuperação ativa",
        objetivo: "Finalização intensa + mobilidade global",
        exercicios: [
            ["Jumping squat", "4", "20", "HIIT", "-"],
            ["Flexão + subida de joelhos", "4", "12", "HIIT", "-"],
            ["Skater jump (salto lateral)", "4", "30s", "HIIT", "-"],
            ["Prancha dinâmica (movendo braços)", "4", "30s", "HIIT", "-"],
            ["Alongamento – Posição da criança", "1", "1min", "Alongamento", "-"],
            ["Mobilidade torácica + quadril", "1", "2min", "Mobilidade", "Foco na respiração"]
        ],
        cardio: "Incluído no HIIT"
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
