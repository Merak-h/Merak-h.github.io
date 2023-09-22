
    // ############################
    // ##      設定のギミック      ##
    // ############################
    const prizeRarityListN = document.getElementById('prizeRarityListN');
    const prizeRarityListR = document.getElementById('prizeRarityListR');
    const prizeRarityListSR = document.getElementById('prizeRarityListSR');
    const prizeRarityListSSR = document.getElementById('prizeRarityListSSR');
    const prizeRarityListUR = document.getElementById('prizeRarityListUR');
    // 初期化
    load();
    function load(){
        
        history();
        
        const retrievedJsonText = localStorage.getItem("settingDate");
        const settingData =  JSON.parse(retrievedJsonText);
        if(settingData===null){
            setStrage()
            return}

        const setRate = document.querySelectorAll('.setRate');
        for(i=0; i<setRate.length; i++){
            setRate[i].value = settingData['rarity'][i]
        }
        for(prize of settingData['prizes']['N']){
            addPrizeList(prize,"N")
        }
        for(prize of settingData['prizes']['R']){
            addPrizeList(prize,"R")
        }
        for(prize of settingData['prizes']['SR']){
            addPrizeList(prize,"SR")
        }
        for(prize of settingData['prizes']['SSR']){
            addPrizeList(prize,"SSR")
        }
        for(prize of settingData['prizes']['UR']){
            addPrizeList(prize,"UR")
        }
    }


    // 更新
    const ratePreview = document.getElementById('ratePreview');
    const setRate = document.querySelectorAll('.setRate');
    sumRate()
    for(elm of setRate){
        elm.addEventListener('keyup',()=>{sumRate();setStrage();});
        elm.addEventListener('change',()=>{sumRate();setStrage();});
    }
    // ratePreview 用
    function sumRate(){
        let sum=0;
        for(elm of setRate){
            sum += Number(elm.value);
        }
        ratePreview.innerHTML=sum;
    }

    const prizeName = document.getElementById('prizeName');
    const prizeRarity = document.getElementById('prizeRarity');
    const prizeAddButton = document.getElementById('prizeAddButton');

    // 読み込みエラーが出るので一番上に移動した
    // const prizeRarityListN = document.getElementById('prizeRarityListN');
    // const prizeRarityListR = document.getElementById('prizeRarityListR');
    // const prizeRarityListSR = document.getElementById('prizeRarityListSR');
    // const prizeRarityListSSR = document.getElementById('prizeRarityListSSR');
    // const prizeRarityListUR = document.getElementById('prizeRarityListUR');

    prizeAddButton.addEventListener('click',()=>{
        const prizeNameValue = prizeName.value;
        if(prizeNameValue!=''){
            prizeName.value='';
            const prizeRarityValue = prizeRarity.value;
            addPrizeList(prizeNameValue,prizeRarityValue)
            setStrage();
        }
    })

    // リストの生成
    function addPrizeList(prizeName,prizeRarity){
        const Newcard = document.createElement('li');
        const name = document.createElement('p');
        name.innerHTML=prizeName;
        const rarity = document.createElement('p');
        rarity.innerHTML = prizeRarity;
        const button = document.createElement('button');
        button.innerHTML="編集";

        Newcard.appendChild(name);
        Newcard.appendChild(rarity);
        Newcard.appendChild(button);

        button.addEventListener('click',()=>{
            const nameInput = document.createElement('input');
            nameInput.value=prizeName;

            const rarityInput = document.createElement('select');

            const opN = document.createElement('option');
            opN.value="N";
            opN.innerHTML="N";
            if(prizeRarity=="N"){opN.selected=true}
            rarityInput.appendChild(opN);

            const opR = document.createElement('option');
            opR.value="R";
            opR.innerHTML="R";
            if(prizeRarity=="R"){opR.selected=true}
            rarityInput.appendChild(opR);

            const opSR = document.createElement('option');
            opSR.value="SR";
            opSR.innerHTML="SR";
            if(prizeRarity=="SR"){opSR.selected=true}
            rarityInput.appendChild(opSR);

            const opSSR = document.createElement('option');
            opSSR.value="SSR";
            opSSR.innerHTML="SSR";
            if(prizeRarity=="SSR"){opSSR.selected=true}
            rarityInput.appendChild(opSSR);

            const opUR = document.createElement('option');
            opUR.value="UR";
            opUR.innerHTML="UR";
            if(prizeRarity=="UR"){opUR.selected=true}
            rarityInput.appendChild(opUR);
            

            // const cancelButton = document.createElement('button');
            // cancelButton.innerHTML="キャンセル";

            const SaveButton = document.createElement('button');
            SaveButton.innerHTML="保存";

            const deleteButton = document.createElement('button');
            deleteButton.classList.add('deleteButton')
            deleteButton.innerHTML="削除";
            
            Newcard.innerHTML=''
            Newcard.appendChild(nameInput);
            Newcard.appendChild(rarityInput);
            // Newcard.appendChild(cancelButton);
            Newcard.appendChild(deleteButton);
            Newcard.appendChild(SaveButton);

            SaveButton.addEventListener('click',()=>{
                addPrizeList(nameInput.value,rarityInput.value);
                Newcard.remove();
                setStrage();
            })

            // cancelButton.addEventListener('click',()=>{
            //     nameInput.remove();
            //     rarityInput.remove();
            //     rarityInput.remove();
            //     SaveButton.remove();
            //     cancelButton.remove();
            //     deleteButton.remove();
            //     Newcard.appendChild(name);
            //     Newcard.appendChild(rarity);
            //     Newcard.appendChild(button);

            // })
            deleteButton.addEventListener('click',()=>{
                Newcard.remove();
                setStrage();
            })
        })
                
        switch(prizeRarity){
            case "N":
                prizeRarityListN.appendChild(Newcard);    
                Newcard.classList.add('cardN');
                break;
            case "R":
                prizeRarityListR.appendChild(Newcard); 
                Newcard.classList.add('cardR'); 
                break;
            case "SR":
                prizeRarityListSR.appendChild(Newcard);
                Newcard.classList.add('cardSR');
                break;
            case "SSR":
                prizeRarityListSSR.appendChild(Newcard);
                Newcard.classList.add('cardSSR');
                break;
            case "UR":
                prizeRarityListUR.appendChild(Newcard);
                Newcard.classList.add('cardUR');
                break;
        }

    }

    const saveData = document.getElementById('saveData');
    
    
    
    saveData.addEventListener('click',()=>{
        
        setStrage();
        let e=0;
        const setRate = document.querySelectorAll('.setRate');
        for(i=0; i<setRate.length; i++){
            e += Number(setRate[i].value)
        }
        if(e!=100){
            alert("確率の合計が100%になっていません！")
        }
    })
    function setStrage(){
        const listOfN = ()=>{
            const elms = document.querySelectorAll('.cardN');
            let array = [];
            for(elm of elms){
                array.push(elm.querySelector('p').innerHTML);
            }
            return array;
        }
        const listOfR = ()=>{
            const elms = document.querySelectorAll('.cardR');
            let array = [];
            for(elm of elms){
                array.push(elm.querySelector('p').innerHTML);
            }
            return array;
        }
        const listOfSR = ()=>{
            const elms = document.querySelectorAll('.cardSR');
            let array = [];
            for(elm of elms){
                array.push(elm.querySelector('p').innerHTML);
            }
            return array;
        }
        const listOfSSR = ()=>{
            const elms = document.querySelectorAll('.cardSSR');
            let array = [];
            for(elm of elms){
                array.push(elm.querySelector('p').innerHTML);
            }
            return array;
        }
        const listOfUR = ()=>{
            const elms = document.querySelectorAll('.cardUR');
            let array = [];
            for(elm of elms){
                array.push(elm.querySelector('p').innerHTML);
            }
            return array;
        }

        
        const listOfRarity = ()=>{
            const array = [];
            const setRate = document.querySelectorAll('.setRate');
            for(elm of setRate){
                array.push(elm.value);
            }
            return array;
        }
        const newArrayOfData ={
            rarity : listOfRarity(),
            prizes : {
                N : listOfN(),
                R : listOfR(),
                SR : listOfSR(),
                SSR : listOfSSR(),
                UR : listOfUR()
            }
        }
        const jsonText = JSON.stringify(newArrayOfData);
        localStorage.setItem("settingDate", jsonText);
        makeSuggestPrizes();
    }


