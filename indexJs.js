let OuterField = document.querySelector(".OuterField")
let MedField = document.querySelector(".MedField")
let InField = document.querySelector(".InField")
let TopFied = document.querySelector(".TopField")
let MenuBar = document.querySelector(".MenuBar")
let InfoMenu = document.querySelector(".InfoMenu")
let ToolBar = document.querySelector(".ToolBar")

//loader
let loader = document.querySelector(".loadPage")
let loadObj = document.querySelector(".mainLogo")
let loadText = document.querySelector(".loadText")

setTimeout(function(){
  loadObj.classList.add("mainLogoActive")
  loadText.classList.add("loadTextActive")
},50)



window.addEventListener("load", function(){
  setTimeout(function(){
    loader.style.opacity = "0"
  },2500)
  setTimeout(function(){
    loader.style.display = "none"
  },3100)

})





var LifeMode =  "1"

let UnitNum = 3599
for (let i = 0; i <=UnitNum ; i++){
  InField.innerHTML += `
  <div class="InUnit" data-index="${i}" data-space="free">
  </div>
  `
}

let InUnit = document.querySelectorAll(".InUnit")

InUnit.forEach(el => {
  for (let i = 0; i <= 60; i++){
    if(el.dataset.index >= 60*(i) & el.dataset.index < 60 + 60*i)
    {
      el.style.left = `${50*parseInt(el.dataset.index - 60*i)}px`
      el.style.top= `${50 * (i)}px`

      el.dataset.x = parseInt(el.dataset.index - 60*i) +1
      el.dataset.y = i+1
    }
  }
})

let DeleteTool = document.getElementById("DeleteTool")
function deleteOnOff (){
  var filterPlane = document.getElementById("filterPlane")
  if (DeleteTool.dataset.stat == "DeletePassive"){
    DeleteTool.children[0].style.opacity = 1
    DeleteTool.children[1].classList.add("IconInvert")
    DeleteTool.dataset.stat = "DeleteActive"

    if (PlayTool.dataset.stat == "pause" && FilterTool.dataset.stat == "FilterActive"){
      play_pause()
    }
    FilterTool.children[0].style.opacity = 0
    FilterTool.children[1].classList.remove("IconInvert")
    FilterTool.dataset.stat = "FilterPassive"

    let LifeImg = document.querySelectorAll(".LifeImg")
    filterPlane.style.display = "none"


    filterType = "None"
    console.log("filterType:"+filterType)
    LifeImg.forEach(eI =>{
      
      eI.style.zIndex = 0
    })
    
  }
  else if (DeleteTool.dataset.stat == "DeleteActive"){
    DeleteTool.children[0].style.opacity = 0
    DeleteTool.children[1].classList.remove("IconInvert")
    DeleteTool.dataset.stat = "DeletePassive"
  }
}

let FilterTool = document.getElementById("FilterTool")
var filterInterval;
function filterOnOff (){
  var filterPlane = document.getElementById("filterPlane")
  if (FilterTool.dataset.stat == "FilterPassive"){
    FilterTool.children[0].style.opacity = 1
    FilterTool.children[1].classList.add("IconInvert")
    FilterTool.dataset.stat = "FilterActive"
   
    DeleteTool.children[0].style.opacity = 0
    DeleteTool.children[1].classList.remove("IconInvert")
    DeleteTool.dataset.stat = "DeletePassive"
    console.log( FilterTool.dataset.stat)
    filterPlane.style.display = "inline-block"
    if (PlayTool.dataset.stat == "playing"){
      play_pause()
    }
   filterCheck()
  }
  else if (FilterTool.dataset.stat == "FilterActive"){
    FilterTool.children[0].style.opacity = 0
    FilterTool.children[1].classList.remove("IconInvert")
    FilterTool.dataset.stat = "FilterPassive"
    console.log( FilterTool.dataset.stat)

    let LifeImg = document.querySelectorAll(".LifeImg")
    filterPlane.style.display = "none"
    if (PlayTool.dataset.stat == "pause"){
      play_pause()
    }

    filterType = "None"
    console.log("filterType:"+filterType)
    LifeImg.forEach(eI =>{
      
      eI.style.zIndex = 0
    })

  }
}

let PlayTool = document.getElementById("PlayTool")

function play_pause (){
  if (PlayTool.dataset.stat == "playing"){
    PlayTool.dataset.stat = "pause"
    PlayTool.innerHTML = `<img src="images/play.fill@5x.png" class="ToolIcon4">`
    console.log("pause")
  }
  else if (PlayTool.dataset.stat == "pause"){
    PlayTool.dataset.stat = "playing"
    PlayTool.innerHTML = `<img src="images/pause.fill@5x.png" class="ToolIcon3">`
    console.log("play")
  }
}

function play_pause_buffer(){
  if (FilterTool.dataset.stat == "FilterPassive"){
    play_pause ()
  }
}

let ShowTool = document.getElementById("ShowTool")
let ShowIcon = document.getElementById("ShowIcon")

function show_hide (){
  if (ShowTool.dataset.stat == "showing"){
    MenuBar.classList.add("MenuBarHidden")
    ToolBar.classList.add("ToolBarHidden")
    ShowIcon.style.rotate = "-180deg"
    ShowTool.dataset.stat = "hiding"
    console.log("hide")
  }
  else if (ShowTool.dataset.stat == "hiding"){
    MenuBar.classList.remove("MenuBarHidden")
    ToolBar.classList.remove("ToolBarHidden")
    ShowIcon.style.rotate = "0deg"
    ShowTool.dataset.stat = "showing"
    console.log("show")
  }
}

