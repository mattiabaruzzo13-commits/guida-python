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
    { name: "print()", category: "Output", desc: "Mostra a schermo messaggi, variabili e risultati. E il comando base per capire cosa sta facendo il programma durante sviluppo e debug.", example: "print('Ciao mondo')" },
    { name: "input()", category: "Input", desc: "Legge quello che l'utente scrive da tastiera e lo salva come testo. Si usa per creare script interattivi e menu semplici.", example: "nome = input('Come ti chiami? ')" },
    { name: "len()", category: "Built-in", desc: "Ti dice quanti elementi ci sono in una stringa, lista o tupla. Utile per controlli rapidi prima di accedere a indici.", example: "len([10, 20, 30])" },
    { name: "type()", category: "Built-in", desc: "Mostra il tipo reale di un valore, per esempio int, str o list. Fondamentale quando un errore dipende da tipi sbagliati.", example: "type(3.14)" },
    { name: "int()", category: "Conversione", desc: "Converte un valore in numero intero quando possibile. Ti serve spesso per trasformare input testuali in numeri calcolabili.", example: "eta = int('25')" },
    { name: "float()", category: "Conversione", desc: "Converte un valore in numero decimale. Utile per prezzi, medie, percentuali e calcoli che non sono interi.", example: "prezzo = float('9.99')" },
    { name: "str()", category: "Conversione", desc: "Trasforma un valore in testo. Comodo quando devi concatenare numeri e stringhe in messaggi, log o output finali.", example: "testo = str(123)" },
    { name: "bool()", category: "Conversione", desc: "Converte un valore in True o False secondo le regole di Python. Aiuta a capire come verra letto dentro una condizione if.", example: "flag = bool(1)" },
    { name: "list()", category: "Strutture dati", desc: "Crea una lista o converte altre sequenze in lista modificabile. E una delle strutture dati piu usate in assoluto.", example: "list('abc')" },
    { name: "dict()", category: "Strutture dati", desc: "Crea un dizionario chiave-valore, ottimo per dati etichettati. Permette accesso rapido per nome, non per posizione.", example: "dict(nome='Luca', eta=20)" },
    { name: "set()", category: "Strutture dati", desc: "Crea un insieme senza duplicati e senza ordine fisso. Perfetto per ottenere valori unici e fare confronti tra collezioni.", example: "set([1, 1, 2, 3])" },
    { name: "tuple()", category: "Strutture dati", desc: "Crea una tupla, cioe una sequenza immutabile. Utile per dati che non devono cambiare, come coordinate o record fissi.", example: "tuple([1, 2, 3])" },
    { name: "range()", category: "Iterazione", desc: "Genera sequenze numeriche leggere per i cicli for. Ti evita di creare liste grandi solo per contare.", example: "range(0, 10, 2)" },
    { name: "enumerate()", category: "Iterazione", desc: "Scorre una sequenza restituendo indice e valore insieme. Cosi eviti contatori manuali e scrivi codice piu pulito.", example: "for i, v in enumerate(lista): ..." },
    { name: "zip()", category: "Iterazione", desc: "Unisce piu sequenze elemento per elemento. Ideale quando due liste rappresentano dati collegati da elaborare nello stesso ciclo.", example: "for a, b in zip(nomi, voti): ..." },
    { name: "sorted()", category: "Built-in", desc: "Restituisce una copia ordinata senza toccare i dati originali. Utile quando vuoi visualizzare ordinato ma conservare l'ordine iniziale.", example: "sorted([3, 1, 2])" },
    { name: "sum()", category: "Built-in", desc: "Somma rapidamente tutti i numeri di una sequenza. Molto usato per totali, medie e report statistici.", example: "sum([10, 20, 30])" },
    { name: "min()", category: "Built-in", desc: "Restituisce il valore minimo della sequenza. Comodo per trovare il piu piccolo tra prezzi, tempi o punteggi.", example: "min([4, 9, 1])" },
    { name: "max()", category: "Built-in", desc: "Restituisce il valore massimo della sequenza. Utile per trovare picchi, migliori risultati o limiti superiori.", example: "max([4, 9, 1])" },
    { name: "abs()", category: "Built-in", desc: "Restituisce il valore assoluto, cioe la distanza da zero senza segno. Molto utile in differenze e scarti.", example: "abs(-7)" },
    { name: "round()", category: "Built-in", desc: "Arrotonda numeri decimali a un numero specifico di cifre. Serve per output leggibili in finanza, statistiche e dashboard.", example: "round(3.14159, 2)" },
    { name: "open()", category: "File", desc: "Apre un file in lettura o scrittura e restituisce un oggetto file. E il punto di partenza per salvare o caricare dati.", example: "open('dati.txt', 'r', encoding='utf-8')" },
    { name: "read()", category: "File", desc: "Legge il contenuto di un file gia aperto. Comodo quando vuoi caricare tutto il testo in memoria e poi analizzarlo.", example: "contenuto = f.read()" },
    { name: "write()", category: "File", desc: "Scrive testo dentro un file aperto in scrittura o append. Utile per log, esportazioni e report automatici.", example: "f.write('Nuova riga\\n')" },
    { name: "with", category: "File", desc: "Gestisce apertura e chiusura automatica delle risorse, anche se avvengono errori. E la forma consigliata per lavorare con i file.", example: "with open('x.txt') as f: ..." },
    { name: "if / elif / else", category: "Controllo flusso", desc: "Permette decisioni nel codice in base a condizioni vere o false. E la base della logica di business di qualunque programma.", example: "if eta >= 18: ..." },
    { name: "for", category: "Controllo flusso", desc: "Ripete un blocco per ogni elemento di una sequenza. E il ciclo piu comune quando hai una lista di dati da elaborare.", example: "for n in numeri: ..." },
    { name: "while", category: "Controllo flusso", desc: "Ripete un blocco finche la condizione resta vera. Utile quando non sai in anticipo quante iterazioni serviranno.", example: "while tentativi < 3: ..." },
    { name: "break", category: "Controllo flusso", desc: "Interrompe subito il ciclo corrente. Lo usi quando hai gia trovato la risposta e vuoi evitare lavoro inutile.", example: "if trovato: break" },
    { name: "continue", category: "Controllo flusso", desc: "Salta il resto dell'iterazione attuale e passa alla successiva. Utile per ignorare casi non validi dentro un ciclo.", example: "if n < 0: continue" },
    { name: "def", category: "Funzioni", desc: "Definisce una funzione riutilizzabile con parametri e logica separata. Ti aiuta a organizzare il codice in blocchi chiari.", example: "def saluta(nome): return f'Ciao {nome}'" },
    { name: "return", category: "Funzioni", desc: "Restituisce un valore dalla funzione al punto in cui e stata chiamata. Permette di comporre funzioni in catena.", example: "return totale" },
    { name: "import", category: "Moduli", desc: "Importa un modulo per usare codice gia pronto della libreria standard o di pacchetti esterni. Riduce tempo e bug.", example: "import math" },
    { name: "from ... import ...", category: "Moduli", desc: "Importa direttamente funzioni o classi specifiche da un modulo. Rende il codice piu corto quando usi sempre gli stessi elementi.", example: "from datetime import datetime" },
    { name: "try / except", category: "Error handling", desc: "Gestisce errori previsti senza bloccare l'intero programma. Indispensabile con input utente, rete, file mancanti e conversioni.", example: "try: x = int(v) except ValueError: ..." },
    { name: "raise", category: "Error handling", desc: "Lancia manualmente un errore quando una regola non viene rispettata. Utile per validazioni chiare e debug piu semplice.", example: "raise ValueError('Valore non valido')" },
    { name: "class", category: "OOP", desc: "Definisce una classe per modellare oggetti con attributi e metodi. Utile quando il progetto cresce e serve una struttura piu solida.", example: "class Utente: ..." },
    { name: "lambda", category: "Funzioni", desc: "Crea una funzione anonima breve in una sola riga. Perfetta per operazioni veloci passate a sorted, map o filter.", example: "lambda x: x * 2" },
    { name: "map()", category: "Built-in", desc: "Applica la stessa funzione a tutti gli elementi di una sequenza. Utile per trasformazioni ripetitive in modo conciso.", example: "list(map(str, [1, 2, 3]))" },
    { name: "filter()", category: "Built-in", desc: "Filtra una sequenza mantenendo solo gli elementi che rispettano una condizione. Ottimo per pulizia dati e selezioni rapide.", example: "list(filter(lambda x: x > 0, numeri))" },
    { name: "list.append()", category: "Liste", desc: "Aggiunge un elemento alla fine di una lista esistente. E il metodo standard per costruire liste durante iterazioni.", example: "nomi.append('Anna')" },
    { name: "dict.get()", category: "Dizionari", desc: "Legge una chiave senza errore se manca e permette un valore di default. Essenziale quando i dati possono essere incompleti.", example: "eta = utente.get('eta', 0)" },
    { name: "str.split()", category: "Stringhe", desc: "Divide una stringa in parti usando un separatore. Molto utile per parsing di input, CSV semplici e testo strutturato.", example: "'a,b,c'.split(',')" },
    { name: "\"sep\".join()", category: "Stringhe", desc: "Unisce una lista di stringhe usando un separatore specifico. E il metodo piu efficiente per costruire frasi da piu pezzi.", example: "' - '.join(['A', 'B', 'C'])" },
    { name: "str.replace()", category: "Stringhe", desc: "Sostituisce una porzione di testo con un'altra e restituisce una nuova stringa. Utile per pulire e normalizzare dati testuali.", example: "'ciao mondo'.replace('mondo', 'Python')" },
    { name: "python --version", category: "Terminale", desc: "Mostra quale versione di Python stai usando in quel terminale. Primo controllo quando hai differenze tra ambienti o errori strani.", example: "python --version" },
    { name: "python script.py", category: "Terminale", desc: "Esegue un file Python dal terminale corrente. E il comando base per lanciare script e verificare output o traceback.", example: "python main.py" },
    { name: "python -m venv .venv", category: "Terminale", desc: "Crea un ambiente virtuale isolato nella cartella progetto. Ti permette di separare dipendenze tra progetti diversi.", example: "python -m venv .venv" },
    { name: ".venv\\Scripts\\Activate.ps1", category: "Terminale", desc: "Attiva l'ambiente virtuale in PowerShell e usa python/pip locali. Va fatto prima di installare librerie del progetto.", example: ".venv\\Scripts\\Activate.ps1" },
    { name: "python -m pip install <pacchetto>", category: "Terminale", desc: "Installa una libreria nel Python attivo, preferibilmente nel venv. Comando essenziale per aggiungere dipendenze esterne.", example: "python -m pip install requests" }
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
