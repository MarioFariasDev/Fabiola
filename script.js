const treinos = [
    {
        dia: "DIA 1 – Inferiores (Glúteo + Posterior)",
        tecnica: "Cadência controlada + Isometria",
        objetivo: "Ativação profunda e estabilidade unilateral",
        exercicios: [
            ["Agachamento búlgaro com pausa", "3", "10 por perna", "Cadência", "2s descida, 1s pausa, subir explosivo"],
            ["Ponte com uma perna (isometria topo)", "3", "12 por perna", "Isometria", "Segurar 5s no topo"],
            ["Stiff unilateral com apoio leve", "3", "10 por perna", "-", "Equilíbrio e posterior"],
            ["Agachamento sumô com elástico + hold", "3", "15", "Hold", "Segurar 3s no fundo"],
            ["Abdução lateral deitada com elástico", "3", "15 + pump", "Pump", "15 reps + 15 rápidas"]
        ],
        cardio: "Caminhada leve ou escada 10min"
    },
    {
        dia: "DIA 2 – Core Dinâmico + Estabilidade",
        tecnica: "Anti-rotacional + controle",
        objetivo: "Fortalecer core profundo e transferência funcional",
        exercicios: [
            ["Prancha com transferência de peso", "3", "30s", "-", "Toque no ombro alternado"],
            ["Dead bug com extensão lenta", "3", "12 por lado", "-", "Controle de movimento"],
            ["Pallof press com elástico", "3", "12 por lado", "Anti-rotação", "-"],
            ["Prancha lateral com elevação de perna", "3", "30s por lado", "-", "Estabilidade"],
            ["Hollow hold modificado", "2", "30s", "-", "Core profundo"]
        ],
        cardio: "Incluso nos circuitos"
    },
    {
        dia: "DIA 3 – Full Body Metabólico Avançado",
        tecnica: "Circuito pesado/leves",
        objetivo: "Gasto calórico e resistência muscular",
        exercicios: [
            ["Flexão com elevação de perna", "3", "12", "-", "Core ativo"],
            ["Agachamento com halteres + extensão lateral de braço", "3", "15", "Combo", "Membro inferior + superior"],
            ["Afundo reverso com pausa", "3", "12 por perna", "Pausa", "1s no fundo"],
            ["Prancha dinâmica", "3", "30s", "-", "Movimento de quadril"],
            ["Burpee controlado", "2", "10", "-", "Sem salto explosivo se precisar"],
            ["Stiff com mochila (descida controlada)", "2", "12", "Cadência", "2s descida"],
            ["Russian twist com peso leve", "2", "30 reps", "-", "-"],
            ["Polichinelo rápido", "2", "30s", "-", "Finalização"]
        ],
        cardio: "Incluso nos blocos"
    },
    {
        dia: "DIA 4 – Superiores + Core",
        tecnica: "Bi-set + isometria abdominal",
        objetivo: "Tônus de parte superior com core ativo",
        exercicios: [
            ["Flexão declinada (pés elevados)", "3", "10", "Cadência", "3s descida"],
            ["Remada curvada unilateral", "3", "12 por lado", "-", "Controle na puxada"],
            ["Desenvolvimento militar alternado", "3", "15", "-", "Estabilidade de ombro"],
            ["Tríceps em cadeira + prancha frontal", "3", "15 + 20s", "Bi-set", "Core e braço juntos"],
            ["Rosca direta + prancha lateral", "3", "15 + 20s por lado", "Bi-set", "Bíceps e oblíquos"]
        ],
        cardio: "Caminhada leve ou subir escadas 10min"
    },
    {
        dia: "DIA 5 – Glúteo + Mini-avaliação + HIIT",
        tecnica: "Isolamento + explosão",
        objetivo: "Força de glúteo, simetria e finalização intensa",
        exercicios: [
            ["Elevação pélvica com pausa no topo", "3", "15", "Isometria", "Segurar 5s no topo"],
            ["Ponte unilateral isométrica", "3", "30s por perna", "-", "Avaliar simetria"],
            ["Agachamento corporal com hold", "3", "20", "Hold", "3s no fundo"],
            ["Skater jump", "3", "30s", "HIIT", "Explosão lateral"],
            ["Mountain climber + prancha dinâmica", "3", "30s cada", "HIIT", "Finalização"]
        ],
        cardio: "Finalizador HIIT incluso"
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
