$(document).ready(function () {
	//Log In
	let email_field = document.querySelector("#email_field")
	let password_field = document.querySelector("#password_field")
	let login_btn = document.querySelector("#login_btn")
	login_btn.addEventListener("click", (e) => {
		e.preventDefault()		
		let email = email_field.value
		let password = password_field.value
		if(email == "" || password == ""){
			alert("Por favor llene todos los campos")
		}
		else {
			if (true) {
				location.href = "login.html";
			}
			else {
				alert("Usuario o Contraseña incorrectos")
			}
		}
	})
});