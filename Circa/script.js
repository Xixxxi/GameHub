let players = [];
let currentPlayer = 0;
let currentQuestion = 0;
let answers = [];

let questions = [
// Allgemeines
// + Rekorde 
// 
    { question: 'Wie viele Buchstaben hat das deutsche Alphabet?', answer: 26, category: 'allgemeines' },
    { question: 'Wie viele Monate haben 28 Tage?', answer: 12, category: 'allgemeines' },
    { question: 'Wie viele Farben hat ein Regenbogen?', answer: 7, category: 'allgemeines' },
    { question: 'Wie viele Tasten hat ein klassisches Klavier?', answer: 88, category: 'allgemeines' },
    { question: 'Wie viele Tasten hat eine Standardcomputer-Tastatur?', answer: 104, category: 'allgemeines' },
    { question: 'Wie viele Tage würde es dauern, bis man alle Folgen von "Die Simpsons" gesehen hat (Stand 2021)?', answer: 13, category: 'allgemeines' },
    { question: 'Wie viele Liter Bier werden durchschnittlich pro Kopf in Deutschland pro Jahr getrunken?', answer: 101, category: 'allgemeines' },
    { question: 'Wie viele Worte spricht ein Mensch durchschnittlich an einem Tag?', answer: 7000, category: 'allgemeines' },
    { question: 'Wie viele Kalorien verbrennt man durchschnittlich beim Lachen (angenommen, man lacht 10 Minuten am Tag)?', answer: 40, category: 'allgemeines' },
    { question: 'Wie viele Tassen Kaffee werden weltweit täglich getrunken (in Milliarden)?', answer: 2.25, category: 'allgemeines' },
    { question: 'Wie viele Heißluftballone würden theoretisch benötigt, um das Gewicht eines Blauwals (angenommen, ein Wal wiegt 136 Tonnen) in die Luft zu heben?', answer: 1320, category: 'allgemeines' },
    { question: 'Wenn man alle in einem Jahr in Deutschland verzehrten Bratwürste aneinanderlegen würde, wie viele Erdumrundungen könnte man damit machen?', answer: 3, category: 'allgemeines' },
    { question: 'Wie viele Brücken gibt es in Amsterdam?', answer: 1281, category: 'allgemeines' },
    { question: 'Wie viele Treppenstufen hat der Eiffelturm?', answer: 1665, category: 'allgemeines' },
    { question: 'Wenn du 10 brennende Kerzen hast und du 2 davon auspustest, wie viele Kerzen hast du dann noch übrig?', answer: 10, category: 'allgemeines' },
    { question: 'Wenn du einen Marathon läufst und den zweiten Platz überholst, auf welchem Platz bist du dann?', answer: 2, category: 'allgemeines' },
    { question: 'Wie viele Augen hat eine Kartoffel, wenn du sie anstarrst?', answer: 0, category: 'allgemeines' },
    { question: 'Wenn eine Kuh 4 Liter Milch gibt, wie viel Milch gibt dann eine halbe Kuh?', answer: 0, category: 'allgemeines' },
    { question: 'Wenn ein Ei 60 Sekunden zum Kochen benötigt, wie viele Sekunden würdest du brauchen, um 100 Eier zu kochen?', answer: 60, category: 'allgemeines' },
    { question: 'Wie viele Ringe sind im Logo der Olympischen Spiele?', answer: 5, category: 'allgemeines' },
    
// Mathematik
// +Gewicht +Volumen
//   
    { question: 'Wieviel Liter Bier passt etwa in einem Fußball?', answer: 4.75, category: 'mathematik' },
    { question: 'Was ist die Quadratwurzel von 144?', answer: 12, category: 'mathematik' },
    { question: 'Wie lautet die Kreiszahl π (Pi) auf vier Dezimalstellen gerundet?', answer: 3.14159, category: 'mathematik' },
    { question: 'Wie viele Primzahlen gibt es zwischen 1 und 20?', answer: 8, category: 'mathematik' },
    { question: 'Wie viel Grad hat ein gleichschenkliges Dreieck?', answer: 60, category: 'mathematik' },
    { question: 'Wie viele Seiten hat ein Oktaeder?', answer: 8, category: 'mathematik' },
    { question: 'Wie viele Kubikzentimeter sind in einem Liter?', answer: 1000, category: 'mathematik' },
    { question: 'Wie viele Dezimeter sind in einem Kilometer?', answer: 10000, category: 'mathematik' },
    { question: 'Wie viele Schuhe würde eine Person haben, wenn sie mit zwei Paar pro Tag einen Monat lang ein neues Paar tragen würde?', answer: 60, category: 'mathematik' },
    { question: 'Wenn man jeden Tag 2 Euro spart, wie viel Geld hätte man nach 1 Million Sekunden?', answer: 46, category: 'mathematik' },
    { question: 'Wie viele Tage sind eine Milliarde Sekunden?', answer: 11574, category: 'mathematik' },
    { question: 'Wie viele Lamas würde es brauchen, um das Gewicht des Eiffelturms auszugleichen (angenommen, ein Lama wiegt 150 kg)?', answer: 7333, category: 'mathematik' },
    { question: 'Wie viele mal müsste man eine Münze werfen, um statistisch gesehen genau 100 mal Kopf zu erhalten?', answer: 200, category: 'mathematik' },
    { question: 'Wie viele Quadrate der Seitenlänge 1 cm passen in ein Quadrat der Seitenlänge 1 m?', answer: 10000, category: 'mathematik' },
    { question: 'Wie viele Ziffern hat die Zahl 10⁴⁰⁰⁰?', answer: 4001, category: 'mathematik' },
    { question: 'Wie viele Sekunden sind in 11 Tagen, 13 Stunden und 46 Minuten?', answer: 1000000, category: 'mathematik' },
    { question: 'Wie viele Möglichkeiten gibt es, 5 Bücher in einem Regal anzuordnen?', answer: 120, category: 'mathematik' },
    { question: 'Wie oft kann man 10 von 100 abziehen?', answer: 1, category: 'mathematik' },
    { question: 'Wie viel Sand (in m³) befindet sich in einem Loch mit dem Volumen 8m³?', answer: 0, category: 'mathematik' },
    { question: 'Ella und Tina bekommen von ihren Eltern insgesamt genau 15€ Taschengeld. Da Ella ein Jahr älter ist, erhält sie 2.- Euro mehr als ihre Schwester. Wieviel Geld bekommt Ella?', answer: 8.5, category: 'mathematik' },
    { question: 'Die Summer der beiden Zahlen beträgt 10. Ihr Quotient ist 4. Welche ist die höhere Zahl?', answer: 8, category: 'mathematik' },
    { question: 'Welche Zahl ergibt 60, wenn man sie durch fünf Teilt und das Ergebnis verdoppelt?', answer: 150, category: 'mathematik' },
    { question: 'Was ergibt 77 x 91?', answer: 7007, category: 'mathematik' },
    { question: 'Was ist die größte zweistellige Primzahl?', answer: 97, category: 'mathematik' },
    { question: 'Welche Summe ergibt die kleinste und die größte zweistellige Zahl?', answer: 109, category: 'mathematik' },

// Geographie
// + Distanz +Fläche +Einwohner
// 
    { question: 'Wie viele Länder gibt es in der Welt?', answer: 195, category: 'geographie' },
    { question: 'Wie viele Kontinente gibt es auf der Welt?', answer: 7, category: 'geographie' },
    { question: 'Wie groß ist die Fläche des Pazifische Ozeans in km³?', answer: 166.2, category: 'geographie' },
    { question: 'Wie viele Zeitzone(n) hat China?', answer: 5, category: 'geographie' },
    { question: 'Wie viele Prozent der Erdoberfläche sind mit Wasser bedeckt?', answer: 71, category: 'geographie' },
    { question: 'Wie viele Ozeane gibt es auf der Erde?', answer: 5, category: 'geographie' },
    { question: 'Wie viele Kilometer lang ist der Nil, der längste Fluss der Erde?', answer: 6_650, category: 'geographie' },
    { question: 'Wie viele Länder grenzen an Deutschland?', answer: 9, category: 'geographie' },
    { question: 'Wie viele Einwohner hat die Stadt New York?', answer: 8_400_000, category: 'geographie' },
    { question: 'Wie viele Zeitzone(n) hat Russland?', answer: 11, category: 'geographie' },
    { question: 'Wie viele Kilometer lang ist der Äquator?', answer: 40_075, category: 'geographie' },
    { question: 'Wie viele Inseln gehören zu Japan?', answer: 6_852, category: 'geographie' },
    { question: 'Wie viele Bundesstaaten hat die USA?', answer: 50, category: 'geographie' },
    { question: 'Wie viele Meter ist der Mount Everest hoch?', answer: 8_848, category: 'geographie' },
    { question: 'Wie viele Zeitzone(n) hat Kanada?', answer: 6, category: 'geographie' },
    { question: 'Wie viele Kilometer lang ist die Chinesische Mauer?', answer: 21_196, category: 'geographie' },
    { question: 'Wie viele Einwohner hat Indien?', answer: 1_366_417_754, category: 'geographie' },
    { question: 'Wie viele Quadratkilometer hat die Sahara?', answer: 9_200_000, category: 'geographie' },
    { question: 'Wie viele Einwohner hat Australien?', answer: 25_700_000, category: 'geographie' },
    { question: 'Wie viele Zeitzonen gibt es auf der Erde?', answer: 24, category: 'geographie' },
    { question: 'Wie viele Länder auf der Welt haben keinen Zugang zum offenen Meer?', answer: 45, category: 'geographie' },
    { question: 'Wie viele Städte hat Deutschland?', answer: 2050, category: 'geographie' },
    { question: 'Wie viele Hamburger kann man nebeneinander legen, um die Entfernung von Hamburg nach München zu überbrücken (angenommen, ein Hamburger ist 10 cm breit)?', answer: 7_860_000, category: 'geographie' },
    { question: 'Wie viele Kilometer beträgt die Entfernung von New York bis Paris?', answer: 5836, category: 'geographie' },
    { question: 'Wie viele Inseln hat die Karibik (ungefähr)?', answer: 7000, category: 'geographie' },
    { question: 'Wie viele Menschen leben in der kleinsten Stadt der Welt, Hum in Kroatien?', answer: 30, category: 'geographie' },
    { question: 'Wie viele Inseln gibt es in Schweden?', answer: 267570, category: 'geographie' },
    { question: 'Wie viele Länder grenzen an die Schweiz?', answer: 5, category: 'geographie' },
    { question: 'Wie viele Länder befinden sich im Vereinigten Königreich?', answer: 4, category: 'geographie' },
    { question: 'Wie viele Berge gibt es in der Sahara?', answer: 0, category: 'geographie' },
    { question: 'Wie viele Vulkane gibt es auf Island?', answer: 130, category: 'geographie' },
    { question: 'Wie viele Hauptstädte gibt es in Südafrika?', answer: 3, category: 'geographie' },
    { question: 'Wie viele Länder teilen sich den Amazonas-Regenwald?', answer: 9, category: 'geographie' },

// Natur
// +Tiere +Pflanzen
// 
    { question: 'Wie hoch ist die Höchstgeschwindigkeit eines Gepards in km/h?', answer: 98, category: 'natur' },
    { question: 'Wie viele Schnurrhaare hat eine durchschnittliche Hauskatze?', answer: 24, category: 'natur' },
    { question: 'Wie viele Augen hat eine Biene?', answer: 5, category: 'natur' },
    { question: 'Wie viele Herzen hat ein Oktopus?', answer: 3, category: 'natur' },
    { question: 'Wie viele Beine hat eine Spinne?', answer: 8, category: 'natur' },
    { question: 'Wie viele Knochen hat ein erwachsener Mensch?', answer: 206, category: 'natur' },
    { question: 'Wie viele Knochen hat eine Giraffe im Hals?', answer: 7, category: 'natur' },
    { question: 'Wie viele Arme hat eine Krake?', answer: 8, category: 'natur' },
    { question: 'Wie viele Flügel hat eine Libelle?', answer: 4, category: 'natur' },
    { question: 'Wie viele Blütenblätter hat eine Sonnenblume im Durchschnitt?', answer: 34, category: 'natur' },
    { question: 'Wie viele Zentimeter beträgt die durchschnittliche Flügelspannweite eines Wanderfalken?', answer: 85, category: 'wissenschaft' },
    { question: 'Wie viele Muschelnarten gibt es ungefähr?', answer: 8_000, category: 'wissenschaft' },
    { question: 'Wie viele Flügel hat ein Schmetterling?', answer: 4, category: 'natur' },
    { question: 'Wie viele Elefanten bräuchte man, um die durchschnittliche Masse eines Blauwals zu erreichen (angenommen, ein Elefant wiegt 6 Tonnen)?', answer: 20, category: 'natur' },
    { question: 'Wie viele Eichhörnchen würden es brauchen, um das Gewicht eines Braunbären zu erreichen (angenommen, ein Eichhörnchen wiegt 500 Gramm und ein Braunbär wiegt 250 kg)?', answer: 500, category: 'natur' },
    { question: 'Wie viele Kilo Futter frisst ein durchschnittlicher Elefant pro Tag?', answer: 150, category: 'natur' },
    { question: 'Wie viele Flügelschläge macht ein Kolibri pro Minute?', answer: 4200, category: 'natur' },
    { question: 'Wie viele Liter Wasser kann ein großer ausgewachsener Kaktus speichern?', answer: 3000, category: 'natur' },
    { question: 'Wieviele Pollen (in mg) sammelt eine durchschnittliche Biene pro Tag?', answer: 100, category: 'natur' },
    { question: 'In einem magischen Wald gibt es doppelt so viele Eichhörnchen mit Sonnenbrillen wie normale Eichhörnchen. Wenn es insgesamt 450 Eichhörnchen gibt, wie viele tragen Sonnenbrillen?', answer: 300, category: 'natur' },
    { question: 'Wie viele Bäume gibt es im Amazonas-Regenwald (in Milliarden)?', answer: 390, category: 'natur' },
    { question: 'Wie viele Tonnen CO2 stößt ein durchschnittlicher Baum pro Jahr aus?', answer: 0, category: 'natur' },
    { question: 'Wie viele Arten von Kakteen gibt es?', answer: 2000, category: 'natur' },
    { question: 'Wie viele Federn hat ein durchschnittlicher Schwan?', answer: 25000, category: 'natur' },
    { question: 'Wie viele Liter Wasser kann ein Elefant in seinem Rüssel halten?', answer: 10, category: 'natur' },
    { question: 'Wie viele Eier legt ein Huhn durchschnittlich pro Jahr?', answer: 300, category: 'natur' },
    { question: 'Wie viele Blüten muss eine Biene besuchen, um 1 Kilogramm Honig zu produzieren?', answer: 4_000_000, category: 'natur' },
    { question: 'Wie viele Beine hat ein Tausendfüßler durchschnittlich?', answer: 400, category: 'natur' },
    
// Wissenschaft
// 
// 
    { question: 'Wie viele Elemente gibt es im Periodensystem?', answer: 118, category: 'wissenschaft' },
    { question: 'Wie viele Millisekunden hat eine Sekunde?', answer: 1000, category: 'wissenschaft' },
    { question: 'Wie viele Sekunden hat eine Stunde?', answer: 3600, category: 'wissenschaft' },
    { question: 'Wie viele Chromosomen hat der Mensch?', answer: 46, category: 'wissenschaft' },
    { question: 'Wie viele Milliarden Jahre alt ist die Erde ungefähr?', answer: 4.5, category: 'wissenschaft' },
    { question: 'Wie viele Monde hat die Erde?', answer: 1, category: 'wissenschaft' },
    { question: 'Wie viele Grad Celsius sind 32 Grad Fahrenheit?', answer: 0, category: 'wissenschaft' },
    { question: 'Wie viele Phasen hat der Mond?', answer: 8, category: 'wissenschaft' },
    { question: 'Wie viele Planeten in unserem Sonnensystem haben Ringe?', answer: 4, category: 'wissenschaft' },
    { question: 'Wie viele Protonen hat ein Helium-Atom?', answer: 2, category: 'wissenschaft' },
    { question: 'Wie viele Planeten in unserem Sonnensystem haben Monde?', answer: 8, category: 'wissenschaft' },
    { question: 'Wie viele Grad beträgt der Neigungswinkel der Erdachse?', answer: 23.5, category: 'wissenschaft' },
    { question: 'Wie viele Millionen Kilometer entfernt ist die Sonne von der Erde?', answer: 149.6, category: 'wissenschaft' },
    { question: 'Wie viele Kilometer kann ein Lichtstrahl in einer Sekunde zurücklegen?', answer: 299_792, category: 'wissenschaft' },
    { question: 'Wie viele Kilometer sind es von der Erde zum Mond?', answer: 384_400, category: 'wissenschaft' },
    { question: 'Wie viele Bytes sind in einem Kilobyte?', answer: 1024, category: 'wissenschaft' },
    { question: 'Wie viele Volt hat ein Watt?', answer: 0, category: 'wissenschaft' }
    
  ];



