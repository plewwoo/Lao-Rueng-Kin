function login(){
    let emailValue = document.getElementById("E-mail").value
    let passwordValue = document.getElementById("password").value
    
    let loginData = {
        email: emailValue,
        password: passwordValue
    }

    axios.post('http://localhost:4000/login', loginData)
        .then(async (response) => {
            console.log(response);

            await Swal.fire({
                icon: 'Success',
                title: 'Oops...',
                text: 'Success',
                showCancelButton: false,
                timer: 3000
            })
            window.location = "https://news.sanook.com/lotto/check/02052564/#476830,298121"
            localStorage.setItem('username', response.data.user);
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