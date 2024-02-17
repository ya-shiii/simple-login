// Function to display questions and correct answers
function displayQuestions(questions) {
    const formDiv = document.getElementById('form');

    // Shuffle the array of questions
    questions = shuffleArray(questions);

    // Clear previous questions
    formDiv.innerHTML = '';

    // Loop through each question
    questions.forEach(function (question, index) {
        // Create a div for the question
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('border', 'border-gray-300', 'p-4', 'mb-4', 'rounded-lg', 'bg-gradient-to-br', 'from-emerald-200', 'to-emerald-400', 'shadow-lg');

        // Display question
        const questionText = document.createElement('p');
        questionText.innerHTML = '<strong class="mb-8">Question:</strong> ' + question.question;
        questionDiv.appendChild(questionText);

        // Include the correct answer in the choices
        const choices = [...question.choices, question.answer];

        // Shuffle the choices array
        const shuffledChoices = shuffleArray(choices);

        // Display choices with radio buttons
        shuffledChoices.forEach(function (choice, i) {
            const choiceDiv = document.createElement('div');
            choiceDiv.classList.add('flex', 'items-center', 'mb-2');

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = 'question_' + index;
            radioInput.value = choice;
            choiceDiv.appendChild(radioInput);

            const choiceLabel = document.createElement('label');
            choiceLabel.textContent = choice;
            choiceLabel.style.marginLeft = '8px'; // Add margin to the left of the label
            choiceDiv.appendChild(choiceLabel);

            questionDiv.appendChild(choiceDiv);
        });

        // Display correct answer
        const answerParagraph = document.createElement('p');
        answerParagraph.innerHTML = '<strong>Answer:</strong> ' + question.answer;
        answerParagraph.id = 'answer_' + index;
        answerParagraph.classList.add('italic', 'hidden'); // Add italic and hidden classes
        questionDiv.appendChild(answerParagraph);

        // Append question div to formDiv
        formDiv.appendChild(questionDiv);
    });
}


// Function to shuffle an array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Function to fetch questions from the server
function fetchQuestions() {
    $.ajax({
        url: 'php/get_questions.php',
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            displayQuestions(response);
        },
        error: function (xhr, status, error) {
            console.error('Error fetching questions:', error);
        }
    });
}

// Function to load questions and set up event listeners
function loadQuestions() {
    fetchQuestions();

    const checkAnswersButton = document.getElementById('checkAnswers');
    checkAnswersButton.addEventListener('click', checkAnswers);
}

// Call loadQuestions function when the page loads
window.onload = loadQuestions;

// Function to check answers
function checkAnswers() {
    const formDiv = document.getElementById('form');
    const questions = formDiv.querySelectorAll('.border');

    let correctCount = 0;
    let wrongCount = 0;

    questions.forEach(function (question, index) {
        const answerParagraph = document.getElementById('answer_' + index);
        const radioInputs = question.querySelectorAll('input[type="radio"]');
        
        radioInputs.forEach(function (radioInput) {
            if (radioInput.checked) {
                const selectedAnswer = radioInput.value;
                const correctAnswer = answerParagraph.textContent.split(':')[1].trim();

                if (selectedAnswer === correctAnswer) {
                    answerParagraph.classList.remove('hidden');
                    answerParagraph.style.color = 'green';
                    correctCount++;
                } else {
                    answerParagraph.classList.remove('hidden');
                    answerParagraph.style.color = 'red';
                    wrongCount++;
                }
            }
        });
    });

    // Calculate score
    const totalQuestions = questions.length;
    const score = (correctCount / totalQuestions) * 100;

    // Display score as an alert
    alert('Your score: ' + score.toFixed(2) + '%\n\nCorrect answers: ' + correctCount + '\nWrong answers: ' + wrongCount);
}

// Add event listener to the checkAnswers button
const checkAnswersButton = document.getElementById('checkAnswers');
checkAnswersButton.addEventListener('click', checkAnswers);
