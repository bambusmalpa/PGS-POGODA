let addButton=document.querySelector(".browser__button")
let list=document.querySelector(".list");
let delButton=document.querySelectorAll(".listItem__delButton");

let inputCity=()=>{
    let input=document.querySelector(".browser__input");
   
    cerateCity(input.value.toLowerCase())
    input.value=""
}

let checkRepete=(cityName)=>{
    let listOfCities=list.querySelectorAll(".listItem");
    let arrOfDatasets=[];
    listOfCities.forEach(el=>{
      arrOfDatasets.push(el.dataset.cityName)
      
    })
    
    if(arrOfDatasets.includes(cityName)){
      return true
    }
    
}

let cerateCity=(cityName)=>{
  if(cityName==""){
    alert("podaj nazwę miasta")
    return
  }
  if(checkRepete(cityName)){
    alert("to miasto jest juz na liście")
    return
  }
  

  let createDivs=()=>{
      let listOfDivs=[]; 
      
      for(let i=0;i<=3;i++){
      let listOfClasses=["listItem__id","listItem__city","listItem__temperature","listItem__delButton"];
      listOfDivs[i]= document.createElement("div");
      listOfDivs[i].classList.add(listOfClasses[i]);
      li.appendChild(listOfDivs[i]);
    }
      listOfDivs[2].innerHTML=`<i class="fas fa-spinner"></i>`;
      listOfDivs[3].textContent="USUŃ"
  }
  let li=document.createElement("li");
  li.classList.add("listItem");
  
  createDivs();
  list.appendChild(li);

  

  let nameBox=li.querySelector(".listItem__city");
  nameBox.textContent=cityName;
  getTemperature(cityName);
  let delButton=li.querySelector(".listItem__delButton");
  delButton.addEventListener("click",removeLi)
  cityName=cityName.split(" ").join("");
  li.dataset.cityName=cityName;
  updateLiPosition();
  updateStorage();
}
let updateClasses=(city,temp)=>{
   let target= list.querySelector(`[data-city-name=${city}]`);

   target.children[2].textContent=`${temp}°C`
   target.children[2].classList.add("listItem__temperature--active");
    target.children[3].classList.add("listItem__delButton--active");
}
let showError=(city)=>{
  let target= list.querySelector(`[data-city-name=${city}]`);
  target.children[2].textContent="BRAK DANYCH";
  target.children[2].classList.add("listItem__temperature--active");
}

let getTemperature=(city)=>{
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=3400000105dc079b5c25c9439613c410`
  )
  .then(data =>data.json())
  .then(data =>{

      let temperature=Math.trunc(data.main.temp-273);
      city=city.split(" ").join("");
      updateClasses(city,temperature)
    })
.catch(err=>{
  city=city.split(" ").join("");
showError(city)})
}

let updateLiPosition=()=>{
  let listOfElements=document.querySelectorAll(".listItem");
  listOfElements.forEach((el,index)=>{
    el.firstChild.textContent=index+1;
  })}

let removeLi=(e)=>{
  e.target.parentNode.remove();
  updateLiPosition();
  updateStorage();
}

let updateStorage=()=>{
  let listOfItems=list.querySelectorAll(".listItem");
  let arrOfCities=[];
  listOfItems.forEach(el=>{
   arrOfCities.push(el.children[1].textContent)
  })
  localStorage.clear();
  localStorage.setItem("cities",JSON.stringify(arrOfCities))
}
let startingCities=()=>{
  let start=JSON.parse(localStorage.getItem("cities"));
start.forEach(element => {
  if(element==null){
    return
  }
  cerateCity(element)
});}

if(localStorage.length>0){
startingCities();}





addButton.addEventListener("click", inputCity);