let btn = document.querySelector(".btn")
let bdate = document.querySelector("#bdate")
bdate.max = new Date().toISOString().split("T")[0]
let yy = document.querySelector(".yy")
let mm = document.querySelector(".mm")
let dd = document.querySelector(".dd")
let h3 = document.querySelector("h3")

btn.addEventListener('click',()=>{
    const today = new Date();

    const day = today.getDate();
    const month = today.getMonth() + 1; 
    const year = today.getFullYear();

    if (bdate.value) {
        const sdt = new Date(bdate.value);

        const sd = sdt.getDate();           // Day (1-31)
        const sm = sdt.getMonth() + 1;    // Month (0-11) +1 for 1-12
        const sy = sdt.getFullYear();      // Year (YYYY)
        

        let bd,bm,by;
        by = year - sy;
        if(month >= sm){
            bm = month - sm;
        }else{
            by--;
            bm = (12 + month) - sm
        }
        if(day >= sd){
            bd = day - sd;
        }else{
            bm--;
            bd = new Date(sy,sm,0).getDate() + day - sm;
        }
        yy.innerText = by;
        mm.innerText = bm;
        dd.innerText = bd;

        console.log(`Day: ${bd}`);
        console.log(`Month: ${bm}`);
        console.log(`Year: ${by}`);
        
    } else {
        console.log('Please select a date.');
        h3.innerText = "Please select a date."
    }
})