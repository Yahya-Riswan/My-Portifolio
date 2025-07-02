let input = document.querySelector("#input");
let send = document.querySelector(".send");
let todolist = document.querySelector(".todolist .not");
let todolistd = document.querySelector(".todolist .done");
let alert = document.querySelector(".alert");

window.addEventListener('load', () => {
    if (localStorage.getItem("not")) {
        todolist.innerHTML = localStorage.getItem("not");
    }
    if (localStorage.getItem("done")) {
        todolistd.innerHTML = localStorage.getItem("done");
    }
});

send.addEventListener('click', () => {
    if (input.value.trim() === '') {
        alert.innerText = "Type Something";
        setTimeout(() => {
            alert.innerText = '';
        }, 3000);
    } else {
        let li = document.createElement("li");
        let span = document.createElement("span");
        span.innerText = input.value;
        let i = document.createElement("i");
        i.classList.add("fa-solid", "fa-circle-xmark");
        li.appendChild(span);
        li.appendChild(i);
        todolist.appendChild(li);
        input.value = '';
        saveData();
    }
});

todolist.addEventListener("click", function (e) {
    if (e.target.tagName === "SPAN") {
        let li = e.target.parentElement;
        li.classList.add("checked");
        todolistd.appendChild(li);
        saveData();
    } else if (e.target.tagName === "I") {
        e.target.parentElement.remove();
        saveData();
    }
});

todolistd.addEventListener("click", (e) => {
    if (e.target.tagName === "SPAN") {
        let li = e.target.parentElement;
        li.classList.remove("checked");
        todolist.appendChild(li);
        saveData();
    } else if (e.target.tagName === "I") {
        e.target.parentElement.remove();
        saveData();
    }
});

function saveData() {
    localStorage.setItem("not", todolist.innerHTML);
    localStorage.setItem("done", todolistd.innerHTML);
}
