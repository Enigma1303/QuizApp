const quizdata = [
    {
        Question: 'When is my Birthday',
        a: '13th March',
        b: '7th Feburary',
        c: '13th April',
        d: '17th March',
        correct: 'a'
    },
   
    {
        Question: 'My favourite IPL team',
        a: 'CSK fixers',
        b: 'DC losers',
        c: 'MI',
        d: 'HarCB',
        correct: 'b'
    },
    {
        Question: 'The only subject I have ever failed a test in',
        a: 'Computer Applications',
        b: 'Hindi',
        c: 'English',
        d: 'Physics',
        correct: 'a'
    },
    {
        Question: 'What do I watch most online',
        a: 'Anime',
        b: 'Shows',
        c: 'Webshows',
        d: 'Food Vlogs',
        correct: 'd'
    }
];

const buttonpress = document.querySelector('.submit');
const question = document.getElementById('ques');
const answerels = document.querySelectorAll('.answer');
const timee = document.getElementById('timer');
const quiz = document.getElementById('quiz');
const result=document.getElementById('res');

let currentquestion = 0;
let quizscore = 0;
let intervalId = null;

loadquiz();

function loadquiz() {
    deselectanswers();
    timer();
    const currentq = quizdata[currentquestion];
    question.innerHTML = currentq.Question;
    answerels[0].nextElementSibling.innerHTML = currentq.a;
    answerels[1].nextElementSibling.innerHTML = currentq.b;
    answerels[2].nextElementSibling.innerHTML = currentq.c;
    answerels[3].nextElementSibling.innerHTML = currentq.d;
}

function selected() {
    let selectedAnswer = undefined;

    answerels.forEach(answerel => {
        if (answerel.checked) {
            selectedAnswer = answerel.id;
        }
    });

    return selectedAnswer;
}

function timer() {
    let time = 10;

    clearInterval(intervalId); 
    intervalId = setInterval(function () {
        timee.innerHTML = `${time} `;
        time--;

        if (time < 0) {
            clearInterval(intervalId);
            ++currentquestion;
            loadquiz();
            alert('Time is up! You did not select an answer');
        }
        if(currentquestion>=quizdata.length)
        {
            quiz.innerHTML= `Quiz Over!  ${quizscore} Out Of 5 Questions Were Correct`;
        }
    }, 1000);
}

function deselectanswers() {
    answerels.forEach(answerel => {
        answerel.checked = false;
    });
}

buttonpress.addEventListener('click', () => {
    const answer = selected();

    if (answer) {
        clearInterval(intervalId);
        if (answer === quizdata[currentquestion].correct) {
            quizscore++;
         
        }
        currentquestion++;

        if (currentquestion < quizdata.length) {
            loadquiz();
        } else {
          quiz.innerHTML= `${quizscore} Out Of 5 Questions Were Correct`;
        }
    } else {
        alert('Please select an option');
    }
});