// ############################
// ##         ルレット        ##
// ############################

const rouletteRutton = document.getElementById('rouletteRutton');
const relief = document.getElementById('relief');
const reliefSaved=localStorage.getItem("relief") === "true";

relief.checked=reliefSaved;

    relief.addEventListener('change',()=>{
        localStorage.setItem("relief", relief.checked);
    })




rouletteRutton.addEventListener('click',()=>{

    const contaierResult = document.getElementById('contaierResult');
    const inputValue = document.getElementById('listenerInput').value;
    const listenerInput = inputValue === "" ? "未設定" : inputValue;
    const listener = document.getElementById('listener');
    const listOfResult = document.getElementById('listOfResult');

    const times = document.getElementById('times').value;
    listOfResult.innerHTML='';
    rouletteRutton.classList.add('activeButton');
    rouletteRutton.disabled = true;
    setTimeout(()=>{
        rouletteRutton.disabled = false;
        rouletteRutton.classList.remove('activeButton');
        const relief = document.getElementById('relief');


        
        const retrievedJsonText = localStorage.getItem("settingDate");
        const settingData =  JSON.parse(retrievedJsonText);

        for(i=0; i<times; i++){
            let result
            if(relief.checked && i % 10 === 9 && settingData.prizes.SSR!=''){
                let boolen = true;
                while(boolen){
                    result = roulette();
                    if(result[1]=="SSR"){boolen=false}
                }
            }else{
                result = roulette();
            }
            if(!result){break}
            if(i==0){listener.innerHTML=listenerInput}
            const card = document.createElement('li');
            listOfResult.appendChild(card);
            const elmResultRarity = document.createElement('p');
            elmResultRarity.innerHTML=result[1];
            const elmResultName = document.createElement('p');
            elmResultName.innerHTML = result[0]
            card.appendChild(elmResultRarity);
            card.appendChild(elmResultName);
            result.push(listenerInput)
            saveResult(result);
        }
        history();
    }, 300);
})