let GridTool = document.getElementById("GridTool")

function grid (){
  if (GridTool.dataset.stat == "showing"){
    InUnit.forEach(el=>{
      el.classList.add("InUnitHidden")
    })
    GridTool.dataset.stat = "hiding"
  }
  else if (GridTool.dataset.stat == "hiding"){
    InUnit.forEach(el=>{
      el.classList.remove("InUnitHidden")
    })
    GridTool.dataset.stat = "showing"
  }
}
let minousValue = 10
InUnit.forEach(el =>{
  el.addEventListener("mousedown", function(){
    if (el.dataset.space == "free" && DeleteTool.dataset.stat == "DeletePassive"){
      if (LifeMode == 1){
        LifeNum += 1
        el.dataset.space = "occupied"
        el.dataset.LifeType = "1"
        el.dataset.health = 5
        console.log
        let rand = Math.floor(Math.random()*3)+1
        TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(el.style.top)-minousValue}px; left:${parseInt(el.style.left)-minousValue}px;">`
      }
      else if (LifeMode == 2){
        LifeNum += 1
        el.dataset.space = "occupied"
        el.dataset.LifeType = "2"
        el.dataset.health = 2
        let rand = Math.floor(Math.random()*3)+1
        TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg" style="top:${parseInt(el.style.top)-minousValue}px; left:${parseInt(el.style.left)-minousValue}px;">`
      }
      else if (LifeMode == 3){
        LifeNum += 1
        el.dataset.space = "occupied"
        let rand = Math.floor(Math.random()*4)+1
        if (rand == 4){
          el.dataset.LifeType = "3s"
          el.dataset.health = 3
        }
        else {
          el.dataset.LifeType = "3"
          el.dataset.health = 3
        }
        TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(el.style.top)-minousValue}px; left:${parseInt(el.style.left)-minousValue}px;">`
      }
      else if (LifeMode == 4){
        LifeNum += 1
        el.dataset.space = "occupied"
        el.dataset.LifeType = "4"
        el.dataset.health = 2
        let rand = Math.floor(Math.random()*4)+1
        TopFied.innerHTML +=   `<img src="images/LifeGreen${rand}.png" class="LifeImg4Field LifeImg" style="top:${parseInt(el.style.top)-minousValue}px; left:${parseInt(el.style.left)-minousValue}px;">`
      }
      else if (LifeMode == 6){
        LifeNum += 1
        el.dataset.space = "occupied"
        el.dataset.LifeType = "6"
        el.dataset.health = 5
        let rand = Math.floor(Math.random()*2)+1
        TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(el.style.top)-minousValue}px; left:${parseInt(el.style.left)-minousValue}px;">`
      }
      else if (LifeMode == 7){
        el.dataset.space = "occupied"
        el.dataset.LifeType = "wall"
        el.dataset.health = 7
        el.innerHTML = `  <div class="wall">
                                  <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                  </div>`
      }

    }

    else if (DeleteTool.dataset.stat == "DeleteActive" && el.dataset.x != 1 && el.dataset.x != 60 && el.dataset.y != 1 && el.dataset.y != 60 && el.dataset.space != "free"){
      if (el.dataset.LifeType != "wall"){
        LifeNum -= 1
      }
      el.dataset.space = "free"
      el.dataset.LifeType = "None"
      el.innerHTML = " "
      el.dataset.heath = 0
      let LifeImg = document.querySelectorAll(".LifeImg")
      LifeImg.forEach(eI =>{
        if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(el.style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(el.style.left) == 0 )){
          eI.remove()
          console.log("deleted")
         
        }
      })
    }

    if (DeleteTool.dataset.stat == "DeletePassive"){
      infoField(el.dataset.index)
    }
  })
})

//filter function
var filterType = "None"
InUnit.forEach(el =>{
  el.addEventListener("mousedown", function(){
    if (FilterTool.dataset.stat == "FilterActive"){
     filterType = el.dataset.LifeType
     filterCheck()
    }
    else{
      filterType = "None"
      //console.log("clearfilter")
    }

  })
})


function filterCheck (){
  //console.log("check")
  if (filterType != "None"){
  //console.log("checkin")
  let LifeImg = document.querySelectorAll(".LifeImg")
  InUnit.forEach(els =>{
    LifeImg.forEach(eI =>{
      if (els.dataset.LifeType != filterType){
        if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(els.style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(els.style.left) == 0 )){
        eI.style.zIndex = 0
        }
       
      }
      else {
        if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(els.style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(els.style.left) == 0 )){
          eI.style.zIndex = 2
          }
      }
    })

  })
}
}




let LifeCon = document.querySelectorAll(".LifeCon")


