$(document).ready(function () {
	//Crear Reserva
	let name_field = document.querySelector("#name_field")
	let email_field = document.querySelector("#email_field")
	let use_field = document.querySelector("#use_field")
    let cant_dropdown = document.querySelector("#cant_field")
    let day_dropdown = document.querySelector("#day_field")
    let month_dropdown = document.querySelector("#month_field")
    let year_dropdown = document.querySelector("#year_field")
    let hour_dropdown = document.querySelector("#hour_field")
    let submit_btn = document.querySelector("#submit_btn")
    
	submit_btn.addEventListener("click", (e) => {
		e.preventDefault()		
		let name = name_field.value
		let email = email_field.value
		let use = use_field.value
        let cant = cant_dropdown.options[cant_dropdown.selectedIndex].text
        let day = day_dropdown.options[day_dropdown.selectedIndex].text
        let month = month_dropdown.options[month_dropdown.selectedIndex].text
        let year = year_dropdown.options[year_dropdown.selectedIndex].text
        let hour = hour_dropdown.options[hour_dropdown.selectedIndex].text
		if(name == "" || email == "" || use == ""){
			alert("Por favor llene todos los campos")
		}
		else {
			if (true) { //hacer validación de nombre y correo correctos
				location.href = "login.html";
			}
			else {
				alert("El nombre y/o correo no son válidos")
			}
		}
	})
});