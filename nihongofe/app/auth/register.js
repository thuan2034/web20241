const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
});

var dataSent = true;

function createUser() {
    dataSent = false;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var age = document.getElementById("age").value;
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = months[new Date().getMonth()];
    var year = new Date().getFullYear();

    fetch('', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, name, age, month, year, language: localStorage.getItem("language") })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            dataSent = true;
            Toast.fire({
                icon: 'success',
                text: 'User created successfully'
            }).then(() => {
                location.replace("../main/index.html");
            });
        } else {
            Toast.fire({
                icon: 'error',
                text: data.message || 'An error occurred'
            });
        }
    })
    .catch(error => {
        console.log(error);
        Toast.fire({
            icon: 'error',
            text: 'An error occurred'
        });
    });
}

var signupBtn = document.getElementById("signup");
signupBtn.addEventListener("click", createUser);
