let addButton=document.querySelector(".browser__button")
let list=document.querySelector(".list");
let listOfCities=[];



class City{
  constructor(name){
    this.name=name;
    this.temperature;
  }
 
  
  createLi(){
    
    let createDivs=()=>{
      
      let listOfDivs=[];
      for(let i=0;i<=3;i++){
        let listOfClasses=["listItem__id","listItem__city","listItem__temperature","listItem__delButton"];
        let txtContent=[listOfCities.indexOf(this)+1,this.name,`<i class="fas fa-spinner"></i>`,"USUŃ"];
       listOfDivs[i]= document.createElement("div");
       listOfDivs[i].classList.add(listOfClasses[i]);
        listOfDivs[i].innerHTML=txtContent[i]
       li.appendChild(listOfDivs[i]);
      }}
      let li=document.createElement("li");
      li.classList.add("listItem");
      li.setAttribute("data-index",listOfCities.indexOf(this))
   
    createDivs();
    list.appendChild(li)
  }
 
  
 getTemperature(){
  fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${this.name}&APPID=3400000105dc079b5c25c9439613c410`
    )
    .then(data =>data.json())
    .then(data =>{

        this.temperature=Math.trunc(data.main.temp-273);
        let place=document.querySelectorAll(".listItem__temperature");
        place[listOfCities.indexOf(this)].textContent=this.temperature;
        place[listOfCities.indexOf(this)].classList.add("listItem__temperature--active");
        let button=document.querySelectorAll(".listItem__delButton");
        button[listOfCities.indexOf(this)].classList.add("listItem__delButton--active")})


    .catch(err=>{let place=document.querySelectorAll(".listItem__temperature");
    place[listOfCities.indexOf(this)].textContent="Brak danych";
    place[listOfCities.indexOf(this)].className="listItem__temperature--active";})
  }
  removeButton(){
    
    let delButtons=document.querySelectorAll(".listItem__delButton");
    let index= listOfCities.indexOf(this);
    delButtons[index].addEventListener("click",removeCity)
  }


}

let removeCity=function(e){
  let index=e.target.parentNode.dataset.index;
  e.target.parentNode.remove();
  console.log(index)
  listOfCities[index]=null;
 
  updateId()
  saveStorage();
  }

let updateId=()=>{
  list.childNodes.forEach((el,index)=>{
    el.firstChild.textContent=index+1;
  })}


let checkRepete=function(name){
    for(el of listOfCities){
      if(el.name.toString()==name.toLowerCase()){
        return true
      }
    }
  }


let cerateCity=(name)=>{
  if(name===null||name===""){
    alert("Podaj nazwę miasta");
    return
  }
  
  if(checkRepete(name)){
    alert("To miasto jest na liście")
    return
  }
  
 
  let newCity= new City(name)
  listOfCities.push(newCity);
  newCity.createLi();
  newCity.getTemperature();
  newCity.removeButton();
  updateId()
  saveStorage()
}

let inputCity=()=>{
  let input=document.querySelector(".browser__input");
  cerateCity(input.value.toLowerCase())
  input.value=""
}

let saveStorage=()=>{
  localStorage.clear();
  localStorage.setItem("cities",JSON.stringify(listOfCities))
 
}

addButton.addEventListener("click", inputCity);



let loadStorageCities=()=>{
  
let start=JSON.parse(localStorage.getItem("cities"));
start.forEach(element => {
  if(element==null){
    return
  }
  cerateCity(element.name)
});}
loadStorageCities();