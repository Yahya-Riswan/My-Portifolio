import dbs from './firebase.js'

let connectbtn = document.querySelector(".button-connect-send")
let connectname = document.querySelector(".nameconnect")
let connectemail = document.querySelector(".emailconnect")
let connectmessage = document.querySelector(".messageconnect")


connectbtn.addEventListener('click',()=>{
  let name = connectname.value;
  let email = connectemail.value;
  let message = connectmessage.value;
  if(name  && email.includes("@")  && message){
    if(dbs.addDocument("connect",email,{name:name,email:email,message:message})){
      connectbtn.innerText = "Successfully Connected"
      connectname.value = null;
      connectemail.value = null;
      connectmessage.value = null;
    }else{
      connectbtn.innerText = "Reconnect"
    }
  }else{
      connectbtn.innerText = "Fill All The Field";
      setTimeout(()=>{
        connectbtn.innerText = "Reconnect";
      },3000)
  }
})
// line editor
const lines = [
    '<span class="comment">// Hello Vistor👋</span>',
    '<span class="keyword">const</span> <span class="function">sayHello</span> = (<span class="param">name</span>) => {',
    '  <span class="keyword">return</span> `Hello, <span class="string">${name}</span> 👋`; ',
    '};',
    '',
    '<span class="keyword">const</span> <span class="function">init</span> = () => {',
    '  <span class="keyword">const</span> message = <span class="function">sayHello</span>(<span class="string">"Visitor"</span>);',
    '  <span class="function">console</span>.log(message);',
    '};',
    '',
    '<span class="function">init</span>();'
];

let line = 0;
let char = 0;
let output = '';
const codeEl = document.getElementById("code");

function type() {
    if (line >= lines.length) {
    setTimeout(() => {
        output = '';
        line = 0;
        char = 0;
        codeEl.innerHTML = '';
        setTimeout(type, 1500);
    }, 3000);
    return;
    }

    const currentLine = lines[line];
    if (char < currentLine.length) {
        output += currentLine[char++];
        codeEl.innerHTML = output;
        setTimeout(type, 30);
    } else {
        output += '\n';
        char = 0;
        line++;
        setTimeout(type, 500);
    }
}

type();

//scroll behavior
const navLinks = document.querySelectorAll("#nav li");
const connect = document.querySelectorAll(".connect_btn");
const sections = document.querySelectorAll("main");
const menubtn = document.querySelector(".menubtn");
const menubar = document.querySelector(".menu");
let menu = false
menubtn.addEventListener('click',()=>{
  if(menu){
    menubar.style.transform = "translateX(100%)"
    menubtn.classList.remove("active");
    menu = false
  }else{
    menubar.style.transform = "translateX(0)"
    menubtn.classList.add("active");
    menu = true;
  }
})
connect.forEach((btns)=>{
  btns.addEventListener("click", () => {
    const target = document.querySelector("." + btns.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
});
})
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    const target = document.querySelector("." + link.dataset.target);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
    if(menu){
       menubar.style.transform = "translateX(100%)"
      menubtn.classList.remove("active");

      menu = false
    }
  });
});

window.addEventListener("scroll", () => {
  let currentClass = "";

  sections.forEach(section => {
    const top = section.offsetTop - 100;
    if (scrollY >= top) {
      currentClass = section.className;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.dataset.target === currentClass) {
      link.classList.add("active");
    }
  });
});

//bg animations

const images = document.querySelectorAll('.bg-animations img.float');


const minSize = 20;
const maxSize = 40;

function randomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

function moveImage(img) {
  const size = randomFloat(minSize, maxSize);
  img.style.width = `${size}px`;

  const maxX = window.innerWidth - size;
  const maxY = window.innerHeight - size;
  const x = randomFloat(0, maxX);
  const y = randomFloat(0, maxY);
  img.style.transform = `translate(${x}px, ${y}px)`;

  const duration = randomFloat(4000, 9000); 
  setTimeout(() => moveImage(img), duration);
}

images.forEach(img => {
  moveImage(img);
});


//card animation
const card = document.getElementById("code-box");

card.addEventListener("mousemove", (e) => {
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left; 
  const y = e.clientY - rect.top;  

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 10;
  const rotateY = ((x - centerX) / centerX) * -10;

  card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
});

card.addEventListener("mouseleave", () => {
  card.style.transform = `rotateX(0deg) rotateY(0deg)`;
});


const cursorContainer = document.getElementById("cursor-container");

const codeSnippets = [
  "div", "</>", , "let", "()", "{}", "if", "=>", "<p>", "<h1>","else","do","case","id","Css",
    "js","img","b","Html","react","Loop",
];

document.addEventListener("mousemove", (e) => {
  const span = document.createElement("span");
    span.classList.add("code-text");

    const randomText = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
    span.textContent = randomText;

    span.style.left = `${e.clientX}px`;
    span.style.top = `${e.clientY}px`;

    cursorContainer.appendChild(span);

    

  setTimeout(() => {
      span.remove();
    }, 8000);
});



const pcontainer = document.querySelector('.projects .container');
const pbutton = document.querySelector('.projects #show h3');

function pcheckContentOverflow() {
    if (pcontainer.scrollHeight > pcontainer.clientHeight) {
        pbutton.classList.add("act");
    } else {
        pbutton.classList.remove("act");
    }
}

pbutton.addEventListener('click', () => {
    pcontainer.classList.toggle('expanded');
    pbutton.textContent = pcontainer.classList.contains('expanded') ? 'Show Less' : 'Show More';
});


window.addEventListener('load', pcheckContentOverflow);

const acontainer = document.querySelector('.achievments .container');
const abutton = document.querySelector('.achievments #show h3');

function acheckContentOverflow() {
    if (acontainer.scrollHeight > acontainer.clientHeight) {
        abutton.classList.add("act");
    } else {
        abutton.classList.remove("act");
    }
}

abutton.addEventListener('click', () => {
    acontainer.classList.toggle('expanded');
    abutton.textContent = acontainer.classList.contains('expanded') ? 'Show Less' : 'Show More';
});


window.addEventListener('load', acheckContentOverflow);