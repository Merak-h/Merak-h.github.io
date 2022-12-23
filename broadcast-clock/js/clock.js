

const weekArry=["日","月","火","水","木","金","土"];

const Dyear = document.getElementById("year");
const Dmonth = document.getElementById("month");
const Dday = document.getElementById("day");
const Dweek = document.getElementById("week");
const Dnoon = document.getElementById("noon");
const Dhour = document.getElementById("hour");
const Dmin = document.getElementById("min");
const Dsec = document.getElementById("sec");



const timer = setInterval(reload, 1000);

function reload(){
    clock(Dyear, "Y");
    clock(Dmonth, "M");
    clock(Dday, "d");
    clock(Dweek, "w");
    clock(Dnoon, "n");
    clock(Dhour, "h");
    clock(Dmin, "m");
    clock(Dsec, "s");
}



function clock(element, unit){
    
    var fchild =  element.firstElementChild;
    var lchild = element.lastElementChild.textContent;
    
    let NowDate = new Date();
        
    switch(unit){
        case 'Y':
            var Now = NowDate.getFullYear();
            break;
        case 'M':
            var Now = NowDate.getMonth();
            Now+=1;
            break;
        case 'd':
            var Now = NowDate.getDate();
            break;
        case 'w':
            var Now = Number(NowDate.getDay());
            Now = weekArry[Now];
            break;
        case 'n':
            var N = Number(NowDate.getHours());
            if(N<12){
                Nownoon = 0;
            }else{
                Nownoon = 1;
            }
            break;
        case 'h':
            var Now = NowDate.getHours();
            if(Now>12){
                Now -= 12;
            }
            break;
        case 'm':
            var Now = NowDate.getMinutes();
            break;
        case 's':
        var Now = NowDate.getSeconds();
        break;
        default:
    }
    //console.log(Now);

    if(Number(lchild) != Number(Now) && unit!="n" && unit != "w"){
        //is changed...
        
        const div = document.createElement('p');
        if(unit == "Y"){
            div.innerHTML = ( '0000' + Number(Now)).slice( -4 );
        }else{
            div.innerHTML = ( '00' + Number(Now)).slice( -2 );
        }
        element.prepend(div);
        element.lastElementChild.classList.add('activef');
    element.children[0].classList.add('activel');
    setTimeout(()=>{
        element.children[1].remove('activef');
        element.children[0].classList.remove('activel');
    },400);
    }
    if(unit == "n"){
        if(Nownoon == 0){
            if(lchild != "AM"){
                
            const div = document.createElement('p');
            div.innerHTML = "AM";
            element.appendChild(div);
            element.firstElementChild.classList.add('activef');
    element.children[1].classList.add('activel');
    setTimeout(()=>{
        element.children[0].remove();
        element.children[0].classList.remove('activel');
    },400);
            }
        }else{
            if(lchild != "PM"){
                
            const div = document.createElement('p');
            div.innerHTML = "PM";
            element.appendChild(div);
            element.firstElementChild.classList.add('activef');
    element.children[1].classList.add('activel');
    setTimeout(()=>{
        element.children[0].remove();
        element.children[0].classList.remove('activel');
    },400);
            }
        }
    }
    if(unit == "w"){
        if(lchild != Now){
            
            const div = document.createElement('p');
            div.innerHTML = Now;
            element.appendChild(div);
            element.firstElementChild.classList.add('activef');
    element.children[1].classList.add('activel');
    setTimeout(()=>{
        element.children[0].remove();
        element.children[0].classList.remove('activel');
    },400);
        }
    }
}





//const test = document.getElementById("test");
//addElement(test, "this is test.");


function addElement(element, value){
    var a = document.createElement('p');
    a.innerHTML= value;
    element.appendChild(a)
}
