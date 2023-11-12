let players = [];
let currentPlayer = 0;
let roundLength;
let timerId;

// Word Arrays
const sportarten = ["Fußball", "Basketball", "Tennis", "Schwimmen", "Volleyball", "Golf", "Radsport", "Skifahren", "Tischtennis", "Badminton", "Baseball", "Boxen", "Hockey", "Handball", "Bogenschießen", "Eiskunstlauf", "Fechten", "Eishockey", "Darts", "Schach", "Billard", "Snowboarden", "Skateboarding", "Surfen", "Tauchen", "Bowling", "Kajakfahren", "Parkour", "Kickboxen", "BMX", "Stabhochsprung", "Speerwurf", "Wasserball", "Reiten", "Bouldern", "Cricket", "Rugby", "Rudern", "Leichtathletik", "Wrestling"];
const prominente = ["Beyonce", "Elvis Presley", "Albert Einstein", "Lady Gaga", "Barack Obama", "Michael Jackson", "Mozart", "Leonardo DiCaprio", "Marilyn Monroe", "Freddie Mercury", "Nelson Mandela", "Mahatma Gandhi", "Elon Musk", "J.K. Rowling", "Cristiano Ronaldo", "Lionel Messi", "Roger Federer", "Serena Williams", "Bob Marley", "Bruce Lee", "Mark Zuckerberg", "Angelina Jolie", "Madonna", "Usain Bolt", "Charlie Chaplin", "Mozart", "Pablo Picasso", "Vincent van Gogh", "Julius Caesar", "William Shakespeare", "Isaac Newton", "Muhammad Ali", "Winston Churchill", "Napoleon Bonaparte", "Queen Elizabeth II", "Donald Trump", "Michael Jordan", "John Lennon", "Stephen Hawking", "John F. Kennedy", "Tupac Shakur", "Che Guevara", "Adele", "Johnny Depp", "Paul McCartney", "Keanu Reeves", "Bill Gates", "Stephen Spielberg", "Charlie Sheen", "Tom Cruise", "Jennifer Aniston", "George Clooney", "Neil Armstrong", "Rihanna", "Kanye West", "Eminem", "Justin Bieber", "Ed Sheeran", "Snoop Dogg", "Katy Perry", "Mick Jagger", "Rafael Nadal", "Novak Djokovic", "Kim Kardashian", "Leonardo da Vinci", "Kurt Cobain", "Arnold Schwarzenegger", "Charles Darwin", "Benjamin Franklin", "Marie Curie", "George Washington", "Abraham Lincoln"];
const filme = ["Titanic", "Star Wars", "Der König der Löwen", "Inception", "Der Pate", "Harry Potter", "Matrix", "Fight Club", "Forrest Gump", "James Bond", "Herr der Ringe", "Jurassic Park", "Transformers", "Fast & Furious", "Zurück in die Zukunft", "Ghostbusters", "Avatar", "Interstellar", "Indiana Jones", "Toy Story", "Wall-E", "Spider-Man", "Superman", "Batman", "Iron Man", "Die Tribute von Panem", "Die Twilight Saga", "Mission: Impossible", "Rocky", "The Social Network", "Django Unchained", "Scarface", "Slumdog Millionär", "La La Land", "Parasite", "The Wolf of Wall Street", "Shutter Island", "Life of Pi", "E.T.", "Once Upon a Time in Hollywood", "The Shawshank Redemption", "The Avengers"];
const tiere = ["Elefant", "Pinguin", "Känguru", "Panda", "Delfin", "Tiger", "Gorilla", "Giraffe", "Koala", "Löwe", "Pferd", "Hai", "Krokodil", "Adler", "Wolf", "Schlange", "Schmetterling", "Eichhörnchen", "Papagei", "Zebra", "Frosch", "Hase", "Nilpferd", "Kamel", "Affe", "Bär", "Hund", "Katze", "Maus", "Nashorn", "Wal", "Ziege", "Faultier", "Oktopus", "Ameise", "Biber", "Esel", "Hummer", "Igel", "Jaguar", "Rabe", "Stinktier", "Puma", "Hamster", "Maulwurf", "Schwan", "Kolibri", "Seehund", "Waschbär", "Gepard", "Skorpion", "Seestern", "Flamingo", "Alpaka", "Auster", "Falke", "Gans", "Goldfisch", "Lama", "Seepferdchen", "Uhu"];
const laender = ["Deutschland", "Kanada", "Japan", "Australien", "Brasilien", "Frankreich", "Indien", "China", "Italien", "Ägypten", "Spanien", "Südafrika", "Mexiko", "Argentinien", "Türkei", "Griechenland", "Niederlande", "Schweden", "Norwegen", "USA", "Finnland", "Dänemark", "Schweiz", "Österreich", "Neuseeland", "Irland", "Belgien", "Polen", "Portugal", "Südkorea", "Nordkorea", "Thailand", "Vietnam", "Singapur", "Kolumbien", "Chile", "Venezuela", "Saudi-Arabien", "Kuba", "Costa Rica", "Island", "Tschechien", "Ecuador", "Peru", "Qatar", "Kroatien", "Jamaika", "Bolivien", "El Salvador", "Bosnien und Herzegowina", "Israel", "Tansania", "Afghanistan", "Ungarn", "Rumänien", "Serbien", "Bulgarien", "Estland", "Lettland", "Litauen", "Weißrussland", "Ukraine", "Georgien", "Malaysia", "Indonesien", "Philippinen", "Fidschi", "Seychellen", "Mauritius"];
const berufe = ["Arzt", "Lehrer", "Astronaut", "Koch", "Architekt", "Autor", "Bäcker", "Schauspieler", "Polizist", "Ingenieur", "Bauarbeiter", "Fotograf", "Journalist", "Anwalt", "Richter", "Programmierer", "Designer", "Friseur", "Pilot", "Detektiv", "Elektriker", "Gärtner", "Juwelier", "Kapitän", "Notar", "Physiotherapeut", "Schornsteinfeger", "Tierarzt", "Chemiker", "Diplomat", "Geologe", "Dolmetscher", "Meteorologe", "Sanitäter", "Bibliothekar", "Biologe", "Botaniker", "Brauer", "Buchhalter", "Chirurg", "Dirigent", "Fahrlehrer", "Feuerwehrmann"];


