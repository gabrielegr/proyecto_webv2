$(document).ready(function () {
	//Log In
	let name_field = document.querySelector("#name_field")
	let password_field = document.querySelector("#password_field")
	let login_btn = document.querySelector("#login_btn")
	login_btn.addEventListener("click", (e) => {
		e.preventDefault()		
		let email = name_field.value
		let password = password_field.value
		if(email == "" || password == ""){
			alert("Por favor llene todos los campos")
		}
		else {
			if (true) {
				location.href = "/login";
			}
			else {
				alert("Usuario o Contraseña incorrectos")
			}
		}
	})
});