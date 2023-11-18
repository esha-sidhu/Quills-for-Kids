let animation = {
  revealDistance: 150,
  initialOpacity: 0,
  transitionDelay: 0,
  transitionDuration: '2s',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease'
};

let revealableContainers = document.querySelectorAll(".revealable");

function reveal() {
  for (let i = 0; i < revealableContainers.length; i++) {
    let windowHeight = window.innerHeight;
    // Get the top position of the revealable container
    let topOfRevealableContainer = revealableContainers[i].getBoundingClientRect().top;

    if (topOfRevealableContainer < windowHeight - animation.revealDistance) {
      revealableContainers[i].classList.add("active");
    } else {
      revealableContainers[i].classList.remove("active");
    }
  }
}

window.addEventListener("scroll", reveal);

const reduceMotionButton = document.getElementById("reduce-motion-button");

reduceMotionButton.addEventListener("click", reduceMotion);

function reduceMotion() {
  animation.transitionDuration = '0.25s'; // You can set a shorter duration
  animation.transitionTimingFunction = 'linear'; // You can change the timing function

  for (let i = 0; i < revealableContainers.length; i++) {
    // Update the transition properties
    revealableContainers[i].style.transitionDuration = animation.transitionDuration;
    revealableContainers[i].style.transitionTimingFunction = animation.transitionTimingFunction;
  }
}

// TODO: Query for button with an id "theme-button"
let themeButton = document.getElementById("theme-button");

// TODO: Complete the toggleDarkMode function
const toggleDarkMode = () => {

  // Write your code to manipulate the DOM here
  document.body.classList.toggle("dark-mode");

}

// TODO: Register a 'click' event listener for the theme button
// Set toggleDarkMode as the callback function.
themeButton.addEventListener("click", toggleDarkMode);

// Add your query for the sign now button here
const signNowButton = document.querySelector("#sign-now-button");

let count = 14; // Initialize the counter with the starting number of signatures

const addSignature = (person) => {
  const lname = person.lname;
  const linitial = lname.substring(0, 1);

  const signature = document.createElement("p");
  signature.textContent = `🖊️ ${person.fname} ${linitial} from ${person.city}, ${person.country} supports this.`;

  // Add the new signature to the signatures section
  const signaturesSection = document.querySelector(".signatures");
  signaturesSection.appendChild(signature);

  toggleModal(person);

  // Clear the form fields after signing
  person.fname = "";
  person.lname = "";
  person.city = "";
  person.country = "";
  person.email = "";

  // Update the counter
  const counterElement = document.querySelector("#counter");
  counterElement.remove(); // Remove the old counter element

  count = count + 1; // Increase the count

  // Create a new counter element
  const newCounter = document.createElement("p");
  newCounter.id = "counter";
  newCounter.textContent = `✨ ${count} people have signed this petition and support this cause.`;

  // Append the new counter to the "signatures" section
  // const signaturesSection = document.querySelector(".signatures");
  signaturesSection.appendChild(newCounter);
}

let scaleFactor = 1;

function toggleModal(person) {
  // Get modal elements
  let modal = document.getElementById("thanks-modal");
  let modalContent = document.getElementById("thanks-modal-content");
  let modalImage = document.getElementById("modal-image");
  
  modal.style.display = "flex";
  modalContent.textContent = `Thank you so much ${person.fname}! We appreciate your support.`;

  // Set a timeout to hide the modal after a few seconds (e.g., 5 seconds)
  setTimeout(() => {
    modal.style.display = "none";
    clearInterval(intervalId);
  }, 4000);

  // Create a function to scale the image
  function scaleImage() {
    // Toggle the scaleFactor
    scaleFactor = scaleFactor === 1 ? 0.8 : 1;

    // Apply the scaleFactor to the image
    modalImage.style.transform = `scale(${scaleFactor})`;
  }

  // Select the close button and save it to a variable
  const closeModalButton = document.getElementById("modal-button");

  // Function to hide the modal
  function hideModal() {
    const modal = document.getElementById("thanks-modal");
    modal.style.display = "none";
  }

  // Add click event listener to the close button
  closeModalButton.addEventListener("click", hideModal);

  // Call scaleImage every half a second
  const intervalId = setInterval(scaleImage, 500);
}

// Add a click event listener to the sign now button here
// signNowButton.addEventListener("click", addSignature);

const validateForm = () => {
  let containsErrors = false;
  var petitionInputs = document.getElementById("sign-petition").elements;
  let person = {
    fname: petitionInputs[0].value, // accesses and saves value of first input
    lname: petitionInputs[1].value,
    city: petitionInputs[2].value,
    country: petitionInputs[3].value, 
    email: petitionInputs[4].value
  }

  for (let i = 0; i < petitionInputs.length; i++) {
    if (petitionInputs[i].value.length < 2) {
      containsErrors = true;
      petitionInputs[i].classList.add('error');
    } else {
      petitionInputs[i].classList.remove('error');
    }

    if (!person.email.includes('.com') && !person.email.includes('.org') && !person.email.includes('.edu')) {
      containsErrors = true;
      email.classList.add('error');
    } else {
        email.classList.remove('error');
    }
  }
       
  if (containsErrors == false) {
    addSignature(person);
    // toggleModal(person);
    
    for (let i = 0; i < petitionInputs.length; i++) {
      petitionInputs[i].value = "";
      containsErrors = false;
    }
  }
}

signNowButton.addEventListener("click", validateForm);
