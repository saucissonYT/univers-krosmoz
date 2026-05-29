/*
  Site développé par phomsay pour zaki.
  Contact Discord : @phomsay671.
  Dev web : phomsay. Admin : sauci.
  Recherche et édition : Zaki & B.
*/



(async function () {
  const parseCsv = (text) => {
    const rows = [];
    let row = [];
    let value = "";
    let quoted = false;

    for (let index = 0; index < text.length; index += 1) {
      const char = text[index];
      const next = text[index + 1];

      if (quoted) {
        if (char === '"' && next === '"') {
          value += '"';
          index += 1;
        } else if (char === '"') {
          quoted = false;
        } else {
          value += char;
        }
        continue;
      }

      if (char === '"') {
        quoted = true;
      } else if (char === ",") {
        row.push(value);
        value = "";
      } else if (char === "\n") {
        row.push(value);
        rows.push(row);
        row = [];
        value = "";
      } else if (char !== "\r") {
        value += char;
      }
    }

    if (value || row.length) {
      row.push(value);
      rows.push(row);
    }

    return rows.filter((item) => item.some((cell) => cell.trim() !== ""));
  };

  const questionsFromCsv = (text) => {
    const rows = parseCsv(text);
    const headers = (rows[0] || []).map((header, index) => (
      index === 0 ? header.replace(/^\uFEFF/, "") : header
    ));
    const correctLetters = ["A", "B", "C", "D"];

    return rows.slice(1).map((row) => {
      const record = {};
      headers.forEach((header, index) => {
        record[header] = row[index] || "";
      });

      return {
        id: record.id.trim(),
        category: record.category.trim(),
        difficulty: record.difficulty.trim(),
        question: record.question.trim(),
        answers: [
          record.answer_a.trim(),
          record.answer_b.trim(),
          record.answer_c.trim(),
          record.answer_d.trim()
        ],
        correct: correctLetters.indexOf(record.correct_answer.trim().toUpperCase()),
        explanation: record.explanation.trim(),
        source: record.source.trim()
      };
    }).filter((question) => (
      question.id &&
      question.category &&
      question.difficulty &&
      question.question &&
      question.answers.every(Boolean) &&
      question.correct >= 0
    ));
  };

  const loadQuestions = async () => {
    const response = await fetch(`../../data/games/krosmoz-quiz.csv?v=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) {
      throw new Error("CSV introuvable");
    }
    return questionsFromCsv(await response.text());
  };

  const forbiddenQuestionText = /\b(site|page|navigation|menu|section|support|allskreen|launcher|france\.tv)\b/i;
  let loadedQuestions = [];
  try {
    loadedQuestions = await loadQuestions();
  } catch {
    loadedQuestions = [];
  }

  const questions = loadedQuestions
    .filter((question) => question.category !== "Medias")
    .filter((question) => !forbiddenQuestionText.test(`${question.question} ${question.explanation}`));
  const categories = [...new Set(questions.map((question) => question.category))].sort((a, b) => a.localeCompare(b, "fr"));

  const setup = document.querySelector("[data-quiz-setup]");
  const form = document.querySelector("[data-quiz-form]");
  const selectionSummary = document.querySelector("[data-selection-summary]");
  const categoryOptions = document.querySelector("[data-category-options]");
  const bankCount = document.querySelector("[data-bank-count]");
  const play = document.querySelector("[data-quiz-play]");
  const result = document.querySelector("[data-quiz-result]");
  const questionMeta = document.querySelector("[data-question-meta]");
  const questionTitle = document.querySelector("[data-question-title]");
  const answerList = document.querySelector("[data-answer-list]");
  const scorePill = document.querySelector("[data-score-pill]");
  const progressBar = document.querySelector("[data-progress-bar]");
  const feedback = document.querySelector("[data-feedback]");
  const feedbackTitle = document.querySelector("[data-feedback-title]");
  const feedbackText = document.querySelector("[data-feedback-text]");
  const nextButton = document.querySelector("[data-next-question]");
  const stopButton = document.querySelector("[data-stop-quiz]");
  const replayButton = document.querySelector("[data-replay-quiz]");
  const returnSetupButton = document.querySelector("[data-return-quiz-setup]");
  const closeQuizResultButtons = document.querySelectorAll("[data-close-quiz-result]");
  const resultTitle = document.querySelector("[data-result-title]");
  const resultCopy = document.querySelector("[data-result-copy]");
  const resultScore = document.querySelector("[data-result-score]");
  const resultBreakdown = document.querySelector("[data-result-breakdown]");
  const openResultCardButton = document.querySelector("[data-open-result-card]");
  const resultModal = document.querySelector("[data-result-modal]");
  const closeResultCardButtons = document.querySelectorAll("[data-close-result-card]");
  const cardTitle = document.querySelector("[data-card-title]");
  const cardScore = document.querySelector("[data-card-score]");
  const cardCopy = document.querySelector("[data-card-copy]");
  const cardStatus = document.querySelector("[data-card-status]");
  const copyResultButton = document.querySelector("[data-copy-result]");
  const downloadResultButton = document.querySelector("[data-download-result]");

  let quiz = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let breakdown = {};
  let finalResult = null;
  let lastFocusedElement = null;

  const shuffle = (items) => {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const swapIndex = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
    }
    return copy;
  };

  const normalizeKey = (value) => String(value || "")
    .trim()
    .replace(/[’']/g, "'")
    .replace(/^(l'|la |le |les |des |du |de l')/i, "")
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("fr");

  const questionKey = (question) => normalizeKey(question.question);

  const conceptKey = (question) => {
    const correctAnswer = question.answers[question.correct];
    const sourceGroup = String(question.source || "")
      .replace(/[?#].*$/, "")
      .split("/")
      .pop()
      .replace(/\.[a-z0-9]+$/i, "");

    if (question.category === "Chronologie") {
      return `${question.category}:${normalizeKey(correctAnswer)}:${sourceGroup || questionKey(question)}`;
    }

    return `${question.category}:${normalizeKey(correctAnswer)}`;
  };

  const uniqueQuestions = (items) => {
    const seenQuestions = new Set();
    const seenConcepts = new Set();
    return items.filter((question) => {
      const key = questionKey(question);
      const concept = conceptKey(question);
      if (seenQuestions.has(key) || seenConcepts.has(concept)) return false;
      seenQuestions.add(key);
      seenConcepts.add(concept);
      return true;
    });
  };

  const show = (element, visible) => {
    if (element) element.hidden = !visible;
  };

  const openQuizResult = () => {
    if (!result) return;
    lastFocusedElement = document.activeElement;
    show(result, true);
    document.body.classList.add("is-quiz-result-open");
    const closeButton = result.querySelector(".quiz-result-close");
    if (closeButton) closeButton.focus();
  };

  const closeQuizResult = ({ restoreFocus = true } = {}) => {
    if (!result) return;
    show(result, false);
    document.body.classList.remove("is-quiz-result-open");
    if (restoreFocus && lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  };

  const returnToSetup = () => {
    closeQuizResult({ restoreFocus: false });
    show(play, false);
    show(setup, true);
    updateBankCount();
    const launchButton = form ? form.querySelector('button[type="submit"]') : null;
    if (launchButton) launchButton.focus();
  };

  const selectedDifficulty = () => new FormData(form).get("difficulty") || "all";
  const selectedCategories = () => [...form.querySelectorAll('input[name="category"]:checked')].map((input) => input.value);
  const difficultyLabels = {
    all: "Difficulté mélangée",
    facile: "Difficulté facile",
    moyen: "Difficulté moyenne",
    difficile: "Difficulté difficile"
  };

  const getSelectionDetails = () => {
    const data = new FormData(form);
    const questionCount = Number(data.get("questionCount")) || 10;
    const difficulty = selectedDifficulty();
    const activeCategories = selectedCategories();
    const themeText = activeCategories.length === 0 || activeCategories.length === categories.length
      ? "Tous les thèmes"
      : `${activeCategories.length} thème${activeCategories.length > 1 ? "s" : ""}`;
    return {
      questionCount,
      difficultyText: difficultyLabels[difficulty] || difficultyLabels.all,
      themeText
    };
  };

  const formatSelectionSummary = () => {
    const details = getSelectionDetails();
    return `${details.questionCount} questions - ${details.difficultyText} - ${details.themeText}`;
  };

  const updateSelectionSummary = () => {
    if (!selectionSummary) return;
    const details = getSelectionDetails();
    selectionSummary.replaceChildren();
    [
      ["Questions", `${details.questionCount}`],
      ["Difficulté", details.difficultyText.replace("Difficulté ", "")],
      ["Thèmes", details.themeText]
    ].forEach(([label, value], index) => {
      const chip = document.createElement("div");
      chip.className = `selection-chip${index === 1 ? " is-difficulty" : ""}`;
      chip.innerHTML = "<span></span><strong></strong>";
      chip.querySelector("span").textContent = label;
      chip.querySelector("strong").textContent = value;
      selectionSummary.append(chip);
    });
  };

  const filteredQuestions = () => {
    const difficulty = selectedDifficulty();
    const activeCategories = selectedCategories();
    return uniqueQuestions(questions.filter((question) => {
      const matchesDifficulty = difficulty === "all" || question.difficulty === difficulty;
      const matchesCategory = activeCategories.length === 0 || activeCategories.includes(question.category);
      return matchesDifficulty && matchesCategory;
    }));
  };

  const updateBankCount = () => {
    const count = filteredQuestions().length;
    bankCount.textContent = count > 1
      ? `${count} questions disponibles avec ces filtres.`
      : `${count} question disponible avec ces filtres.`;
    updateSelectionSummary();
  };

  const createCategoryControls = () => {
    categoryOptions.replaceChildren();
    categories.forEach((category) => {
      const label = document.createElement("label");
      label.className = "category-toggle";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.name = "category";
      input.value = category;
      input.checked = true;

      const span = document.createElement("span");
      span.textContent = category;

      label.append(input, span);
      categoryOptions.append(label);
    });
  };

  const prepareQuestion = (question) => ({
    ...question,
    shuffledAnswers: shuffle(question.answers.map((answer, index) => ({
      text: answer,
      correct: index === question.correct
    })))
  });

  const startQuiz = () => {
    const data = new FormData(form);
    const requestedCount = Number(data.get("questionCount")) || 10;
    const pool = filteredQuestions();

    if (!pool.length) {
      bankCount.textContent = "Aucune question ne correspond à ces filtres.";
      return;
    }

    quiz = shuffle(pool).slice(0, Math.min(requestedCount, pool.length)).map(prepareQuestion);
    currentIndex = 0;
    score = 0;
    answered = false;
    breakdown = {};
    quiz.forEach((question) => {
      breakdown[question.category] = { correct: 0, total: 0 };
    });

    show(setup, false);
    closeQuizResult();
    show(play, true);
    renderQuestion();
  };

  const renderQuestion = () => {
    const question = quiz[currentIndex];
    answered = false;

    questionMeta.textContent = `Question ${currentIndex + 1} / ${quiz.length} - ${question.category} - ${question.difficulty}`;
    questionTitle.textContent = question.question;
    scorePill.textContent = `${score} / ${currentIndex}`;
    progressBar.style.width = `${(currentIndex / quiz.length) * 100}%`;
    nextButton.disabled = true;
    nextButton.textContent = currentIndex === quiz.length - 1 ? "Voir le résultat" : "Question suivante";
    feedback.hidden = true;
    feedbackTitle.textContent = "";
    feedbackText.textContent = "";
    answerList.replaceChildren();

    question.shuffledAnswers.forEach((answer, index) => {
      const button = document.createElement("button");
      button.className = "answer-option";
      button.type = "button";
      button.dataset.correct = String(answer.correct);
      button.innerHTML = `<span>${String.fromCharCode(65 + index)}</span><strong></strong>`;
      button.querySelector("strong").textContent = answer.text;
      button.addEventListener("click", () => selectAnswer(button, answer.correct));
      answerList.append(button);
    });
  };

  const selectAnswer = (button, isCorrect) => {
    if (answered) return;
    answered = true;

    const question = quiz[currentIndex];
    breakdown[question.category].total += 1;

    if (isCorrect) {
      score += 1;
      breakdown[question.category].correct += 1;
    }

    [...answerList.querySelectorAll("button")].forEach((answerButton) => {
      answerButton.disabled = true;
      const correct = answerButton.dataset.correct === "true";
      answerButton.classList.toggle("is-correct", correct);
      answerButton.classList.toggle("is-wrong", answerButton === button && !correct);
    });

    scorePill.textContent = `${score} / ${currentIndex + 1}`;
    progressBar.style.width = `${((currentIndex + 1) / quiz.length) * 100}%`;
    feedback.hidden = false;
    feedbackTitle.textContent = isCorrect ? "Bonne réponse" : "Pas cette fois";
    feedbackText.textContent = question.explanation;

    nextButton.disabled = false;
  };

  const renderResult = () => {
    const percent = Math.round((score / quiz.length) * 100);
    const title = percent >= 85
      ? "Gardien du savoir"
      : percent >= 60
        ? "Aventurier bien renseigné"
        : percent >= 35
          ? "Explorateur en apprentissage"
          : "Nouvelle âme incarnée";

    resultTitle.textContent = title;
    finalResult = {
      title,
      percent,
      score,
      total: quiz.length,
      copy: "",
      difficulty: difficultyLabels[selectedDifficulty()] || difficultyLabels.all,
      selection: formatSelectionSummary()
    };
    resultCopy.textContent = percent >= 85
      ? "Vous naviguez dans le Krosmoz avec une très belle maîtrise."
      : percent >= 60
        ? "Vous avez déjà de solides repères, avec quelques zones à revisiter."
        : percent >= 35
          ? "Les bases sont là, et quelques grands repères du Krosmoz restent à consolider."
          : "Le Krosmoz est vaste, c'est une bonne excuse pour reprendre l'aventure depuis ses origines.";
    resultScore.textContent = `${score} bonnes réponses sur ${quiz.length} - ${percent}% - ${finalResult.difficulty}`;
    finalResult.copy = resultCopy.textContent;
    renderResultCard();

    resultBreakdown.replaceChildren();
    Object.entries(breakdown).forEach(([category, item]) => {
      const row = document.createElement("p");
      row.innerHTML = `<span>${category}</span><strong>${item.correct} / ${item.total}</strong>`;
      resultBreakdown.append(row);
    });

    openQuizResult();
  };

  const nextQuestion = () => {
    if (currentIndex >= quiz.length - 1) {
      renderResult();
      return;
    }

    currentIndex += 1;
    renderQuestion();
  };

  const stopQuiz = () => {
    show(play, false);
    closeQuizResult();
    show(setup, true);
    updateBankCount();
  };

  const renderResultCard = () => {
    if (!finalResult || !cardTitle || !cardScore || !cardCopy) return;
    cardTitle.textContent = finalResult.title;
    cardScore.textContent = `${finalResult.score} / ${finalResult.total} - ${finalResult.percent}% - ${finalResult.difficulty}`;
    cardCopy.textContent = finalResult.selection;
  };

  const openResultCard = () => {
    renderResultCard();
    if (resultModal) resultModal.hidden = false;
  };

  const closeResultCard = () => {
    if (resultModal) resultModal.hidden = true;
  };

  const copyResult = async () => {
    if (!finalResult) return;
    const text = `Quiz ultime d'Écaflip - ${finalResult.score}/${finalResult.total} - ${finalResult.title} - ${finalResult.difficulty}`;
    try {
      await navigator.clipboard.writeText(text);
      cardStatus.textContent = "Résultat copié.";
    } catch {
      cardStatus.textContent = text;
    }
  };

  const downloadResult = () => {
    if (!finalResult) return;
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 675;
    const ctx = canvas.getContext("2d");
    const image = new Image();
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(5, 6, 12, 0.62)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(232, 201, 122, 0.72)";
      ctx.lineWidth = 4;
      ctx.strokeRect(54, 54, canvas.width - 108, canvas.height - 108);
      ctx.textAlign = "center";
      ctx.fillStyle = "#e8c97a";
      ctx.font = "700 30px Cinzel, serif";
      ctx.fillText("QUIZ ULTIME D'ÉCAFLIP", canvas.width / 2, 150);
      ctx.fillStyle = "#fff7df";
      ctx.font = "700 76px Cinzel, serif";
      ctx.fillText(finalResult.title.toUpperCase(), canvas.width / 2, 300);
      ctx.fillStyle = "#e8c97a";
      ctx.font = "700 42px Cinzel, serif";
      ctx.fillText(`${finalResult.score} / ${finalResult.total} - ${finalResult.percent}%`, canvas.width / 2, 380);
      ctx.fillStyle = "#f3ead9";
      ctx.font = "32px Georgia, serif";
      ctx.fillText(finalResult.difficulty.toUpperCase(), canvas.width / 2, 470);
      ctx.fillText(finalResult.selection.slice(0, 72), canvas.width / 2, 520);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "quiz-krosmoz-resultat.png";
      link.click();
    };
    image.src = "../../assets/jeux/quizz.webp";
  };

  if (!questions.length) {
    bankCount.textContent = "La base de questions n'a pas pu être chargée.";
    return;
  }

  createCategoryControls();
  updateBankCount();

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    startQuiz();
  });

  form.addEventListener("change", updateBankCount);
  nextButton.addEventListener("click", nextQuestion);
  stopButton.addEventListener("click", stopQuiz);
  replayButton.addEventListener("click", () => {
    returnToSetup();
  });
  if (returnSetupButton) returnSetupButton.addEventListener("click", returnToSetup);
  closeQuizResultButtons.forEach((button) => button.addEventListener("click", closeQuizResult));
  if (openResultCardButton) openResultCardButton.addEventListener("click", openResultCard);
  closeResultCardButtons.forEach((button) => button.addEventListener("click", closeResultCard));
  if (copyResultButton) copyResultButton.addEventListener("click", copyResult);
  if (downloadResultButton) downloadResultButton.addEventListener("click", downloadResult);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (resultModal && !resultModal.hidden) {
        closeResultCard();
        return;
      }
      closeQuizResult();
    }
  });
}());