function LifeModeSelect (LifeConID){
  LifeCon.forEach(el =>{
    if (el.id == `LifeCon${LifeConID}`){
      el.classList.add("LifeConSelected")
      LifeMode = `${LifeConID}`
      var imgSRC = ""
      var infoName = ""
      var infoDetail = ""
      if (LifeMode == "1"){
        imgSRC = `images/LifeRed1.png`
        infoName = "orange"
        infoDetail = "grow quickly but spread slowly has heigh health and can slowly breaks walls"
      }
      else if (LifeMode == "2"){
        imgSRC = `images/LifeBlue1.png`
        infoName = "blue"
        infoDetail = "steadily grow and spread around has low health but releases antibiotic that can kill other lives"
      }
      else if (LifeMode == "3"){
        imgSRC = `images/LifeYellow1.png`
        infoName = "yellow"
        infoDetail = "grow quickly in group can spread over long distance using spores and can grow on dead green"
      }
      else if (LifeMode == "4"){
        imgSRC = `images/LifeGreen1.png`
        infoName = "green"
        infoDetail = "grow and spread quickly in diagonal alignment but can die by turnning brown"
      }
      else if (LifeMode == "6"){
        imgSRC = `images/LifePurple1.png`
        infoName = "purple"
        infoDetail = "spread slowly can grow on wall has heigh health" 
      }
      else if (LifeMode == "7"){
        imgSRC = `images/wallIcon.png`
        infoName = "wall"
        infoDetail = "can block most life from growing thru"
      }

      InfoMenu.innerHTML = `  <div class="InfoImgContainer">
                                <img src="${imgSRC}" class="InfoImg">
                              </div>
                              <div class="InfoName">
                              ${infoName}
                              </div>
                              <div class="InfoDetail">
                              ${infoDetail}
                              </div>
                              `
    }
    else {
      el.classList.remove("LifeConSelected")
    }
  })
}
//info starter
InfoMenu.innerHTML = `  <div class="InfoImgContainer">
                        <img src="images/LifeRed1.png" class="InfoImg">
                        </div>
                        <div class="InfoName">
                        orange
                        </div>
                        <div class="InfoDetail">
                        grow quickly but spread slowly has heigh health and can slowly breaks walls
                        </div>
                        `


var LifeTypeInd                        
function infoField(LifeIndex){
  console.log("LifeImfo")
  Life = InUnit[parseInt(LifeIndex)]
  LifeTypeInd = Life.dataset.LifeType
  var imgSRC = ""
  var infoName = ""
  var infoDetail = ""
  var imgStyle = ""
  var healthInfo = ""
  var positionX = Life.dataset.x
  var positionY = Life.dataset.y
  var areaCount = ""
  var bodyType = ""
  if (LifeTypeInd == "1"){
    imgSRC = `images/LifeRed2.png`
    infoName = "orange"
    infoDetail = "grow quickly but spread slowly has heigh health"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"5"
    areaCount = "areaCount1"
    bodyType = "body"
  }
  else if (LifeTypeInd == "2"){
    imgSRC = `images/LifeBlue3.png`
    infoName = "blue"
    infoDetail = "steadily grow and spread around has low health"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"2"
    areaCount = "areaCount2"
    bodyType = "body"
  }
  else if (LifeTypeInd == "3"){
    imgSRC = `images/LifeYellow3.png`
    infoName = "yellow"
    infoDetail = "steadily grow and spread around has low health"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"2"
    areaCount = "areaCount3"
    bodyType = "body"
  }
  else if (LifeTypeInd == "3s"){
    imgSRC = `images/LifeYellow4.png`
    infoName = "yellow"
    infoDetail = "steadily grow and spread around has low health"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"2"
    areaCount = "areaCount3"
    bodyType = "spore"
  }
  else if (LifeTypeInd == "4"){
    imgSRC = `images/LifeGreen2.png`
    infoName = "green"
    infoDetail = "steadily grow and spread around has low health"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"1"
    areaCount = "areaCount4"
    bodyType = "body"
  }
  else if (LifeTypeInd == "4d"){
    imgSRC = `images/LifeGreen3.png`
    infoName = "green"
    infoDetail = "steadily grow and spread around has low health"
    imgStyle = `style = "filter:  hue-rotate(-30deg);"`
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"0"
    areaCount = "areaCount4"
    bodyType = "dead"
  }
  else if (LifeTypeInd == "6"){
    imgSRC = `images/LifePurple2.png`
    infoName = "purple"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"3"
    areaCount = "areaCount6"
    bodyType = "body"
  }
  else if (LifeTypeInd == "wall6"){
    imgSRC = `images/LifePurple4.png`
    infoName = "purple"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    //"3"
    areaCount = "areaCount6"
    bodyType = "wall body"
  }
  else if (LifeTypeInd == "wall"){
    imgSRC = `images/wallIcon.png`
    infoName = "wall"
    healthInfo = InUnit[parseInt(LifeIndex)].dataset.health
    areaCount = "areaCount7"
    bodyType = "still"
  }



  InfoMenu.innerHTML = `  <div class="InfoImgContainer">
  <img src="${imgSRC}" class="InfoImg" ${imgStyle}>
  </div>
  <div class="InfoName">
  ${infoName}
  </div>
  <div class="InfoHealth">
  health<span class="barText"> | </span>${healthInfo}
  </div>
  <div class="InfoPosition">
  locale<span class="barText"> | </span>${positionX},${positionY}
  </div>
  <div class="InfoPopulation">
  occupied area <br><span class="InfoText"> </span>
  </div>
  <div class="InfoPart">
  type <br>
  <span class="InfobodyType">${bodyType}</span>
  </div>
`
  
}