// Updates
// Geschichte & Kultur


// [
//     { question: 'In welchem Jahr entdeckte Christoph Kolumbus Amerika?', answer: 1492, category: 'geschichte_kultur' },
//     { question: 'Wie viele Tafeln der Hammurabi-Codes gibt es?', answer: 1, category: 'geschichte_kultur' },
//     { question: 'Wie viele Monde hat der Planet Merkur?', answer: 0, category: 'geschichte_kultur' },
//     { question: 'In welchem Jahr wurde der Eiffelturm fertiggestellt?', answer: 1889, category: 'geschichte_kultur' },
//     { question: 'Wie viele Zeilen hat die amerikanische Nationalhymne?', answer: 4, category: 'geschichte_kultur' },
//     { question: 'Wie viele Oscars hat der Film "Titanic" gewonnen?', answer: 11, category: 'geschichte_kultur' },
//     { question: 'Wie viele Pyramiden gibt es in Gizeh?', answer: 3, category: 'geschichte_kultur' },
//     { question: 'In welchem Jahr wurde die Mona Lisa gemalt?', answer: 1506, category: 'geschichte_kultur' }
// ]




let selectedQuestions = [];

function registerPlayers() {
    let count = document.getElementById('playerCount').value;
    let playerNames = document.getElementById('playerNames');
    playerNames.innerHTML = '';
    for (let i = 0; i < count; i++) {
        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = `Name des Spielers ${i + 1}`;
        input.id = `player${i}`;
        playerNames.appendChild(input);
    }
    let button = document.createElement('button');
    button.innerText = 'Kategorien auswählen';
    button.onclick = selectCategories;
    playerNames.appendChild(button);
    playerNames.style.display = 'block';
    document.getElementById('playerRegistration').style.display = 'none';
}

