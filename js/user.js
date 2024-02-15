$(document).ready(function() {
    // Fetch the username from the server
    $.ajax({
        url: 'php/fetch_username.php', // Adjust the path to your PHP script
        method: 'GET',
        dataType: 'json',
        success: function(response) {
            if (response.success) {
                var full_name = response.full_name;
                displayWelcomeMessage(full_name);
            } else {
                console.error('Error fetching username:', response.message);
            }
        },
        error: function(xhr, status, error) {
            console.error('AJAX error:', error);
        }
    });
});

function displayWelcomeMessage(full_name) {
    // Create a floating welcome message
    var welcomeMessage = $('<div>').addClass('welcome-message').text('Welcome, ' + full_name);
    $('#welcomeuser').append(welcomeMessage);
}