function roulette(){
    const retrievedJsonText = localStorage.getItem("settingDate");
    const settingData =  JSON.parse(retrievedJsonText);
//     if(settingData==null){
//     alert("アイテムが設定されてません！");
//     return false;
//    }
   const prizes = settingData['prizes'];
   if(prizes['N'].length==0 && prizes['R'].length==0 && prizes['SR'].length==0 && prizes['SSR'].length==0 && prizes['UR'].length==0){
    alert("アイテムが設定されてません！");
    return false;
   }
   const n = Number(settingData['rarity'][0])*0.01;
   const ns = Number(settingData['rarity'][0])
   const r = Number(settingData['rarity'][1])*0.01;
   const rs = Number(settingData['rarity'][1])
   const sr = Number(settingData['rarity'][2])*0.01;
   const srs = Number(settingData['rarity'][2])
   const ssr = Number(settingData['rarity'][3])*0.01;
   const ssrs = Number(settingData['rarity'][3])
   const ur = Number(settingData['rarity'][4])*0.01;
   const urs = Number(settingData['rarity'][4])
   // n+r+sr+ssr+ur=１になる想定
   
   if(ns+rs+srs+ssrs+urs!=100){
       alert('確率の合計が100%になっていません！');
       return false;
    }
    let boolen = true;
    while(boolen){
        let setRarity = '';
        const rarity = Math.random();
        if(rarity<=n){
            setRarity = 'N';
        }else if(rarity<=n+r){
            setRarity = 'R';
        }else if(rarity<=n+r+sr){
            setRarity = 'SR';
        }else if(rarity<=n+r+sr+ssr){
            setRarity = 'SSR';
        }else{
            setRarity = 'UR';
        }

        const prize = Math.random();
        const length = settingData['prizes'][setRarity].length;
        const index = Math.floor(prize*length);
        const setPrize = settingData['prizes'][setRarity][index];
        if(setPrize!=undefined){
            boolen=false;
            return[setPrize, setRarity];
        }
    }
}

