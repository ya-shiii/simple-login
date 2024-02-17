const openModalBtn = document.getElementById('openModal');
const modalBackground = document.getElementById('modalBackground');
const modal = document.getElementById('modal');
const closeModalBtn = document.getElementById('closeModal');
const closeEditModalBtn = document.getElementById('closeEditModal');
const questionForm = document.getElementById('questionForm');
const editmodalBackground = document.getElementById('editModalBackground');
const editmodal = document.getElementById('editModal');

// Function to open the modal
function openModal() {
    modalBackground.classList.remove('hidden');
    modal.classList.remove('hidden');
}

// Function to close the modal
function closeModal() {
    modalBackground.classList.add('hidden');
    modal.classList.add('hidden');
    editmodalBackground.classList.add('hidden');
    editmodal.classList.add('hidden');
}

// Event listener to open modal when button is clicked
openModalBtn.addEventListener('click', openModal);

// Event listener to close modal when close button is clicked
closeModalBtn.addEventListener('click', closeModal);

// Event listener to close modal when close button is clicked
closeEditModalBtn.addEventListener('click', closeModal);

// Event listener to submit form using AJAX checks the choices and makes sure that no similarities with the answer
questionForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Collect form data
    const formData = new FormData(questionForm);

    // Check if any of the choices match the answer
    const answer = formData.get('answer');
    const choices = [
        formData.get('choice1'),
        formData.get('choice2'),
        formData.get('choice3')
    ];
    if (choices.includes(answer)) {
        // Alert the user that choices cannot be the same as the answer
        alert("Other choices cannot be the same as the answer.");
        return; // Exit the function and prevent form submission
    }

    // Make AJAX request
    $.ajax({
        url: 'php/create_question.php',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
            // Handle success response
            console.log(response); // Log the response for debugging
            alert('New question added successfully.');
            location.reload();
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error(xhr.responseText); // Log the error response for debugging
            alert('Error adding new question.');
            location.reload();
        }
    });

    // Close the modal after submitting
    closeModal();
});




let allQuestions = []; // Initialize an empty array to hold all questions

// Function to retrieve all questions via AJAX
function getAllQuestions() {
    $.ajax({
        url: 'php/get_questions.php', // Endpoint to retrieve all questions
        type: 'GET',
        dataType: 'json',
        success: function (response) {
            allQuestions = response; // Store the retrieved questions in allQuestions variable
            displayQuestions(allQuestions); // Call function to display all questions
        },
        error: function (xhr, status, error) {
            console.error('Error:', error); // Log error if AJAX request fails
        }
    });
}


// Function to display questions
function displayQuestions(questions) {
    const formDiv = document.getElementById('form');

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

        // Display choices
        const choices = ['a)', 'b)', 'c)', 'd)']; // Choices labels
        const shuffledChoices = shuffleArray([question.answer, ...question.choices]);
        shuffledChoices.forEach(function (choice, i) {
            const choiceText = document.createElement('p');
            const isCorrectAnswer = choice === question.answer;
            choiceText.innerHTML = choices[i] + ' ' + (isCorrectAnswer ? '<strong>' + choice + '</strong>' : choice);
            questionDiv.appendChild(choiceText);
        });

        // Create edit button
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('w-24', 'mt-8', 'bg-green-800', 'text-white', 'font-bold', 'uppercase', 'rounded-lg', 'py-2', 'px-4', 'inline-block');
        editButton.addEventListener('click', function () {
            // Fill input fields with existing question data
            document.getElementById('editQuestionID').value = question.id;
            document.getElementById('editQuestion').value = question.question;
            document.getElementById('editAnswer').value = question.answer;
            document.getElementById('editChoice1').value = question.choices[0];
            document.getElementById('editChoice2').value = question.choices[1];
            document.getElementById('editChoice3').value = question.choices[2];

            // Show the edit modal
            document.getElementById('editModalBackground').classList.remove('hidden');
            document.getElementById('editModal').classList.remove('hidden');

            // Event listener for delete button inside edit modal
            document.getElementById('deleteEditModal').addEventListener('click', function () {
                // Make an AJAX request to delete the question
                console.log('Deleting ' + question.id);
                $.ajax({
                    url: 'php/delete_question.php',
                    type: 'POST',
                    data: { questionId: question.id },
                    success: function (response) {
                        // Handle success response
                        console.log(response); // Log the response for debugging
                        alert('Question deleted successfully.');
                        location.reload();
                    },
                    error: function (xhr, status, error) {
                        // Handle error
                        console.error(xhr.responseText); // Log the error response for debugging
                        alert('Error deleting question.');
                        location.reload();
                    }
                });
            });

            // Event listener to submit edit form
            document.getElementById('editQuestionForm').addEventListener('submit', function (event) {
                event.preventDefault();

                // Collect form data
                const editQuestionID = document.getElementById('editQuestionID').value;
                const editQuestion = document.getElementById('editQuestion').value;
                const editAnswer = document.getElementById('editAnswer').value;
                const editChoice1 = document.getElementById('editChoice1').value;
                const editChoice2 = document.getElementById('editChoice2').value;
                const editChoice3 = document.getElementById('editChoice3').value;

                // Make AJAX request to submit form data
                $.ajax({
                    url: 'php/edit_question.php',
                    type: 'POST',
                    data: {
                        questionID: editQuestionID,
                        question: editQuestion,
                        answer: editAnswer,
                        choice1: editChoice1,
                        choice2: editChoice2,
                        choice3: editChoice3
                    },
                    success: function (response) {
                        // Handle success response
                        console.log(response); // Log the response for debugging
                        alert('Question edited successfully.'); // Show success message
                        location.reload();
                    },
                    error: function (xhr, status, error) {
                        // Handle error
                        console.error(xhr.responseText); // Log the error response for debugging
                        alert('Error editing question. Please try again.'); // Show error message
                        location.reload();
                    }
                });
            });

        });

        questionDiv.appendChild(editButton);

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



// Function to handle search
function handleSearch() {
    const searchButton = document.querySelector('#searchButton');

    // Add event listener for click event on search button
    searchButton.addEventListener('click', function () {
        // Get the search query entered by the user
        const query = document.getElementById('searchInput').value.trim().toLowerCase();

        if (query !== '') {
            // Filter allQuestions based on the search query
            const filteredQuestions = allQuestions.filter(function (question) {
                return question.question.toLowerCase().includes(query);
            });

            // Call the displayQuestions() function with filtered questions
            displayQuestions(filteredQuestions);
            document.getElementById('searchInput').value = '';
        } else {
            // If the search query is empty, reload the page
            location.reload();
        }
    });
}

// Call the handleSearch() function to set up search functionality
handleSearch();

// Call getAllQuestions function to retrieve and display questions when the page loads
window.onload = function () {
    getAllQuestions();
};