function selectCategories() {
    document.getElementById('playerNames').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
}


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

let roundLength;

function startQuiz() {
    let selectedCategories = [];
    if (document.getElementById('allgemeines').checked) selectedCategories.push('allgemeines');
    if (document.getElementById('mathematik').checked) selectedCategories.push('mathematik');
    if (document.getElementById('geographie').checked) selectedCategories.push('geographie');
    if (document.getElementById('natur').checked) selectedCategories.push('natur');
    if (document.getElementById('wissenschaft').checked) selectedCategories.push('wissenschaft');
    selectedQuestions = questions.filter(q => selectedCategories.includes(q.category));
    for (let i = 0; i < document.getElementById('playerCount').value; i++) {
        let name = document.getElementById(`player${i}`).value;
        players.push({ name: name, score: 0 });
    }
    document.getElementById('categorySelection').style.display = 'none';
    shuffleArray(selectedQuestions);
    // specify round Length before asking a Question
    roundLength = parseInt(document.getElementById('roundLength').value);

    askQuestion();
}

// Restlichen Funktionen bleiben gleich...


function askQuestion() {
    document.getElementById('currentPlayer').innerText = 'Aktueller Spieler: ' + players[currentPlayer].name;
    document.getElementById('questionText').innerText = selectedQuestions[currentQuestion].question;
    document.getElementById('question').style.display = 'block';
    document.getElementById('results').style.display = 'none';  // Hides the results table before the next question
    
    startTimer();  // Start the timer when a question is asked
}