function saveResult(result){
    let logId = 0;
    // ローカルストレージに保存
    const retrievedJsonText = localStorage.getItem("gamelog");
    const data =  JSON.parse(retrievedJsonText);
    let history =[];
    if(data){
        history= data;
        if(data[data.length-1]!=undefined){

            logId = Number(data[data.length-1].id) + 1;
        }
        // if(data[data.length-1].id!=null){
        // }
    }
    const newResult={id:logId,listener:result[2],prizeRarity:result[1],prizeName:result[0]}
    
    history.push(newResult);
    const jsonText = JSON.stringify(history);
    localStorage.setItem("gamelog", jsonText);

    // 履歴の所に表示
    // 履歴の変更処理

}
function history(){
    
    let data = searchHistory();
    
    
    showHistory(data)
    const filterInputListener = document.getElementById('filterInputListener');
    const filterInputPrise = document.getElementById('filterInputPrise');
    const filterInputRarity = document.getElementById('filterInputRarity');
    const filterButton = document.getElementById('filterButton');
    const filterCreaButton = document.getElementById('filterCreaButton');
    filterButton.addEventListener('click',()=>{
        
        data = searchHistory();
        
        showHistory(data)
    });
    filterCreaButton.addEventListener('click',()=>{
        filterInputListener.value=''
        filterInputPrise.value=''
        filterInputRarity.value=''
        
        data = searchHistory();
        
        
        showHistory(data)
    });
}
function showHistory(data){
    
    const listOfHistory = document.getElementById('listOfHistory');
    listOfHistory.innerHTML=''
    
    if(data==null){
        
        return
    }
    for(i=data.length-1; 0<=i; i--){
        
        const dataI = data[i];
        const cardElm = document.createElement('li');
        cardElm.setAttribute('data-id',dataI.id)
        const listenerElm = document.createElement('p');
        listenerElm.classList.add('histroyListener')
        listenerElm.innerHTML=dataI.listener;
        if(dataI.listener==''){listenerElm.innerHTML='名前未設定'}
        const priseElm = document.createElement('p');
        priseElm.classList.add('histroyPrise')
        priseElm.innerHTML = dataI.prizeName
        const rarityElm = document.createElement('p');
        rarityElm.classList.add('histroyRarity')
        rarityElm.innerHTML = dataI.prizeRarity
        const editButton = document.createElement('button');
        editButton.classList.add('HistoryEditButton')
        editButton.innerHTML="編集";

        cardElm.appendChild(listenerElm);
        cardElm.appendChild(priseElm);
        cardElm.appendChild(rarityElm);
        cardElm.appendChild(editButton);
        listOfHistory.appendChild(cardElm);

        editButton.addEventListener('click',()=>{
            cardElm.innerHTML='';

            const listenerInputElm = document.createElement('input');
            listenerInputElm.value=dataI.listener;
            listenerInputElm.classList.add('histroyListenerEdit')
            const priseInputElm = document.createElement('p');
            priseInputElm.classList.add('histroyPrise')
            priseInputElm.innerHTML = dataI.prizeName
            const rarityInputElm = document.createElement('p');
            rarityInputElm.classList.add('histroyRarity')
            rarityInputElm.innerHTML = dataI.prizeRarity
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('histroyDeleteButton')
            deleteButton.innerHTML="削除";
            // const cancelButton = document.createElement('button');
            // cancelButton.innerHTML="キャンセル";
            const saveButton = document.createElement('button');
            saveButton.classList.add('HistoryEditButton')
            saveButton.innerHTML="保存";
            
            
            cardElm.appendChild(listenerInputElm);
            cardElm.appendChild(priseInputElm);
            cardElm.appendChild(rarityInputElm);
            cardElm.appendChild(deleteButton);
            // cardElm.appendChild(cancelButton);
            cardElm.appendChild(saveButton);

            // cancelButton.addEventListener('click',()=>{
            //     cardElm.innerHTML="";
            //     cardElm.appendChild(listenerElm);
            //     cardElm.appendChild(priseElm);
            //     cardElm.appendChild(rarityElm);
            //     cardElm.appendChild(editButton);
            // })

            deleteButton.addEventListener('click',()=>{
                const userConfirmed = confirm("本当に削除しますか？");
                if (userConfirmed) {
                    // ユーザーが OK をクリックした場合の動作
                    const retrievedJsonText = localStorage.getItem("gamelog");
                    const allData = JSON.parse(retrievedJsonText);
                    
                    const ndwData = allData.filter((item) => {
                        
                        // Number(item.id) != dataI.id
                        if(Number(item.id) == dataI.id){
                            return false;
                            
                        }else{
                            
                            return true;
                        }
                    });
                    
                    const jsonText = JSON.stringify(ndwData);
                    localStorage.setItem("gamelog", jsonText);
                    cardElm.remove();

                } else {
                    // ユーザーが Cancel をクリックした場合の動作
                    cardElm.innerHTML='';
                    cardElm.appendChild(listenerElm);
                    cardElm.appendChild(priseElm);
                    cardElm.appendChild(rarityElm);
                    cardElm.appendChild(editButton);
                    return
                }
            })
            saveButton.addEventListener('click',()=>{


                    cardElm.innerHTML="";
                    listenerElm.innerHTML=listenerInputElm.value;
                    cardElm.appendChild(listenerElm);
                    
                    cardElm.appendChild(priseElm);
                    cardElm.appendChild(rarityElm);
                    cardElm.appendChild(editButton);

                    const retrievedJsonText = localStorage.getItem("gamelog");
                    const allData = JSON.parse(retrievedJsonText);
                    
                    const newData = allData.map(item => {
                        if (item.id === dataI.id) {
                            // ES6のオブジェクトのスプレッド構文を使用して、新しい値を統合します。
                            return { ...item, listener: listenerInputElm.value};
                        }
                        return item;  // 一致しない場合、元のアイテムをそのまま返します。
                    });
                    
                    const jsonText = JSON.stringify(newData);
                    localStorage.setItem("gamelog", jsonText);
                    
                    

            })
        })
    }
}

