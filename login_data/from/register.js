function register(){
    let emailValue = document.getElementById("E-mail").value
    let passwordValue = document.getElementById("password").value
    let againPasswordValue = document.getElementById("againpassword").value
    let usernameValue = document.getElementById("username").value

    let registerData = {
        username: usernameValue,
        password: passwordValue,
        againpassword: againPasswordValue,
        email: emailValue
    }

    axios.post('http://localhost:4000/register', registerData)
        .then((response) => {
            console.log(response);

            window.location = "/from/login.html"
        })

        .catch((error) => {
            console.log(error.response)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.response.data.message
            })
        })
}