$(document).ready(function () {
	//Crear Cuenta
	let name_field = document.querySelector("#name_field")
	let mail_field = document.querySelector("#mail_field")
	let pass_field = document.querySelector("#pass_field")
	let checkpass_field = document.querySelector("#checkpass_field")
	let submit_btn = document.querySelector("#submit_btn")
	submit_btn.addEventListener("click", (e) => {
		e.preventDefault()		
		let name = name_field.value
		let mail = mail_field.value
		let pass = pass_field.value
		let checkpass = checkpass_field.value
		if(name == "" || mail == "" || pass == "" || checkpass == ""){
			alert("Por favor llene todos los campos")
		}
		else {
			if (pass == checkpass && pass != "") {
				location.href = "login.html";
			}
			else {
				alert("Las dos contraseñas no coinciden")
			}
		}
	})
});