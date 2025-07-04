let generate = document.querySelector(".gen")
let input = document.querySelector("#password")
let alpha = document.querySelector("#alpha")
let num = document.querySelector("#num")
let spec = document.querySelector("#spec")
let char8 = document.querySelector('.c8')
let char16 = document.querySelector('.c16')

const alphabets = [..."abcdefghijklmnopqrstuvwxyz",..."ABCDEFGHIJKLMNOPQRSTUVWXYZ"];
const numbers = [..."0123456789"];
const specialCharacters = [..."!@#$%^&*()-_=+[]{}|;:,.<>?/"];

generate.addEventListener('click',()=>{
    // console.log(alpha.checked,num.checked,spec.checked,char8.checked,char16.checked)
    let pass ="";
    let arr = []
    let n = 8;
    if(char16.checked){
        n = 16;
    }else{
        n = 8;
    }
    if(alpha.checked){
        arr.push(...alphabets);
    }
    if(num.checked){
        arr.push(...numbers)
    }
    if(spec.checked){
        arr.push(...specialCharacters)
    }
    for(let i = 0 ; i < n; i++){
        const randomIndex = Math.floor(Math.random() * arr.length);
        pass += arr[randomIndex];
    }
    // console.log(pass)
    input.value = pass
})

let visiblity = document.querySelector(".vis");

visiblity.addEventListener('click',()=>{
    const isPasswordHidden = visiblity.classList.contains("fa-eye");

    if (isPasswordHidden) {
        visiblity.classList.replace("fa-eye", "fa-eye-slash");
        input.type = "text";
    } else {
        visiblity.classList.replace("fa-eye-slash", "fa-eye");
        input.type = "password";
    }
})

let copy = document.querySelector(".copy");

copy.addEventListener('click',()=>{
     navigator.clipboard.writeText(input.value)
        .then(() => console.log("Copied to clipboard!"))
        .catch(err => console.error("Failed to copy:", err));
})


