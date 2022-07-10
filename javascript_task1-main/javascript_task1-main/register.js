const signUp = e => {
  let fname = document.getElementById('fname').value,
      email = document.getElementById('email').value,
      pwd = document.getElementById('pwd').value;
      mobile = document.getElementById('mobile').value;
     dob = document.getElementById('dob').value;
     gender = document.getElementsByName("gender");

     var selectedgen;
     for(let i = 0; i<gender.length; i++){
       if(gender[i].checked){
         selectedgen = gender[i].value;
       }
     }
    const id = Math.floor(Math.random()*2000);
  let formData = JSON.parse(localStorage.getItem('formData')) || [];

  let exist = formData.length &&
    JSON.parse(localStorage.getItem('formData')).some(data =>
      data.fname.toLowerCase() == fname.toLowerCase() 
    );

  if (!exist) {
    formData.push({ fname, email, pwd, mobiles: mobile, dob: dob ,Id:id ,gender:selectedgen});
    localStorage.setItem('formData', JSON.stringify(formData));
    document.querySelector('form').reset();
    document.getElementById('fname').focus();
    alert("Account Created.\n\nPlease Sign In using the link below.");
  }
  else {
    alert("Ooopppssss... Duplicate found!!!\nYou have already sigjned up");
  }
  e.preventDefault();
}

//signin 

function signIn(e) {
  let userinfo = [];
  let email = document.getElementById('email').value, pwd = document.getElementById('pwd').value;
  let formData = JSON.parse(localStorage.getItem('formData'))||[];

  let data = formData.find(user => user.email === email);
    userinfo.push(data);
   localStorage.setItem('userlogin',JSON.stringify(userinfo));
  
  let exist = formData.length &&
    formData.some(data => data.email.toLowerCase() == email && data.pwd.toLowerCase() == pwd);
  if (!exist) {
    alert("Incorrect login credentials");
  }
  else {
    location.href = "/home.html";
  }
  e.preventDefault();
}

//todolist

var elements = [];
window.onload = function () {
  if (JSON.parse(localStorage.getItem("todo-items")) != null) {
    elements = JSON.parse(localStorage.getItem("todo-items"));
  }
  console.log(elements);
  display();
};

//addtask

function addTask() {
  if (document.querySelector(".addText").value.trim() != "") {
    elements.push(document.querySelector(".addText").value.trim());

    if (localStorage.getItem("todo-items") == null) {
      localStorage.setItem("todo-items", JSON.stringify(elements));
    } else {
      localStorage.setItem("todo-items", JSON.stringify(elements));
    }
    console.log(localStorage.getItem("todo-items"));
    display();
  }
  document.querySelector(".addText").value = "";
}

//display

function display() {
  document.querySelector(".list").innerHTML = "";
  for (i in elements) {
    document.querySelector(".list").innerHTML +=
      "<center><div class='element'>" +
      elements[i] +
      "<img class='tick' src='./image/download.png' onclick='strike(" +
      i +
      ")'> <img  class='delete1' src='./image/delete.png' onclick='deleteTask(" +
      i +
      ")'> <img  class='update' src='./image/edit.png' onclick='edit("+ i +")' /></div></center>";
  }
}

//edit

let laste;
function edit(e){ 
  if(e !== undefined){
   laste = e;
  }
    
    if(document.querySelector('.hitesha').classList.contains('dis')){
      elements.splice(laste,1,document.querySelector('.addText').value);
      localStorage.setItem("todo-items", JSON.stringify(elements));
      document.querySelector('.hitesha').classList.remove('dis');
      document.querySelector('.addText').value = "";
      document.querySelector('.addText').blur();
     } else{
    document.querySelector('.hitesha').classList.add('dis');
    document.querySelector('.addText').focus();
     }
     display();
     completedtask();
};

//deletetask

function deleteTask(index) {
  elements.splice(index, 1);
  localStorage.setItem("todo-items", JSON.stringify(elements));
  display();
  completedtask();
}

//mark/unmark

function strike(index) {
  if (elements[index].includes("<strike>")) {
    elements[index] = elements[index].replace("<strike>", "");
    elements[index] = elements[index].replace("</strike>", "");
  } else {
    elements[index] = "<strike>" + elements[index] + "</strike>";
  }
  localStorage.setItem("todo-items", JSON.stringify(elements));
  display();
  completedtask();
}




// random................................

const mytime = document.querySelector('.time');
function getWeather() {
	let temperature = document.getElementById("temperature");
	let description = document.getElementById("description");
	let location = document.getElementById("location");
  
	let api = "https://api.openweathermap.org/data/2.5/weather";
	let apiKey = "f146799a557e8ab658304c1b30cc3cfd";
  
	location.innerHTML = "Locating...";
  
	navigator.geolocation.getCurrentPosition(success, error);
  
	function success(position) {
	  latitude = position.coords.latitude;
	  longitude = position.coords.longitude;
  
	  let url = api + "?lat=" + latitude + "&lon=" + longitude + "&appid="+ apiKey + "&units=imperial";
  
	  fetch(url)
		.then((response) => response.json())
		.then((data) => {
		  console.log(data);
		  let temp = data.main.temp;
		  temperature.innerHTML = temp + "° F";
		  location.innerHTML =
			data.name + " (" + latitude + "°, " + longitude + "°)";
		  description.innerHTML = data.weather[0].main;
		});
	}
  
	function error() {
	  location.innerHTML = "Unable to retrieve your location";
	}
  }
  getWeather();


setInterval(showclock,1000);

function showclock(){
    let time = new Date();
    let hour = time.getHours();
    let min = time.getMinutes();
    let sec = time.getSeconds();
    let timetype = "AM";

    if(hour>12){
        hour-=12;
        timetype ="PM";
    }
    if(hour === 0){
        hour =12;
        timetype = "AM";
    }

    hour = hour < 10 ? "0" + hour: hour;
    min = min < 10 ? "0" + min: min;
    sec = sec < 10 ? "0" + sec: sec;

    let currentTime = `${hour}:${min}:${sec} ${timetype}`;
    mytime.innerHTML = currentTime;

}
    showclock();
window.addEventListener('load', getWeather);



function logout(){
  localStorage.removeItem('userlogin');
  location.href = './registration.html';
}

document.getElementById('logout').addEventListener('click',logout);


function image() {
  fetch(`https://api.giphy.com/v1/gifs/random?api_key=w5kVyG3lzcm2yQNbIHsIImohiaZCklHH`)
      .then((response) => response.json())
      .then((data) => displayGif(data.data.images.downsized_medium.url));
}
function displayGif(url) {
  const gif2 = document.querySelector(".img");
  gif2.innerHTML = `<img src="${url}" style="width: 100px;" alt="gif">`;
}
image();
setInterval(() => {
  image();
}, 20000);

//completed-task

function completedtask(){
  document.querySelector(".com").innerHTML = "";
  document.querySelector(".pd").innerHTML = "";
  
    elements.map(e =>{ 
    if(e.includes( "<strike>")){
     let replace= e.replace('<strike>',"").trim();
     const replace1 = replace.replace("</strike>","").trim();
      let myp = document.createElement("p");
      myp.classList.add("p");
      myp.textContent=replace1;
      document.querySelector(".com").appendChild(myp);
    }else{
      let myp2 = document.createElement("p");
      myp2.classList.add("p");
      myp2.textContent=e;
      document.querySelector(".pd").appendChild(myp2);
    }
  })
}
window.addEventListener("load",completedtask);