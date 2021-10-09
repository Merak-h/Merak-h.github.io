const toLeft = document.getElementById('toLeft');
const toRight = document.getElementById('toRight');

let culmnsTotal = 2;
let culmnsCount = 1;
console.log(culmnsCount);
viewContent(culmnsTotal,culmnsCount);
toLeft.addEventListener('click',()=>{
    if(culmnsCount==1){
        culmnsCount=culmnsTotal;
    }else{
        culmnsCount-=1;
    }
    console.log(culmnsCount);
    //mainSlideFromL(culmnsTotal,culmnsCount);
    viewContent(culmnsTotal,culmnsCount)
})
toRight.addEventListener('click',()=>{
    if(culmnsCount==culmnsTotal){
        culmnsCount=1;
    }else{
        culmnsCount+=1;
    }
    console.log(culmnsCount);
    //mainSlideFromR(culmnsTotal,culmnsCount);
    viewContent(culmnsTotal,culmnsCount)
})

function viewContent(total,count){
    console.log('func'+count)
    for(i=1; i<=total;i++){
        let title = document.getElementById('title'+i);
        let main = document.getElementById('c'+i+'Main');
        let menu = document.getElementById('c'+i+'Menu');
        let content = document.getElementById('c'+i+'Content');
        if(i!=count){
            title.style.display = 'none';
            main.style.display = 'none';
            menu.style.display = 'none';
            content.style.display = 'none';
        }else{
            title.style.display = 'block';
            main.style.display = 'block';
            menu.style.display = 'block';
            content.style.display = 'block';
        }
    }
}
/*
function mainSlideFromL(total,count){
    console.log(total+'fff'+count)
    if(count==1){
        let Lmain = document.getElementById('c'+total+'Main');
        let main = document.getElementById('c'+count+'Main');
        let Rmain = document.getElementById('c'+count+1+'Main');
    }else if(count==total){
        let Lmain = document.getElementById('c'+count-1+'Main');
        let main = document.getElementById('c'+count+'Main');
        let Rmain = document.getElementById('c'+1+'Main');
    }else{
        let Lmain = document.getElementById('c'+count-1+'Main');
        let main = document.getElementById('c'+count+'Main');
        let Rmain = document.getElementById('c'+count+1+'Main');
    }
    Lmain.classList.add('l_main');
    main.classList.add('')
    Rmain.classList.add('r_main');
}

function mainSlideFromR(total,count){}*/