$(document).ready(function () {
    // Fetch item data using AJAX
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "php/fetch_users.php", true);

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                // Parse the JSON response
                try {
                    var itemData = JSON.parse(xhr.responseText);
                    console.log('JSON response from fetch_items.php:', itemData);

                    // Display the items table using DataTable
                    displayUsersTable(itemData);
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                }
            } else {
                console.error('Error fetching data. Status:', xhr.status);
            }
        }
    };

    xhr.send();
});

function displayUsersTable(userData) {
    // Create a table with the DataTable class
    var table = $('<table>').addClass('display').attr('id', 'usersDataTable');

    // Append the table to the container
    $('#usersTable').empty().append(table);

    // Initialize DataTable
    $('#usersDataTable').DataTable({
        data: userData,
        columns: [
            { data: 'username', title: 'Username' },
            { data: 'email', title: 'Email' },
            { data: 'age', title: 'Age' },
            { data: 'gender', title: 'Gender' },
            {
                // Custom column for actions
                data: null,
                title: 'Actions',
                render: function (data, type, row) {
                    if (row.acc_status === 'Pending') {
                        return '<button class="bg-green-500 text-white rounded px-2 py-1 m-2" onclick="verifyUser(\'' + row.email + '\')">Verify</button>';
                    } else {
                        return 'Verified';
                    }
                }
            }
        ]
    });
}

function verifyUser(email) {
    // Send AJAX request to verify_user.php
    $.ajax({
        url: 'php/verify_user.php',
        method: 'POST',
        data: { email: email },
        success: function (response) {
            console.log(response); // Log the response
            alert('User verified successfully.');
            window.location.href = 'dashboard.html';
        },
        error: function (xhr, status, error) {
            console.error('Error verifying user:', error);
        }
    });
}

