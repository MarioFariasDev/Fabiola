const treinos = [
  // DIA 1
  {
    dia: "DIA 1 – Inferiores + Glúteo com Bi-set e Pausa Ativa",
    tecnica: "Bi-set e Pausa Ativa",
    objetivo: "Mais volume e ativação de glúteos",
    exercicios: [
      ["Agachamento búlgaro", "3", "12 por perna", "Bi-set", "Usar cadeira e halteres"],
      ["Ponte unilateral", "3", "15 por perna", "Bi-set", "Queima glúteo isolado"],
      ["Stiff com halteres", "4", "12", "Normal", "Alongar bem, foco posterior"],
      ["Abdução + isometria final", "3", "20 + 20s", "Drop-set", "Elástico nos joelhos"],
      ["Agachamento com salto", "3", "15", "Explosivo", "Finaliza com cardio neural"]
    ]
  },

  // DIA 2
  {
    dia: "DIA 2 – Superiores com foco em Resistência Muscular",
    tecnica: "Resistência Muscular",
    objetivo: "Melhorar resistência e postura",
    exercicios: [
      ["Flexão de braço", "4", "12", "Normal", "Pode usar apoio de joelhos"],
      ["Remada curvada com halteres", "4", "12", "Bi-set", "Alterna com desenvolvimento"],
      ["Desenvolvimento de ombro", "4", "15", "Bi-set", "Fortalece ombros/postura"],
      ["Tríceps banco", "4", "15", "-", "Fortalece braços"],
      ["Rosca direta com elástico", "3", "15", "-", "Bíceps ativo"]
    ]
  },

  // DIA 3
  {
    dia: "DIA 3 – CORE EXTREMO + HIIT CARDIO",
    tecnica: "Circuito dividido",
    objetivo: "Foco em fortalecimento abdominal e queima rápida",
    exercicios: [
      ["Circuito 1 – Prancha com elevação alternada de perna", "3", "30s", "Circuito", "-"],
      ["Circuito 1 – Abdominal infra com isometria", "3", "12 reps + 10s", "Circuito", "-"],
      ["Circuito 1 – Bicicleta no ar", "3", "30 reps", "Circuito", "-"],
      ["Circuito 1 – Elevação de perna + tesoura", "3", "20 reps", "Circuito", "-"],
      ["Circuito 2 – Jumping jack", "3", "30s", "Circuito", "-"],
      ["Circuito 2 – Agachamento com salto", "3", "15 reps", "Circuito", "-"],
      ["Circuito 2 – Burpee adaptado", "3", "10 reps", "Circuito", "-"],
      ["Circuito 2 – Abdominal remador", "3", "20 reps", "Circuito", "-"],
      ["Descanso entre rounds", "-", "45s", "-", "-"]
    ]
  },

  // DIA 4
  {
    dia: "DIA 4 – Inferiores com Ênfase em Glúteo + Isometria",
    tecnica: "Bi-set + Isometria",
    objetivo: "Potencializar glúteo e manter intensidade",
    exercicios: [
      ["Elevação pélvica com carga", "4", "20", "Isometria final 10s", "Sentir o glúteo queimar"],
      ["Afundo alternado com halteres", "4", "12 por perna", "Bi-set", "Alternar com agachamento"],
      ["Agachamento sumô + abdução", "3", "15 + 15", "Bi-set", "Com elástico"],
      ["Stiff unilateral (sem apoio)", "3", "10 por perna", "Equilíbrio", "Posterior e core ativos"],
      ["Ponte com 3 tempos (subida lenta)", "2", "12", "Cadência", "Controle máximo"]
    ]
  },

  // DIA 5
  {
    dia: "DIA 5 – Full Body em Circuito + Mobilidade",
    tecnica: "Circuito funcional",
    objetivo: "Encerrar com intensidade e recuperação ativa",
    exercicios: [
      ["Polichinelo", "4", "30s", "Circuito", "-"],
      ["Agachamento com halteres", "4", "15 reps", "Circuito", "-"],
      ["Flexão com ombros alternados", "4", "12 reps", "Circuito", "-"],
      ["Mountain climber", "4", "30s", "Circuito", "-"],
      ["Abdominal prancha dinâmica", "4", "30s", "Circuito", "-"]
    ]
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