function Clear (){
  console.log("cleared")
  TopFied.innerHTML = " "
  LifeNum = 0
  TopFied.innerHTML += `<div id="filterPlane"></div> `
  //filter off whe clear
  FilterTool.children[0].style.opacity = 0
    FilterTool.children[1].classList.remove("IconInvert")
    FilterTool.dataset.stat = "FilterPassive"
    console.log( FilterTool.dataset.stat)

    let LifeImg = document.querySelectorAll(".LifeImg")
    filterPlane.style.display = "none"
    if (PlayTool.dataset.stat == "pause"){
      play_pause()
    }

    clearInterval(filterInterval)
    filterType = "None"
    console.log("filterType:"+filterType)
    LifeImg.forEach(eI =>{
      
      eI.style.zIndex = 0
    })

  InUnit.forEach(el =>{
    if (el.dataset.x != 1 && el.dataset.x != 60 && el.dataset.y != 1 && el.dataset.y != 60 && el.dataset.LifeType != "wall"){
      if (el.dataset.LifeType == "wall6"){
        el.dataset.LifeType = "wall"
        el.dataset.space = "occupied"
      }
      else {
        el.dataset.space = "free"
        el.dataset.LifeType = "None"
      }
   
    }
  })


}

var MaxAll = 1100
var LifeNum = 0

function RedGrow (){
  if (LifeNum <= MaxAll && PlayTool.dataset.stat == "playing"){
  InUnit.forEach(el =>{
    if(el.dataset.LifeType == "1"){
      let checkPosi = parseInt(el.dataset.index)
      var growPoint = 0
      if (InUnit[checkPosi - 61].dataset.space == "free" || InUnit[checkPosi - 61].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if ( InUnit[checkPosi - 60].dataset.space == "free" || InUnit[checkPosi - 60].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi - 59].dataset.space == "free"  || InUnit[checkPosi - 59].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi - 1].dataset.space == "free" || InUnit[checkPosi - 1].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 1].dataset.space == "free" || InUnit[checkPosi + 1].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 59].dataset.space == "free" || InUnit[checkPosi + 59].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if  (InUnit[checkPosi + 60].dataset.space == "free" || InUnit[checkPosi + 60].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 61].dataset.space == "free" || InUnit[checkPosi + 61].dataset == "wal"){
        growPoint += 1
      }

      let randPoint= Math.floor(Math.random()*95)
      var trech = 6
      if (randPoint == 0){
        trech = 3
      }
      else {
        trech = 6
      }
   

      if (growPoint >= trech){
      let rand = Math.floor(Math.random()*9)
      if(rand >= 1 && rand <= 8){
      if (rand == 1){
        let posiValue = 61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 2){
        let posiValue = 60
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 3){
        let posiValue = 59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 4){
        let posiValue = 1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 5){
        let posiValue = -1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 6){
        let posiValue = -59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 7){
        let posiValue = -60
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 8){
        let posiValue = -61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health > 1 ){
          InUnit[IdValue].dataset.health -= 2
        }
        else if (InUnit[IdValue].dataset.LifeType == "wall" && InUnit[IdValue].dataset.health == 1){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "1"
          InUnit[IdValue].dataset.health = 5
          InUnit[IdValue].innerHTML = ""
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeRed${rand}.png" class="LifeImg1Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
    }
  }
    }
  })
}
}

var RedInterval = setInterval(RedGrow, 700)

