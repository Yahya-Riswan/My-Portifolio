let btn = true;
function rollDice() {
    if(btn){
        btn = false
        let com =  Math.floor(Math.random() * 6) + 1;
        document.querySelector("#cst").innerText = com;
        const dice = document.getElementById('dice');
        
        const rotations = {
            1: 'rotateX(0deg) rotateY(0deg)',
            2: 'rotateX(0deg) rotateY(-90deg)',
            3: 'rotateX(0deg) rotateY(-180deg)',
            4: 'rotateX(0deg) rotateY(90deg)',
            5: 'rotateX(-90deg) rotateY(0deg)',
            6: 'rotateX(90deg) rotateY(0deg)'
        };
        let randomFace = 1;
        let intervalId = setInterval(() => {
            randomFace = Math.floor(Math.random() * 6) + 1;
            dice.style.transform = rotations[randomFace];
        }, 200);

        setTimeout(() => {
            clearInterval(intervalId);
            if(user == randomFace){
                let pl = document.querySelector("#ps");
                pl.innerText = Number(pl.innerText) + 1;
                document.querySelector('.ans').innerText = "Player Wins!"
            }else if(com == randomFace){
                let cl = document.querySelector("#cs");
                cl.innerText = Number(cl.innerText) + 1;
                document.querySelector('.ans').innerText = "Computer Wins!"
            }else{
                let dl = document.querySelector("#ds");
                dl.innerText = Number(dl.innerText) + 1;
                document.querySelector('.ans').innerText = "Draw"

            }
            btn = true

        }, 2000);
    }

    
}
let user = 1;
let selects = document.querySelectorAll(".select h3")

selects.forEach(select=>{
    select.addEventListener('click',()=>{
        selects.forEach(x=>{
            x.classList.remove("act")
        })
        select.classList.add("act");
        user = select.innerText;
        console.log(user)
    })
})