function searchHistory() {
    const retrievedJsonText = localStorage.getItem("gamelog");
    const history = JSON.parse(retrievedJsonText);

    if (history === null) { return null; }

    const listenerValue = document.getElementById('filterInputListener').value;
    const prizeNameValue = document.getElementById('filterInputPrise').value;
    const inputValue = document.getElementById('filterInputRarity').value;
    const prizeRarityValue = inputValue === "未選択" ? "" : inputValue;

    
    return history.filter((item) =>{
        let b0=false;
        let b1=false;
        let b2=false;
        if(listenerValue!=null && listenerValue!=""){
            const regex = new RegExp("^" + listenerValue + "$");
            b0=regex.test(item.listener)
        }else{b0=true}
        if(prizeNameValue!=null && prizeNameValue!=""){
            const regex = new RegExp("^" + prizeNameValue + "$");
            b1=regex.test(item.prizeName)
        }else{b1=true}
        if(prizeRarityValue!=null && prizeRarityValue!=""){
            const regex = new RegExp("^" + prizeRarityValue + "$");
            b2=regex.test(item.prizeRarity)
        }else{b2=true}
        if(b0 && b1 && b2){
            
            
            
            return true;
        }else{
            return false;
        }
    });
}


const resetHistroyButton = document.getElementById('resetHistroyButton');
resetHistroyButton.addEventListener('click',()=>{
    const userConfirmed = confirm("本当に履歴をリセットしますか？");
                if (userConfirmed) {
                    // ユーザーが OK をクリックした場合の動作
                    const listOfHistory = document.getElementById('listOfHistory');
                    listOfHistory.innerHTML='';
                    const jsonText = JSON.stringify([]);
                    localStorage.setItem("gamelog", jsonText);
                    alert("履歴を削除しました。")

                } else {
                    // ユーザーが Cancel をクリックした場合の動作
                    return
                }
})

