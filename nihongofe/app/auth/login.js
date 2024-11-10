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

function signUser() {
    dataSent = false;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    fetch('http://your-backend-url.com/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        dataSent = true;
        Toast.fire({
            icon: 'success',
            text: 'Logged in successfully'
        }).then(() => {
            if (data.user) {
                if (data.language === "Japanese") {
                    localStorage.setItem("language", "Japanese");
                    localStorage.setItem("imgY", 264);
                } else if (data.language === "Korean") {
                    localStorage.setItem("language", "Korean");
                    localStorage.setItem("imgY", 396);
                } else if (data.language === "Spanish") {
                    localStorage.setItem("language", "Spanish");
                    localStorage.setItem("imgY", 66);
                } else if (data.language === "French") {
                    localStorage.setItem("language", "French");
                    localStorage.setItem("imgY", 132);
                }
            }
        }).then(() => {
            location.replace("../main/index.html");
        });
    })
    .catch(error => {
        console.log(error);
        Toast.fire({
            icon: 'error',
            text: 'An error occurred'
        });
    });
}

var loginBtn = document.getElementById("login");
loginBtn.addEventListener("click", signUser);