function submitAnswer() {
    let answer = document.getElementById('answer').value;
    answers.push({ player: players[currentPlayer].name, answer: answer });
    // Clear the input field
    document.getElementById('answer').value = '';
    clearInterval(timer);   // Stop the timer when an answer is submitted

    currentPlayer++;
    if (currentPlayer < players.length) {
        // Display a message to the next player
        document.getElementById('question').style.display = 'none';
        let results = document.getElementById('results');
        results.style.cssText = "font-size: 20px; padding: 30vw;"; //Styles the result box 
        results.innerHTML = `${players[currentPlayer].name}, du bist dran!`;

        // Add a "Weiter" button for the next player to start
        let nextButton = document.createElement('button');
        nextButton.innerText = 'Weiter';
        nextButton.addEventListener('click', function() {
            results.style.display = 'none';  // Hide the message
            askQuestion();
        });
        results.appendChild(nextButton);
        results.style.display = 'block';
    } else {
        showResults();
    }
}


function showResults() {
    document.getElementById('question').style.display = 'none';
    let results = document.getElementById('results');
    results.innerHTML = '';

    // Find the correct answer for the current question
    let correctAnswer = selectedQuestions[currentQuestion].answer;

    // Create a new div to show the correct answer first
    let correctAnswerDiv = document.createElement('div');
    correctAnswerDiv.innerText = `Das korrekte Ergebnis ist: ${correctAnswer}`;
    results.appendChild(correctAnswerDiv);

    // Create a "Weiter" button
    let continueButton = document.createElement('button');
    continueButton.innerText = 'Weiter';
    continueButton.addEventListener('click', function() {
        // Remove the button itself
        results.removeChild(continueButton);

        // Calculate the difference of each answer from the correct answer
        for (let answer of answers) {
            answer.difference = Math.abs(answer.answer - correctAnswer);
        }
        // Find the smallest difference
        let smallestDifference = Math.min(...answers.map(a => a.difference));
        // Find all players who have the smallest difference
        let correctPlayers = answers.filter(a => a.difference === smallestDifference).map(a => a.player);
        // Give all correct players a point
        for (let playerName of correctPlayers) {
            players.find(x => x.name === playerName).score++;
        }
        // Sort answers by their difference from the correct answer
        answers.sort((a, b) => a.difference - b.difference);

        for (let answer of answers) {
            let p = document.createElement('p');
            p.innerText = `${answer.player}: ${answer.answer}`;

            // Highlight all correct answers
            if (correctPlayers.includes(answer.player)) {
                p.style.fontWeight = 'bold';
                p.style.color = "lime";
            }

            results.appendChild(p);
        }

        // Add another "Weiter" button to proceed to the next question or end the game
        let nextButton = document.createElement('button');
        nextButton.innerText = 'Weiter';
        nextButton.addEventListener('click', function() {
            results.removeChild(correctAnswerDiv); // Remove the correct answer div
            results.innerHTML = ''; // Clear the previous results

            currentPlayer = 0;
            answers = [];
            currentQuestion++;

            if (currentQuestion < selectedQuestions.length) {
                askQuestion();
            } else {
                let winner = players.sort((a, b) => b.score - a.score)[0];
                let p = document.createElement('p');
                p.innerText = `Gewinner ist ${winner.name} mit ${winner.score} Punkten!`;
                results.appendChild(p);
            }
        });
        results.appendChild(nextButton);
    });

    results.appendChild(continueButton);
    results.style.display = 'block';
}


// Timer Function !!!

let timer;

function startTimer() {
    let timeLeft = roundLength;
    document.getElementById('timer').innerText = 'Timer: ' + timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById('timer').innerText = 'Timer: ' + timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Zeit abgelaufen! Nächster Spieler!")
            submitAnswer();
        }
    }, 1000);
}