function BlueGrow (){

  if (LifeNum <= MaxAll && PlayTool.dataset.stat == "playing"){
  InUnit.forEach(el =>{
    if(el.dataset.LifeType == "2"){
      setTimeout(function(){
      let checkPosi = parseInt(el.dataset.index)
      var growPoint = 0
      if (InUnit[checkPosi - 61].dataset.space == "free"){
        growPoint += 1
      }
      if ( InUnit[checkPosi - 60].dataset.space == "free" ){
        growPoint += 1
      }
      if (InUnit[checkPosi - 59].dataset.space == "free"){
        growPoint += 1
      }
      if (InUnit[checkPosi - 1].dataset.space == "free" ){
        growPoint += 1
      }
      if (InUnit[checkPosi + 1].dataset.space == "free"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 59].dataset.space == "free"){
        growPoint += 1
      }
      if  (InUnit[checkPosi + 60].dataset.space == "free"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 61].dataset.space == "free" ){
        growPoint += 1
      }

      let randPoint= Math.floor(Math.random()*2.3)
      var trech = 6
      if (randPoint == 0){
        trech = 6
      }
      else if (randPoint == 1){
        trech = 5
      }
      else if (randPoint == 2){
        trech = 7
      }
      
      var IdOValue = parseInt(el.dataset.index)
      if ( InUnit[IdOValue-1].dataset.LifeType != "wall" &&  InUnit[IdOValue-1].dataset.LifeType != "2"  &&  InUnit[IdOValue-1].dataset.LifeType != "border"&& growPoint >= 2){
        let IdValue = parseInt(el.dataset.index)
        if (InUnit[IdValue-1].dataset.health > 1){
          InUnit[IdValue-1].dataset.health -= 1
        }
        else {
          InUnit[IdValue-1].dataset.space = "free"
          InUnit[IdValue-1].dataset.LifeType = "None"
          InUnit[IdValue-1].innerHTML = " "
          InUnit[IdValue-1].dataset.health = 0
          let LifeImg = document.querySelectorAll(".LifeImg")
          LifeImg.forEach(eI =>{
            if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(InUnit[IdValue-1].style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(InUnit[IdValue-1].style.left) == 0 )){
              eI.remove()
              //console.log("deleted")
             
            }
          })
        }
      }
      if ( InUnit[IdOValue+1].dataset.LifeType != "wall" &&  InUnit[IdOValue+1].dataset.LifeType != "2" &&  InUnit[IdOValue+1].dataset.LifeType != "border"  &&  growPoint >= 2){
        let IdValue = parseInt(el.dataset.index)
        if (InUnit[IdValue+1].dataset.health > 1){
          InUnit[IdValue+1].dataset.health -= 1
        }
        else {
          InUnit[IdValue+1].dataset.space = "free"
          InUnit[IdValue+1].dataset.LifeType = "None"
          InUnit[IdValue+1].innerHTML = " "
          InUnit[IdValue+1].dataset.health = 0
          let LifeImg = document.querySelectorAll(".LifeImg")
          LifeImg.forEach(eI =>{
            if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(InUnit[IdValue+1].style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(InUnit[IdValue+1].style.left) == 0 )){
              eI.remove()
              //console.log("deleted")
             
            }
          })
        }
      }
      if ( InUnit[IdOValue-60].dataset.LifeType != "wall" &&  InUnit[IdOValue-60].dataset.LifeType != "2" &&  InUnit[IdOValue-60].dataset.LifeType != "border" && growPoint >= 2){
        let IdValue = parseInt(el.dataset.index)
        if (InUnit[IdValue-60].dataset.health > 1){
          InUnit[IdValue-60].dataset.health -= 1
        }
        else {
          InUnit[IdValue-60].dataset.space = "free"
          InUnit[IdValue-60].dataset.LifeType = "None"
          InUnit[IdValue-60].innerHTML = " "
          InUnit[IdValue-60].dataset.health = 0
          let LifeImg = document.querySelectorAll(".LifeImg")
          LifeImg.forEach(eI =>{
            if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(InUnit[IdValue-60].style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(InUnit[IdValue-60].style.left) == 0 )){
              eI.remove()
              //console.log("deleted")
             
            }
          })
        }
      }
      if ( InUnit[IdOValue+60].dataset.LifeType != "wall" &&  InUnit[IdOValue+60].dataset.LifeType != "2" && InUnit[IdOValue+60].dataset.LifeType != "border" && growPoint >= 2){
        let IdValue = parseInt(el.dataset.index)
        if (InUnit[IdValue+60].dataset.health > 1){
          InUnit[IdValue+60].dataset.health -= 1
        }
        else {
          InUnit[IdValue+60].dataset.space = "free"
          InUnit[IdValue+60].dataset.LifeType = "None"
          InUnit[IdValue+60].innerHTML = " "
          InUnit[IdValue+60].dataset.health = 0
          let LifeImg = document.querySelectorAll(".LifeImg")
          LifeImg.forEach(eI =>{
            if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(InUnit[IdValue+60].style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(InUnit[IdValue+60].style.left) == 0 )){
              eI.remove()
              //console.log("deleted")
             
            }
          })
        }
      }

      

      if (growPoint >= trech){
       
      let rand = Math.floor(Math.random()*9)
      if(rand >= 1 && rand <= 8){
      if (rand == 1){
        let posiValue = 61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        
        }
      }
      else if (rand == 2){
        let posiValue = 60
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 3){
        let posiValue = 59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 4){
        let posiValue = 1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 5){
        let posiValue = -1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 6){
        let posiValue = -59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 7){
        let posiValue = -60
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 8){
        let posiValue = -61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "2"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*3)+1
              TopFied.innerHTML +=   `<img src="images/LifeBlue${rand}.png" class="LifeImg2Field LifeImg"  style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
    }
 

  }
},200)
    }

    
  })
}
}

var BlueInterval = setInterval(BlueGrow, 1050)


function YellowGrow (){
  if (LifeNum <= MaxAll && PlayTool.dataset.stat == "playing"){
    let LifeImg4Passive = document.querySelectorAll(".LifeImg4Passive")
    //console.log(LifeImg4Passive)
  InUnit.forEach(el =>{
    if(el.dataset.LifeType == "3"){
      let checkPosi = parseInt(el.dataset.index)
      var growPoint = 0
      if (InUnit[checkPosi - 61].dataset.space == "free" || InUnit[checkPosi - 61].dataset.LifeType == "4d"){
        growPoint += 1
      }
      if ( InUnit[checkPosi - 60].dataset.space == "free" || InUnit[checkPosi - 60].dataset.LifeType == "4d"){
        growPoint += 1
      }
      if (InUnit[checkPosi - 59].dataset.space == "free"  || InUnit[checkPosi - 59].dataset.LifeType == "4d" ){
        growPoint += 1
      }
      if (InUnit[checkPosi - 1].dataset.space == "free" || InUnit[checkPosi - 1].dataset.LifeType == "4d"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 1].dataset.space == "free" || InUnit[checkPosi + 1].dataset.LifeType == "4d"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 59].dataset.space == "free" || InUnit[checkPosi + 59].dataset.LifeType == "4d"){
        growPoint += 1
      }
      if  (InUnit[checkPosi + 60].dataset.space == "free" || InUnit[checkPosi + 60].dataset.LifeType == "4d"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 61].dataset.space == "free" || InUnit[checkPosi + 61].dataset == "4d"){
        growPoint += 1
      }

      var trech = 6
      if (growPoint >= trech){
      let rand = Math.floor(Math.random()*9)
      if(rand >= 1 && rand <= 8){
      if (rand == 1){
        let posiValue = 61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                 // console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                  eP.remove()
                 }
              })
        }
      }
      else if (rand == 2){
        let posiValue = 60
        let IdValue = parseInt(el.dataset.index) - posiValue
       if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                  //console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                  eP.remove()
                 }
              })
        }
      }
      else if (rand == 3){
        let posiValue = 59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                  //console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                  eP.remove()
                 }
              })
        }
      }
      else if (rand == 4){
        let posiValue = 1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                 // console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                  eP.remove()
                 }
              })
        }
      }
      else if (rand == 5){
        let posiValue = -1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                  //console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                  eP.remove()
                 }
              })
        }
      }
      else if (rand == 6){
        let posiValue = -59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                  //console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                  eP.remove()
                 }
              })
        }
      }
      else if (rand == 7){
        let posiValue = -60
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                  //console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                  eP.remove()
                 }
              })
        }
      }
      else if (rand == 8){
        let posiValue = -61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "4d"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
              let rand = Math.floor(Math.random()*4)+1
              if (rand == 4){
                InUnit[IdValue].dataset.LifeType = "3s"
                InUnit[IdValue].dataset.health = 3
              }
              else {
                InUnit[IdValue].dataset.LifeType = "3"
                InUnit[IdValue].dataset.health = 3
              }
              TopFied.innerHTML +=   `<img src="images/LifeYellow${rand}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[IdValue].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[IdValue].style.left) == 0 )){
                 // console.log("replaces",(eP.style.top), eP.style.left,"yellow:",InUnit[IdValue].style.top,InUnit[IdValue].style.left)
                 eP.remove()
                 }
              })
        }
      }
    }
  }
    }
  })
}
}

