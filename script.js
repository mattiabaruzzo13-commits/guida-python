(function () {
  const progressBar = document.getElementById("scrollProgressBar");
  const revealItems = document.querySelectorAll(".reveal");
  const checkboxes = document.querySelectorAll("input[data-check]");
  const resetBtn = document.getElementById("resetChecklist");
  const copyButtons = document.querySelectorAll(".copy-btn");
  const commandListEl = document.getElementById("commandList");
  const commandSearchEl = document.getElementById("commandSearch");
  const commandCounterEl = document.getElementById("commandCounter");

  const COMMANDS = [
    { name: "print()", category: "Output", desc: "Mostra testo o valori nel terminale.", example: "print('Ciao mondo')" },
    { name: "input()", category: "Input", desc: "Legge un valore inserito dall'utente.", example: "nome = input('Come ti chiami? ')" },
    { name: "len()", category: "Built-in", desc: "Restituisce la lunghezza di una sequenza.", example: "len([10, 20, 30])" },
    { name: "type()", category: "Built-in", desc: "Mostra il tipo di un oggetto.", example: "type(3.14)" },
    { name: "int()", category: "Conversione", desc: "Converte un valore in intero.", example: "eta = int('25')" },
    { name: "float()", category: "Conversione", desc: "Converte un valore in numero decimale.", example: "prezzo = float('9.99')" },
    { name: "str()", category: "Conversione", desc: "Converte un valore in stringa.", example: "testo = str(123)" },
    { name: "bool()", category: "Conversione", desc: "Converte un valore in booleano.", example: "flag = bool(1)" },
    { name: "list()", category: "Strutture dati", desc: "Crea o converte in lista.", example: "list('abc')" },
    { name: "dict()", category: "Strutture dati", desc: "Crea o converte in dizionario.", example: "dict(nome='Luca', eta=20)" },
    { name: "set()", category: "Strutture dati", desc: "Crea un insieme senza duplicati.", example: "set([1, 1, 2, 3])" },
    { name: "tuple()", category: "Strutture dati", desc: "Crea una tupla immutabile.", example: "tuple([1, 2, 3])" },
    { name: "range()", category: "Iterazione", desc: "Genera sequenze numeriche per i cicli.", example: "range(0, 10, 2)" },
    { name: "enumerate()", category: "Iterazione", desc: "Itera con indice + valore.", example: "for i, v in enumerate(lista): ..." },
    { name: "zip()", category: "Iterazione", desc: "Combina più sequenze elemento per elemento.", example: "for a, b in zip(nomi, voti): ..." },
    { name: "sorted()", category: "Built-in", desc: "Restituisce una copia ordinata.", example: "sorted([3, 1, 2])" },
    { name: "sum()", category: "Built-in", desc: "Somma valori numerici.", example: "sum([10, 20, 30])" },
    { name: "min()", category: "Built-in", desc: "Restituisce il valore minimo.", example: "min([4, 9, 1])" },
    { name: "max()", category: "Built-in", desc: "Restituisce il valore massimo.", example: "max([4, 9, 1])" },
    { name: "abs()", category: "Built-in", desc: "Restituisce il valore assoluto.", example: "abs(-7)" },
    { name: "round()", category: "Built-in", desc: "Arrotonda numeri decimali.", example: "round(3.14159, 2)" },
    { name: "open()", category: "File", desc: "Apre un file in lettura/scrittura.", example: "open('dati.txt', 'r', encoding='utf-8')" },
    { name: "read()", category: "File", desc: "Legge contenuto da un file aperto.", example: "contenuto = f.read()" },
    { name: "write()", category: "File", desc: "Scrive testo in un file aperto.", example: "f.write('Nuova riga\\n')" },
    { name: "with", category: "File", desc: "Gestisce risorse e chiusura automatica file.", example: "with open('x.txt') as f: ..." },
    { name: "if / elif / else", category: "Controllo flusso", desc: "Esegue blocchi in base a condizioni.", example: "if eta >= 18: ..." },
    { name: "for", category: "Controllo flusso", desc: "Ciclo su sequenze o range.", example: "for n in numeri: ..." },
    { name: "while", category: "Controllo flusso", desc: "Ciclo finché una condizione è vera.", example: "while tentativi < 3: ..." },
    { name: "break", category: "Controllo flusso", desc: "Interrompe subito un ciclo.", example: "if trovato: break" },
    { name: "continue", category: "Controllo flusso", desc: "Salta all'iterazione successiva.", example: "if n < 0: continue" },
    { name: "def", category: "Funzioni", desc: "Definisce una funzione.", example: "def saluta(nome): return f'Ciao {nome}'" },
    { name: "return", category: "Funzioni", desc: "Restituisce un valore da funzione.", example: "return totale" },
    { name: "import", category: "Moduli", desc: "Importa un modulo Python.", example: "import math" },
    { name: "from ... import ...", category: "Moduli", desc: "Importa simboli specifici da un modulo.", example: "from datetime import datetime" },
    { name: "try / except", category: "Error handling", desc: "Gestisce eccezioni senza bloccare il programma.", example: "try: x = int(v) except ValueError: ..." },
    { name: "raise", category: "Error handling", desc: "Genera manualmente un'eccezione.", example: "raise ValueError('Valore non valido')" },
    { name: "class", category: "OOP", desc: "Definisce una classe.", example: "class Utente: ..." },
    { name: "lambda", category: "Funzioni", desc: "Crea funzioni anonime brevi.", example: "lambda x: x * 2" },
    { name: "map()", category: "Built-in", desc: "Applica una funzione a ogni elemento.", example: "list(map(str, [1, 2, 3]))" },
    { name: "filter()", category: "Built-in", desc: "Filtra elementi in base a una condizione.", example: "list(filter(lambda x: x > 0, numeri))" },
    { name: "list.append()", category: "Liste", desc: "Aggiunge un elemento in coda alla lista.", example: "nomi.append('Anna')" },
    { name: "dict.get()", category: "Dizionari", desc: "Legge una chiave senza errore se manca.", example: "eta = utente.get('eta', 0)" },
    { name: "str.split()", category: "Stringhe", desc: "Divide una stringa in lista.", example: "'a,b,c'.split(',')" },
    { name: "\"sep\".join()", category: "Stringhe", desc: "Unisce una lista di stringhe.", example: "' - '.join(['A', 'B', 'C'])" },
    { name: "str.replace()", category: "Stringhe", desc: "Sostituisce testo in una stringa.", example: "'ciao mondo'.replace('mondo', 'Python')" },
    { name: "python --version", category: "Terminale", desc: "Mostra versione Python installata.", example: "python --version" },
    { name: "python script.py", category: "Terminale", desc: "Esegue un file Python.", example: "python main.py" },
    { name: "python -m venv .venv", category: "Terminale", desc: "Crea ambiente virtuale locale.", example: "python -m venv .venv" },
    { name: ".venv\\Scripts\\Activate.ps1", category: "Terminale", desc: "Attiva virtual env in PowerShell.", example: ".venv\\Scripts\\Activate.ps1" },
    { name: "python -m pip install <pacchetto>", category: "Terminale", desc: "Installa una libreria con pip.", example: "python -m pip install requests" }
  ];

  function updateScrollProgress() {
    const top = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const progress = height > 0 ? (top / height) * 100 : 0;
    progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
  }

  function revealOnScroll() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealItems.forEach((item, index) => {
      item.style.transitionDelay = `${Math.min(index * 40, 360)}ms`;
      observer.observe(item);
    });
  }

  function loadChecklist() {
    checkboxes.forEach((checkbox) => {
      const key = checkbox.getAttribute("data-check");
      const saved = localStorage.getItem(`python-guide-${key}`);
      checkbox.checked = saved === "1";

      checkbox.addEventListener("change", () => {
        localStorage.setItem(`python-guide-${key}`, checkbox.checked ? "1" : "0");
      });
    });
  }

  function resetChecklist() {
    checkboxes.forEach((checkbox) => {
      const key = checkbox.getAttribute("data-check");
      checkbox.checked = false;
      localStorage.removeItem(`python-guide-${key}`);
    });
  }

  async function copyFromTarget(targetId, btn) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const rawText = target.textContent || "";
    try {
      await navigator.clipboard.writeText(rawText.trim());
      const previous = btn.textContent;
      btn.textContent = "Copiato";
      setTimeout(() => {
        btn.textContent = previous;
      }, 1400);
    } catch (err) {
      btn.textContent = "Errore";
      setTimeout(() => {
        btn.textContent = "Copia";
      }, 1400);
    }
  }

  function createCommandCard(command) {
    const card = document.createElement("article");
    card.className = "command-card";

    const top = document.createElement("div");
    top.className = "command-top";

    const title = document.createElement("h3");
    title.className = "command-name";
    title.textContent = command.name;

    const tag = document.createElement("span");
    tag.className = "command-tag";
    tag.textContent = command.category;

    top.appendChild(title);
    top.appendChild(tag);

    const desc = document.createElement("p");
    desc.className = "command-desc";
    desc.textContent = command.desc;

    const example = document.createElement("pre");
    example.className = "command-example";
    const code = document.createElement("code");
    code.textContent = command.example;
    example.appendChild(code);

    card.appendChild(top);
    card.appendChild(desc);
    card.appendChild(example);
    return card;
  }

  function renderCommands(queryText) {
    if (!commandListEl || !commandCounterEl) return;
    const q = (queryText || "").trim().toLowerCase();
    const filtered = COMMANDS.filter((item) =>
      `${item.name} ${item.category} ${item.desc} ${item.example}`.toLowerCase().includes(q)
    );

    commandListEl.innerHTML = "";
    if (!filtered.length) {
      const empty = document.createElement("article");
      empty.className = "command-card";
      empty.innerHTML = "<p class='command-desc'>Nessun comando trovato con questa ricerca.</p>";
      commandListEl.appendChild(empty);
    } else {
      filtered.forEach((item) => commandListEl.appendChild(createCommandCard(item)));
    }

    commandCounterEl.textContent = `${filtered.length} / ${COMMANDS.length} comandi`;
  }

  copyButtons.forEach((button) => {
    const targetId = button.getAttribute("data-copy-target");
    button.addEventListener("click", () => copyFromTarget(targetId, button));
  });

  if (commandSearchEl) {
    commandSearchEl.addEventListener("input", (event) => {
      renderCommands(event.target.value);
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", resetChecklist);
  }

  renderCommands("");
  revealOnScroll();
  loadChecklist();
  updateScrollProgress();
  window.addEventListener("scroll", updateScrollProgress, { passive: true });
})();
