
const form = document.getElementById("contactForm");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

const submitBtn = document.getElementById("submitBtn");
const successMsg = document.getElementById("successMsg");

const charCount = document.getElementById("charCount");


// Character Counter

messageInput.addEventListener("input", () => {
    charCount.textContent = `${messageInput.value.length}/250`;
});


// Real Time Validation

nameInput.addEventListener("input", validateName);
emailInput.addEventListener("input", validateEmail);
phoneInput.addEventListener("input", validatePhone);
messageInput.addEventListener("input", validateMessage);


function validateName(){

    const error = document.getElementById("nameError");

    if(nameInput.value.trim().length < 3){
        error.textContent = "Name must be at least 3 characters";
        nameInput.classList.add("invalid");
        nameInput.classList.remove("valid");
        return false;
    }

    error.textContent = "";
    nameInput.classList.add("valid");
    nameInput.classList.remove("invalid");
    return true;
}


function validateEmail(){

    const error = document.getElementById("emailError");

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!regex.test(emailInput.value)){
        error.textContent = "Enter a valid email";
        emailInput.classList.add("invalid");
        emailInput.classList.remove("valid");
        return false;
    }

    error.textContent = "";
    emailInput.classList.add("valid");
    emailInput.classList.remove("invalid");
    return true;
}


function validatePhone(){

    const error = document.getElementById("phoneError");

    const regex = /^[0-9]{11}$/;

    if(!regex.test(phoneInput.value)){
        error.textContent = "Enter 11 digits";
        phoneInput.classList.add("invalid");
        phoneInput.classList.remove("valid");
        return false;
    }

    error.textContent = "";
    phoneInput.classList.add("valid");
    phoneInput.classList.remove("invalid");
    return true;
}


function validateMessage(){

    const error = document.getElementById("messageError");

    if(messageInput.value.trim().length < 10){
        error.textContent = "Message must be at least 10 characters";
        messageInput.classList.add("invalid");
        messageInput.classList.remove("valid");
        return false;
    }

    error.textContent = "";
    messageInput.classList.add("valid");
    messageInput.classList.remove("invalid");
    return true;
}


// Submit Form

form.addEventListener("submit",(e)=>{

    e.preventDefault();

    const isNameValid = validateName();
    const isEmailValid = validateEmail();
    const isPhoneValid = validatePhone();
    const isMessageValid = validateMessage();

    if(
        isNameValid &&
        isEmailValid &&
        isPhoneValid &&
        isMessageValid
    ){

        submitBtn.classList.add("loading");
        submitBtn.innerHTML =
        '<span class="spinner-border spinner-border-sm"></span> Sending...';

        setTimeout(()=>{

            submitBtn.classList.remove("loading");
            submitBtn.innerHTML = "Send Message";

            successMsg.classList.remove("d-none");

            form.reset();

            document
            .querySelectorAll(".form-control")
            .forEach(input=>{
                input.classList.remove("valid");
            });

            charCount.textContent = "0/250";

        },2000);
    }
});