function YellowGrow_s (){
  if (LifeNum <= MaxAll && PlayTool.dataset.stat == "playing"){
    var LifeImg4Passive = document.querySelectorAll(".LifeImg4Passive")
    var trigger =  Math.floor(Math.random()*3.2)
    if (trigger <= 1){
    InUnit.forEach(el =>{
      if(el.dataset.LifeType == "3s"){
        var rand = Math.floor(Math.random()*3600)
        let checkPosi = parseInt(el.dataset.index)
        if (rand != parseInt(InUnit[checkPosi - 61].dataset.index) && rand != parseInt(InUnit[checkPosi - 60].dataset.index) && rand != parseInt(InUnit[checkPosi - 59].dataset.index) && rand != parseInt(InUnit[checkPosi - 1].dataset.index)
          && rand != parseInt(InUnit[checkPosi + 1].dataset.index) && rand != parseInt(InUnit[checkPosi + 59].dataset.index) && rand != parseInt(InUnit[checkPosi + 60].dataset.index) && rand != parseInt(InUnit[checkPosi + 61].dataset.index)
          && rand != parseInt(InUnit[checkPosi - 120].dataset.index) && rand != parseInt(InUnit[checkPosi - 2].dataset.index) && rand != parseInt(InUnit[checkPosi + 2].dataset.index) && rand != parseInt(InUnit[checkPosi + 120].dataset.index)
          && Math.abs(parseInt(InUnit[rand].dataset.x) - parseInt(el.dataset.x) <= 11) && Math.abs(parseInt(InUnit[rand].dataset.y) - parseInt(el.dataset.y) <= 11)
          ) {
            if (InUnit[rand].dataset.space == "free" || InUnit[rand].dataset.LifeType == "4d"){
              if (InUnit[rand].dataset.space == "free"){
                LifeNum += 1
              }
                InUnit[rand].dataset.space = "occupied"
                    let rands = Math.floor(Math.random()*3)+1
                      InUnit[rand].dataset.LifeType = "3"
                      InUnit[rand].dataset.health = 3
                    TopFied.innerHTML +=   `<img src="images/LifeYellow${rands}.png" class="LifeImg3Field LifeImg" style="top:${parseInt(InUnit[rand].style.top)-minousValue}px; left:${parseInt(InUnit[rand].style.left)-minousValue}px;">`
              LifeImg4Passive.forEach(eP =>{
                if (Math.abs(parseInt(eP.style.top) + minousValue - parseInt( InUnit[rand].style.top)) == 0  && Math.abs(parseInt(eP.style.left) + minousValue - parseInt( InUnit[rand].style.left) == 0 )){
                  eP.remove()
                  //console.log("replaces")
                 }
              })

            }
          }
      }
    })
  }
  }
}


var YellowInterval = setInterval(YellowGrow, 900)
var YellowInterval_s = setInterval(YellowGrow_s, 4000)



