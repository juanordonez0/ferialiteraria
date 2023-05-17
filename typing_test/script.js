//TODOS LOS PÁRRAFOS
const paragraphs = [
    "El silencio es la música de la muerte y el murmullo de la vida.",
    "El amor es un camino que se hace al andar, un regalo que se da y se recibe, un fuego que se enciende y se aviva. Es el abrazo que nos une al ser amado y la canción que entona el corazón.",
    "El que no sabe esperar, no sabe vivir.",
    "La libertad es como el aire, nadie sabe lo que vale hasta que le falta.",
    "La belleza es un misterio que se guarda en el corazón del hombre.",
    "La justicia es la luz que alumbra el camino de los pueblos y la semilla que da fruto en el campo de la esperanza.",
    "La memoria es el tesoro de los recuerdos, el puente que une el pasado con el presente, la huella que deja la vida en el alma.",
    "La dignidad humana es un derecho inalienable que debe ser respetado por todos y para todos.",
    "La vida es un río que fluye hacia el mar de la eternidad. Es un camino que se abre paso entre los obstáculos, una aventura que se vive con pasión y entrega.",
    "La fe es la luz que ilumina el camino del espíritu, la roca que sostiene al creyente en los momentos difíciles, la fuente de la esperanza y la certeza de la vida eterna.",
];

const libro = [
    "- Miguel Ángel Asturias: El señor presidente (1946)",
    "- Miguel Ángel Asturias: El alhajadito (1961)",
    "- Miguel Ángel Asturias: Hombres de maíz (1949)",
    "- Miguel Ángel Asturias: Mulata de Tal (1963)",
    "- Miguel Ángel Asturias: El hombre que lo tenía todo todo todo (1973)",
    "- Miguel Ángel Asturias: Los ojos de los enterrados (1960)",
    "- Miguel Ángel Asturias: Viento fuerte (1949)",
    "- Miguel Ángel Asturias: El Señor Presidente (1946)",
    "- Miguel Ángel Asturias: Mulata de Tal (1963)",
    "- Miguel Ángel Asturias: Los ojos de los enterrados (1960)",
];

const quoteText = document.getElementById('quote');
const imgBook = document.getElementById('imgBook');
const typingText = document.querySelector(".typing-text p")
const inpField = document.querySelector(".wrapper .input-field")
const tryAgainBtn = document.querySelector(".content button")
const timeTag = document.querySelector(".time span b")
const mistakeTag = document.querySelector(".mistake span")
const wpmTag = document.querySelector(".wpm span")
const cpmTag = document.querySelector(".cpm span")

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = mistakes = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    quoteText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        console.log(char);
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    console.log(libro[ranIndex]);
    quoteText.innerHTML = libro[ranIndex];
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    mistakes--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                mistakes++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0: wpm;

        wpmTag.innerText = wpm;
        mistakeTag.innerText = mistakes;
        cpmTag.innerText = charIndex - mistakes;
    } else {
        clearInterval(timer);
        inpField.value = "";
        showQuote();
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - mistakes) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetGame() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = mistakes = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    mistakeTag.innerText = 0;
    cpmTag.innerText = 0;
    quoteText.style.opacity = 0;
    quoteText.style.position = "absolute";
}

function showQuote(){
    quoteText.style.opacity = 1;
    quoteText.style.position = "relative";
}

function showBook(){
    for(ranIndex = 0; ranIndex < libro.length; ranIndex++){
        console.log(libro[ranIndex]);
    }
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);