const switchRoulette = document.getElementById('switchRoulette');
const switchHistroy = document.getElementById('switchHistroy');
const switchSetting = document.getElementById('switchSetting');
const contaiers = document.querySelectorAll('.container')
    contaiers[1].classList.remove('hidden');
    contaiers[2].classList.add('hidden');
    contaiers[0].classList.add('hidden');
    switchRoulette.classList.add('selected');
    switchHistroy.classList.remove('selected');
    switchSetting.classList.remove('selected');
switchRoulette.addEventListener('click',()=>{
    contaiers[1].classList.remove('hidden');
    contaiers[2].classList.add('hidden');
    contaiers[0].classList.add('hidden');
    switchRoulette.classList.add('selected');
    switchHistroy.classList.remove('selected');
    switchSetting.classList.remove('selected');
})
switchHistroy.addEventListener('click',()=>{
    contaiers[1].classList.add('hidden');
    contaiers[2].classList.remove('hidden');
    contaiers[0].classList.add('hidden');
    switchRoulette.classList.remove('selected');
    switchHistroy.classList.add('selected');
    switchSetting.classList.remove('selected');
})
switchSetting.addEventListener('click',()=>{
    contaiers[1].classList.add('hidden');
    contaiers[2].classList.add('hidden');
    contaiers[0].classList.remove('hidden');
    switchRoulette.classList.remove('selected');
    switchHistroy.classList.remove('selected');
    switchSetting.classList.add('selected');
})
    

// 回数のサジェスト

const times = document.getElementById('times');
const timesSuggest = document.getElementById('timesSuggest');
const timesSuggestCard = document.querySelectorAll('.timesSuggest');
times.addEventListener('focus',()=>{
    
    timesSuggest.classList.add('show');
    timesSuggest.classList.remove('hidden');
    overFlowToBottom();
    // setTimeout(() => {
    //     times.select();
    // }, 10);
})
for(card of timesSuggestCard){
    card.addEventListener('click',(e)=>{
        times.value=e.target.innerHTML;
        timesSuggest.classList.add('hidden');
        timesSuggest.classList.remove('show');
    })
}
times.addEventListener('keyup',(e)=>{
    if(e.key=='Enter'){
        timesSuggest.classList.add('hidden');
        timesSuggest.classList.remove('show');
        times.blur();
    }
})
document.addEventListener('click',(e)=>{
    if(e.target== timesSuggest || event.target.classList.contains('timesSuggest') || e.target== times){

    }else{
        timesSuggest.classList.add('hidden');
        timesSuggest.classList.remove('show');
    }
})


// ルーレット画面のリスナーさん入力サジェスト
const listenerInput = document.getElementById('listenerInput')
const listenerInputSuggest =document.getElementById('listenerInputSuggest');



listenerInput.addEventListener('focus',()=>{
    listenerInputSuggest.classList.add('show');
    const e={key:''}
    makeSuggest(e);
    // setTimeout(() => {
    //     listenerInput.select();
    // }, 10);
})
listenerInput.addEventListener('keyup',(e)=>{makeSuggest(e)})
function makeSuggest(e){
    const retrievedJsonText = localStorage.getItem("gamelog");
    const gamelog =  JSON.parse(retrievedJsonText);
    if(gamelog==null ||gamelog.length==0){
        listenerInputSuggest.classList.remove('show');
        listenerInputSuggest.classList.add('hidden');
        return
    }
    if(e.key=="Enter"){
        listenerInput.blur();
        listenerInputSuggest.classList.remove('show');
        listenerInputSuggest.classList.add('hidden');
        return
    }
    listenerInputSuggest.innerHTML='';
    const inputText=listenerInput.value;
    const filteredNames = gamelog
    .filter(item => item.listener.includes(inputText) && item.listener !== "未設定")
    .map(item => item.listener);
    const uniqueNames = [...new Set(filteredNames)];
    for(listener of uniqueNames){
        const card = document.createElement('li');
        card.classList.add('listenerInputSuggestCard');
        card.innerHTML= listener;
        listenerInputSuggest.appendChild(card);
        card.addEventListener('click',(e)=>{
            listenerInput.value=e.target.innerHTML;
            listenerInputSuggest.classList.remove('show');
            listenerInputSuggest.classList.add('hidden');
        })
        
    }
    overFlowToBottom();
}
document.addEventListener('click',(e)=>{
    if(e.target== listenerInputSuggest || event.target.classList.contains('listenerInputSuggestCard') || e.target== listenerInput){

    }else{
            listenerInputSuggest.classList.remove('show');
            listenerInputSuggest.classList.add('hidden');
    }
})