function GreenGrow (){
  if (LifeNum <= MaxAll && PlayTool.dataset.stat == "playing"){
  InUnit.forEach(el =>{
    if(el.dataset.LifeType == "4"){
      let checkPosi = parseInt(el.dataset.index)
      var growPoint = 0
      if (InUnit[checkPosi - 61].dataset.space == "free"){
        growPoint += 1
      }
      if ( InUnit[checkPosi - 60].dataset.space == "free" ){
        growPoint += 1
      }
      if (InUnit[checkPosi - 59].dataset.space == "free"){
        growPoint += 1
      }
      if (InUnit[checkPosi - 1].dataset.space == "free" ){
        growPoint += 1
      }
      if (InUnit[checkPosi + 1].dataset.space == "free"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 59].dataset.space == "free"){
        growPoint += 1
      }
      if  (InUnit[checkPosi + 60].dataset.space == "free"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 61].dataset.space == "free" ){
        growPoint += 1
      }

      let randPoint= Math.floor(Math.random()*10)
      var trech = 6
      if (randPoint <=5){
        trech = 6
      }
      else {
        trech = 7
      }
   

      if (growPoint >= trech){
      let rand = Math.floor(Math.random()*5)
      if(rand >= 1 && rand <= 4){
      if (rand == 1){
        let posiValue = 61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "4"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*4)+1
              TopFied.innerHTML +=   `<img src="images/LifeGreen${rand}.png" class="LifeImg4Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }

      else if (rand == 2){
        let posiValue = 59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "4"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*4)+1
              TopFied.innerHTML +=   `<img src="images/LifeGreen${rand}.png" class="LifeImg4Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 3){
        let posiValue = -59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "4"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*4)+1
              TopFied.innerHTML +=   `<img src="images/LifeGreen${rand}.png" class="LifeImg4Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
      else if (rand == 4){
        let posiValue = -61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free"){
          LifeNum += 1
          InUnit[IdValue].dataset.space = "occupied"
          InUnit[IdValue].dataset.LifeType = "4"
          InUnit[IdValue].dataset.health = 2
              let rand = Math.floor(Math.random()*4)+1
              TopFied.innerHTML +=   `<img src="images/LifeGreen${rand}.png" class="LifeImg4Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
        }
      }
    }
  }
    }
  })
}
}

function GreenDecline (){
  if (LifeNum <= MaxAll && PlayTool.dataset.stat == "playing"){
    InUnit.forEach(el =>{
      if (el.dataset.LifeType == "4" && el.dataset.space !="free"){
        setTimeout(function(){
        rand = Math.floor(Math.random()*25)+1
        if(rand <= 2){
          el.dataset.LifeType = "4d"
          el.innerHTML = " "
          el.dataset.health = 0
          let LifeImg = document.querySelectorAll(".LifeImg")
          LifeImg.forEach(eI =>{
            if (Math.abs(parseInt(eI.style.top) + minousValue - parseInt(el.style.top)) == 0  && Math.abs(parseInt(eI.style.left) + minousValue - parseInt(el.style.left) == 0 )){
             eI.classList.add("LifeImg4Passive")
             
            }
          })
        }
      },800)

      }
    })
}
}

var GreenInterval = setInterval(GreenGrow, 920)
var GreenDeclineInterval = setInterval(GreenDecline, 2050)


function PurpleGrow (){
  if (LifeNum <= MaxAll && PlayTool.dataset.stat == "playing"){
  InUnit.forEach(el =>{
    if(el.dataset.LifeType == "6" || el.dataset.LifeType == "wall6" ){
      let checkPosi = parseInt(el.dataset.index)
      var growPoint = 0
      if (InUnit[checkPosi - 61].dataset.space == "free" || InUnit[checkPosi - 61].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if ( InUnit[checkPosi - 60].dataset.space == "free" || InUnit[checkPosi - 60].dataset.LifeType == "wall" ){
        growPoint += 1
      }
      if (InUnit[checkPosi - 59].dataset.space == "free" || InUnit[checkPosi - 59].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi - 1].dataset.space == "free" || InUnit[checkPosi - 1].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 1].dataset.space == "free" || InUnit[checkPosi + 1].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 59].dataset.space == "free" || InUnit[checkPosi + 59].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if  (InUnit[checkPosi + 60].dataset.space == "free" || InUnit[checkPosi + 60].dataset.LifeType == "wall"){
        growPoint += 1
      }
      if (InUnit[checkPosi + 61].dataset.space == "free" || InUnit[checkPosi + 61].dataset == "wal"){
        growPoint += 1
      }

      let randPoint= Math.floor(Math.random()*20)
      var trech = 6
      if (randPoint == 0){
        trech = 5
      }
      else {
        trech = 6
      }
   

      if (growPoint >= trech){
      let rand = Math.floor(Math.random()*9)
      if(rand >= 1 && rand <= 8){
      if (rand == 1){
        let posiValue = 61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }

        }
      }
      else if (rand == 2){
        let posiValue = 60
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
        }
      }
      else if (rand == 3){
        let posiValue = 59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
        }
      }
      else if (rand == 4){
        let posiValue = 1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
        }
      }
      else if (rand == 5){
        let posiValue = -1
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
        }
      }
      else if (rand == 6){
        let posiValue = -59
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
        }
      }
      else if (rand == 7){
        let posiValue = -60
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
        }
      }
      else if (rand == 8){
        let posiValue = -61
        let IdValue = parseInt(el.dataset.index) - posiValue
        if (InUnit[IdValue].dataset.space == "free" || InUnit[IdValue].dataset.LifeType == "wall"){
          LifeNum += 1
          if ( InUnit[IdValue].dataset.LifeType == "wall"){
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "wall6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+3
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6FieldW LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
          else {
            InUnit[IdValue].dataset.space = "occupied"
            InUnit[IdValue].dataset.LifeType = "6"
            InUnit[IdValue].dataset.health = 5
                let rand = Math.floor(Math.random()*2)+1
                TopFied.innerHTML +=   `<img src="images/LifePurple${rand}.png" class="LifeImg6Field LifeImg" style="top:${parseInt(InUnit[IdValue].style.top)-minousValue}px; left:${parseInt(InUnit[IdValue].style.left)-minousValue}px;">`
          }
        }
      }
    }
  }
    }
  })
}
}

var PurpleInterval = setInterval(PurpleGrow, 900)

//border
InUnit.forEach(el =>{
  if (el.dataset.x == 1 || el.dataset.x == 60 || el.dataset.y == 1 || el.dataset.y == 60){
    el.style.backgroundColor = "rgb(236, 236, 236)"
    el.dataset.space = "occupied"
    el.dataset.LifeType = "border"
  }
})

