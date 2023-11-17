// Dark Mode Function
let themeButton = document.getElementById("theme-button");
const toggleDarkMode = () => {
  document.body.classList.toggle("dark-mode");
}
const toggleNavContainer = () => {
  if (document.body.classList.contains("dark-mode")) {
    let navBar = document.querySelector(".nav-container");
    navBar.style.backgroundColor = "#322f2f";
    document.querySelectorAll(".nav-item a").forEach(anchor => { anchor.style.color = "lavender"; });
    themeButton.innerText = "Light Mode";
    themeButton.style.color = "lavender";
    motionButton.style.color = "lavender";
  }
  else {
    let navBar = document.querySelector(".nav-container");
    navBar.style.backgroundColor = "lightgrey";
    document.querySelectorAll(".nav-item a").forEach(anchor => { anchor.style.color = "black"; });
    themeButton.innerText = "Dark Mode";
    themeButton.style.color = "black";
    motionButton.style.color = "black";
  }

}
themeButton.addEventListener("click", toggleDarkMode);
themeButton.addEventListener("click", toggleNavContainer);

// Petition Form
let form = document.getElementById('petition-form');
let count = 0;
const addSignature = (person) => {
  let counter = document.getElementById("counter");

  let div = document.querySelector('.signature-container');

  let sig = document.createElement('div'); // Create a <div> element
  sig.textContent = `🖊️ ${person.name} from ${person.hometown} supports this cause`;
  sig.classList.add('signature');
  div.appendChild(sig);
  count = count + 1;
  counter.textContent = '🖊️ ' + count + ' people have signed this petition and support this cause';

  toggleModal(person);
};


// Form Validation
let signNowButton = document.getElementById("sign-now-button");
const validateForm = (event) => {
  event.preventDefault();
  let containsErrors = false;
  var petitionInputs = document.getElementById("petition-form").elements;

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add("error");
    } else {
      petitionInputs[i].classList.remove("error");
    }
  }

  /* Check for email */
  const email = document.getElementById('email');
  if (!email.value.includes('.com')) {
    containsErrors = true;
    email.classList.add('error');
  }
  else {
    email.classList.remove('error');
  }

  if (containsErrors == false) {

    let person = {
      name: petitionInputs[0].value,
      hometown: petitionInputs[1].value,
      email: petitionInputs[2].value
    }

    addSignature(person);
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
    }
    containsErrors = false;
  }
};
signNowButton.addEventListener('click', validateForm);

// Scroll Animation
let animation = {
  revealDistance: 100,
  initialOpacity: 0,
  transitionDuration: '1s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
}

let revealableContainers = document.querySelectorAll('.revealable')

// Contain a loop that checks each revealableContainer to see if it's in the right position to be revealed
const reveal = () => {
  // let 
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    }
    else {
      revealableContainers[i].classList.remove("active");
    }
  }
}
window.addEventListener('scroll', reveal);

// Reduce motion button
let motionButton = document.getElementById("speed-button");
const reduceMotion = () => {
  if (animation.transitionDuration === '1s') {
    animation.transitionDuration = '3s';
    motionButton.innerText = "Increase Motion";
  }
  else {
    animation.transitionDuration = '1s';
    motionButton.innerText = "Reduce Motion";
  }

  for (let i = 0; i < revealableContainers.length; i++) {
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
  }
}
motionButton.addEventListener('click', reduceMotion);

// Modal Functionality
const toggleModal = (person) => {
  let modal = document.querySelector(".modal");
  let modalContent = document.getElementById("thanks-modal-content");

  modal.style.display = "flex";
  modalContent.innerText = `Thanks ${person.name}! ${person.hometown} represent!`;

  let intervalId = setInterval(scaleImage, 500);
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);
}

// Inner Modal Animation
let scaleFactor = 1;
let modalImage = document.querySelector(".modal-content img");

const scaleImage = () => {
  scaleFactor = scaleFactor === 1 ? 0.8 : 1;
  modalImage.style.transform = `scale(${scaleFactor})`;
}

let closeModalButton = document.getElementById("close-modal");
closeModalButton.addEventListener('click', () => {
  let modal = document.querySelector(".modal");
  modal.style.display = "none";
})