overFlowToBottom();
function overFlowToBottom(){
    const a =document.getElementById('listenerInputSuggest');
    const b =document.getElementById('timesSuggest');
    const c =document.getElementById('filterInputListenerSuggest');
    a.scrollTop = a.scrollHeight;
    b.scrollTop = b.scrollHeight;
    c.scrollTop = c.scrollHeight;
}


// <div>
//     <input class="filterInput" id="filterInputListener" type="text" placeholder="リスナー名">
//     <ul id="filterInputListenerSuggest"></ul>
// </div>
// <div>
//     <input class="filterInput" id="filterInputPrise" type="text" placeholder="景品名">
//     <ul id="filterInputPriseSuggest"></ul>
// </div>

// フィルター画面のリスナーさん入力サジェスト
const filterInputListener = document.getElementById('filterInputListener')
const filterInputListenerSuggest =document.getElementById('filterInputListenerSuggest');



filterInputListener.addEventListener('focus',()=>{
    filterInputListenerSuggest.classList.add('show');
    const e={key:''}
    makeSuggestF(e);
    // setTimeout(() => {
    //     listenerInput.select();
    // }, 10);
})
filterInputListener.addEventListener('keyup',(e)=>{makeSuggestF(e)})
function makeSuggestF(e){
    const retrievedJsonText = localStorage.getItem("gamelog");
    const gamelog =  JSON.parse(retrievedJsonText);
    if(gamelog==null ||gamelog.length==0){
        filterInputListenerSuggest.classList.remove('show');
        filterInputListenerSuggest.classList.add('hidden');
        return
    }
    if(e.key=="Enter"){
        filterInputListener.blur();
        filterInputListenerSuggest.classList.remove('show');
        filterInputListenerSuggest.classList.add('hidden');
        return
    }
    filterInputListenerSuggest.innerHTML='';
    const inputText=filterInputListener.value;
    const filteredNames = gamelog
    .filter(item => item.listener.includes(inputText) && item.listener !== "未設定")
    .map(item => item.listener);
    const uniqueNames = [...new Set(filteredNames)];
    for(listener of uniqueNames){
        const card = document.createElement('li');
        card.classList.add('filterInputListenerSuggestCard');
        card.innerHTML= listener;
        filterInputListenerSuggest.appendChild(card);
        card.addEventListener('click',(e)=>{
            filterInputListener.value=e.target.innerHTML;
            filterInputListenerSuggest.classList.remove('show');
            filterInputListenerSuggest.classList.add('hidden');
        })
        
    }
    overFlowToBottom();
}
document.addEventListener('click',(e)=>{
    if(e.target== filterInputListenerSuggest || event.target.classList.contains('filterInputListenerSuggestCard') || e.target== filterInputListener){
        
    }else{
        console.log('ssss')
        filterInputListenerSuggest.classList.remove('show');
        filterInputListenerSuggest.classList.add('hidden');
    }
})


makeSuggestPrizes();
function makeSuggestPrizes(){
    const retrievedJsonText = localStorage.getItem("settingDate");
    const data =  JSON.parse(retrievedJsonText);
    const filterInputPrise = document.getElementById('filterInputPrise');
    filterInputPrise.innerHTML="";
    const defaultCard = document.createElement('option');
    defaultCard.innerHTML="未設定";
    defaultCard.value="";
    defaultCard.selected=true;
    filterInputPrise.appendChild(defaultCard);
    const prizes = [].concat(...Object.values(data.prizes));
    for(prize of prizes){
        const card = document.createElement('option');
        card.innerHTML=prize;
        card.value=prize;
        filterInputPrise.appendChild(card);
    }
}