//counter
var orangeCount = 0
var blueCount = 0
var yellowCount = 0
var greenCount = 0
var purpleCount = 0
var wallCount = 0

let popDisplayText = document.querySelector(".popDisplayText")
setInterval(function(){
  var InfoText = document.querySelector(".InfoText")

   orangeCount = 0
   blueCount = 0
   yellowCount = 0
   greenCount = 0
   purpleCount = 0
   wallCount = 0
  InUnit.forEach(el =>{
    if (el.dataset.LifeType == "1"){
      orangeCount += 1
    }
    else if (el.dataset.LifeType == "2"){
      blueCount += 1
    }
    else if (el.dataset.LifeType == "3" || el.dataset.LifeType == "3s"){
      yellowCount += 1
    }
    else if (el.dataset.LifeType == "4" || el.dataset.LifeType == "4d"){
      greenCount += 1
    }
    else if (el.dataset.LifeType == "6" || el.dataset.LifeType == "wall6"){
      purpleCount += 1
    }
    else if (el.dataset.LifeType == "wall"){
      wallCount += 1
    }
  })
  popDisplayText.innerHTML = `population : ${LifeNum}/1100`
  if (LifeTypeInd  == "1"){
    InfoText.innerHTML = orangeCount
  }
  else if (LifeTypeInd  == "2"){
    InfoText.innerHTML = blueCount
  }
  else if (LifeTypeInd  == "3" || LifeTypeInd  == "3s"){
    InfoText.innerHTML = yellowCount
  }
  else if (LifeTypeInd  == "4" || LifeTypeInd  == "4d"){
    InfoText.innerHTML = greenCount
  }
  else if (LifeTypeInd  == "6" || LifeTypeInd  == "wall6"){
    InfoText.innerHTML = purpleCount
  }
  else if (LifeTypeInd  == "wall"){
    InfoText.innerHTML = wallCount
  }
  

  
  //InfoMenu.innerHTML = LifeNum+"  "+"orange:"+orangeCount+"blue:"+blueCount+"yellow:"+yellowCount
},300)

//Auto wall

var wallStartNum = 150
for (let i = 0; i <= wallStartNum; i++){
  var rand = Math.floor(Math.random()*3600)
  var shapeRand =  Math.floor(Math.random()*4)+1

  if  (InUnit[rand].dataset.x != 1 && InUnit[rand].dataset.x != 60 && InUnit[rand].dataset.y != 1 && InUnit[rand].dataset.y != 60){
    if(shapeRand == 1){
      InUnit[rand].dataset.space = "occupied"
      InUnit[rand].dataset.LifeType = "wall"
      InUnit[rand].innerHTML = `  <div class="wall">
                                  <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                  </div>`
      InUnit[rand].dataset.health = 7
      InUnit[rand-1].dataset.space = "occupied"
      InUnit[rand-1].dataset.LifeType = "wall"
      InUnit[rand-1].innerHTML = `  <div class="wall">
                                    <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                    </div>`
      InUnit[rand-1].dataset.health = 7
    }
    else if (shapeRand == 2){
      InUnit[rand].dataset.space = "occupied"
      InUnit[rand].dataset.LifeType = "wall"
      InUnit[rand].innerHTML = `  <div class="wall">
                                  <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                  </div>`
      InUnit[rand].dataset.health = 7
      InUnit[rand-1].dataset.space = "occupied"
      InUnit[rand-1].dataset.LifeType = "wall"
      InUnit[rand-1].innerHTML = `  <div class="wall">
                                    <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                    </div>`
      InUnit[rand-1].dataset.health = 7
      InUnit[rand+1].dataset.space = "occupied"
      InUnit[rand+1].dataset.LifeType = "wall"
      InUnit[rand+1].innerHTML = `  <div class="wall">
                                  <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                  </div>`
      InUnit[rand+1].dataset.health = 7
    }
    else if (shapeRand == 3){
      InUnit[rand].dataset.space = "occupied"
      InUnit[rand].dataset.LifeType = "wall"
      InUnit[rand].innerHTML = `  <div class="wall">
                                  <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                  </div>`
      InUnit[rand].dataset.health = 7
      InUnit[rand-60].dataset.space = "occupied"
      InUnit[rand-60].dataset.LifeType = "wall"
      InUnit[rand-60].innerHTML = `  <div class="wall">
                                    <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                    </div>`
      InUnit[rand-60].dataset.health = 7
      InUnit[rand+60].dataset.space = "occupied"
      InUnit[rand+60].dataset.LifeType = "wall"
      InUnit[rand+60].innerHTML = `  <div class="wall">
                                  <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                  </div>`
       InUnit[rand+60].dataset.health = 7
    }
    else if (shapeRand == 4){
      InUnit[rand].dataset.space = "occupied"
      InUnit[rand].dataset.LifeType = "wall"
      InUnit[rand].innerHTML = `  <div class="wall">
                                  <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                  </div>`
      InUnit[rand].dataset.health = 7
      InUnit[rand-60].dataset.space = "occupied"
      InUnit[rand-60].dataset.LifeType = "wall"
      InUnit[rand-60].innerHTML = `  <div class="wall">
                                    <img src="images/righttriangle@5x.png" class="wallCornner"> 
                                    </div>`
      InUnit[rand-60].dataset.health = 7

    }


  }
}