window.onload = function() {
    document.getElementById('card').style.display = 'none';
};

document.getElementById('startButton').addEventListener('click', startGame);

// Updates Score 
document.getElementById('yesButton').addEventListener('click', () => {
    players[currentPlayer].score++;
    document.getElementById('score').textContent = players[currentPlayer].name + "'s score: " + players[currentPlayer].score;
    wordBox.textContent = getRandomWord();
});

document.getElementById('noButton').addEventListener('click', () => {
    if (typeof timerId !== "undefined") {
        document.getElementById('wordBox').textContent = getRandomWord();
    }
});

function startGame() {
    let numPlayers = document.getElementById('numPlayers').value;
    roundLength = document.getElementById('roundLength').value;


    if (!numPlayers || !roundLength) {
        window.alert('Please input the number of players and the round length before starting the game.');
        return;
    }

    document.getElementById('settings').style.display = 'none';


    for (let i = 0; i < numPlayers; i++) {
        let playerName = prompt(`Enter name for Player ${i+1}`);
        players.push({name: playerName, score: 0});
    }

    document.getElementById('card').style.display = 'block';
    startRound();
}

function startRound() {
  let currentPlayerName = players[currentPlayer].name;
  document.getElementById('score').textContent = "Current Player: " + currentPlayerName + " / Score: " + players[currentPlayer].score;
// Added the display of Player score in the card

    let wordBox = document.getElementById('wordBox');
    wordBox.textContent = getRandomWord();

    let timer = document.getElementById('timer');
    timer.textContent = "Timer: " + roundLength;

    timerId = setInterval(() => {
        timer.textContent = "Timer: " + --timer.textContent.split(": ")[1];
        if (timer.textContent.split(": ")[1] == '0') {
            endRound();
        }
    }, 1000);

    document.getElementById('switchButton').addEventListener('click', switchPlayers);
}

function endRound() {
    clearInterval(timerId);
    document.getElementById('yesButton').hidden = true;
    document.getElementById('noButton').hidden = true;
    document.getElementById('switchButton').hidden = false;

    let scoreElement = document.getElementById('score');
    scoreElement.textContent = players[currentPlayer].name + "'s score: " + players[currentPlayer].score;
}

function switchPlayers() {
    currentPlayer = (currentPlayer + 1) % players.length;
    document.getElementById('yesButton').hidden = false;
    document.getElementById('noButton').hidden = false;
    document.getElementById('switchButton').hidden = true;
    startRound();
}

function getRandomWord() {
    const selectedWords = getSelectedWords();
    return selectedWords[Math.floor(Math.random() * selectedWords.length)];
}



// ausgewählten Kategorien ausliest und in einem Array zusammenführt

function getSelectedWords() {
    const wordCategories = {
        sportarten: sportarten,
        prominente: prominente,
        filme: filme,
        tiere: tiere,
        laender: laender,
        berufe: berufe
    };
    let selectedWords = [];
    for (let category in wordCategories) {
        if (document.getElementById(category).checked) {
            selectedWords = selectedWords.concat(wordCategories[category]);
        }
    }
    return selectedWords;
}
