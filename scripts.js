const Form = document.getElementById("Form");
const Email = document.getElementById("Email");
const Name = document.getElementById("Name");
const phone = document.getElementById("phone");
const Table = document.getElementById("Table");
const cl1 = []
const cl2 = []
const cl3 = []

let linhas = '';

Form.addEventListener("submit", function (e) {
    e.preventDefault();
    checkInputs();
    confirmForm();
});

function checkInputs() {
    const NameValue = Name.value;
    const phoneValue = phone.value;
    const EmailValue = Email.value;

    if (NameValue === "") {
        setErrorFor(Name, "Este campo é obrigatório.");
    }
    else {
        setSuccessFor(Name);
    }

    if (phoneValue === "")
        setErrorFor(phone, "Este campo é obrigatório.");
    else if (!Phone_validation(phoneValue)) {
        setErrorFor(phone, "Este numero de contato é inválido.");
    }
    else {
        setSuccessFor(phone);
    }

    if (EmailValue === "") {
        setSuccessFor(Email);
    }
    else if (!checkEmail(EmailValue)) {
        setErrorFor(Email, "Insira um email válido.");
    }
    else {
        setSuccessFor(Email);
    }
}

function confirmForm() {
    const formControls = Form.querySelectorAll(".form-control");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.className === "form-control success";
    });

    if (formIsValid) {
        addLinhas();
        atlTabela();
    }
}

function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    small.innerText = message;
    formControl.className = "form-control error";
}

function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
}

function checkEmail(email) {
    return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        email
    );
}

function Phone_validation(Phone) {
    Phone = Phone.replace(/\D/g, '');
    if (!(Phone.length >= 10 && Phone.length <= 11)) return false;

    if (Phone.length == 11 && parseInt(Phone.substring(2, 3)) != 9) return false;

    for (var n = 0; n < 10; n++) {

        if (Phone == new Array(11).join(n) || Phone == new Array(12).join(n)) return false;
    }

    var DDDValid = [11, 12, 13, 14, 15, 16, 17, 18, 19,
        21, 22, 24, 27, 28, 31, 32, 33, 34,
        35, 37, 38, 41, 42, 43, 44, 45, 46,
        47, 48, 49, 51, 53, 54, 55, 61, 62,
        64, 63, 65, 66, 67, 68, 69, 71, 73,
        74, 75, 77, 79, 81, 82, 83, 84, 85,
        86, 87, 88, 89, 91, 92, 93, 94, 95,
        96, 97, 98, 99];

    if (DDDValid.indexOf(parseInt(Phone.substring(0, 2))) == -1) return false;

    return true;
}

function addLinhas() {
    const nameContact = document.getElementById('Name');
    const emailContact = document.getElementById('Email');
    const phoneContact = document.getElementById('phone');


    if (cl3.includes(phoneContact.value)) {
        alert(`O email ${phoneContact.value} já está vinculado a outro contato.`)
    } else {
        cl1.push(nameContact.value);
        cl2.push(emailContact.value);
        cl3.push(phoneContact.value);

        let linha = '<tr>'
        linha += `<td>${nameContact.value}</td>`
        linha += `<td>${emailContact.value}</td>`
        linha += `<td>${phoneContact.value}</td >`
        linha += '</tr>';

        linhas += linha;
    }


    nameContact.value = '';
    emailContact.value = '';
    phoneContact.value = '';
}

function atlTabela() {
    const tbody = document.querySelector('tbody');
    tbody.innerHTML = linhas;
}




