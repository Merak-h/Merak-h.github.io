let openNav = false;
const switchHbgMenu = ()=>{
    const hbgMenuContainer = document.getElementById('hbgMenuContainer');
    if(!openNav){
        openNav=true;
        hbgMenuContainer.classList.remove('hidden');
    }else{
        openNav=false;
        hbgMenuContainer.classList.add('hidden');
    }
    
}

const hbgMenuButton = document.getElementById('hbgMenuButton');
hbgMenuButton.addEventListener('click',()=>{
    console.log('vvvdd')
    switchHbgMenu();
    console.log(openNav)
})