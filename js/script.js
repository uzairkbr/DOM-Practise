// Responsive Sidebar Menu
{
  const sideBar = document.getElementById('sidebar');
  const toggleBtn = document.getElementById('toggle-btn');

  function toggleSideBar() {
    sideBar.classList.toggle('close');
    toggleBtn.classList.toggle('rotate');

    closeAllSubMenus();
  }

  function toggleSubMenu(button) {
    if(!button.nextElementSibling.classList.contains("show")){
      closeAllSubMenus();
    }

    button.nextElementSibling.classList.toggle('show');
    button.classList.toggle('rotate');

    if(sideBar.classList.contains('close')) {
      sideBar.classList.toggle('close');
      toggleBtn.classList.toggle('rotate');
    }
  }

  function closeAllSubMenus() {
    Array.from(sideBar.getElementsByClassName("show"))
    .forEach(ul => {
      ul.classList.remove("show");
      ul.previousElementSibling.classList.remove("rotate");
      }
    )
  }

toggleBtn.addEventListener("click", toggleSideBar);

}

// Faqs
(function(){
  const faqs = document.querySelectorAll('.faq');

  faqs.forEach(faq => {
    faq.addEventListener('click', () => {
      const answer = faq.querySelector('.answer');
      const icon = faq.querySelector('.icon');
      
      const isActive = answer.classList.contains('active');

      closeAllFaqs();

      if (!isActive) {
        answer.style.maxHeight = answer.scrollHeight + 10 + 'px';
        icon.style.transform = 'rotate(45deg)';
        answer.classList.add("active");
      }
    });
});

function closeAllFaqs() {
  faqs.forEach(faq => { 
    const answer = faq.querySelector('.answer');
    const icon = faq.querySelector('.icon');
    answer.style.maxHeight = 0;
    icon.style.transform = 'rotate(0deg)';
    answer.classList.remove("active");
  });
}

})();

// Scroll To Top 
(function() {
  const scrollBtn = document.getElementById('scroll-to-top');

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  scrollBtn.addEventListener('click', scrollToTop);
})();

// Timer
(function() {
  const showDialog = document.getElementById('timer__button--open');
  const closeDialog = document.querySelector(".dialog__close");
  const dialog = document.querySelector('dialog'); 
  const form = document.querySelector('.timer__form');
  const soundToggleButton = document.getElementById('timer__button--toggle');
  const soundButtonIcon = soundToggleButton.querySelector('#timer__button--toggle i');

  const daysInput = document.querySelector(".timer__form #days");
  const hoursInput = document.querySelector(".timer__form #hours");
  const minutesInput = document.querySelector(".timer__form #minutes");
  const secondsInput = document.querySelector(".timer__form #seconds");

  const daysOutput = document.querySelector('.timer__days #days');
  const hoursOutput = document.querySelector('.timer__hours #hours');
  const minutesOutput = document.querySelector('.timer__minutes #minutes');
  const secondsOutput = document.querySelector('.timer__seconds #seconds');

  let countdownInterval;
  const audio = new Audio();
  audio.src = "./audio/sound.mp3";
  audio.loop = true;
  let soundEnabled = true;

  const confettiAudio = new Audio();
  confettiAudio.src = "./audio/confetti-sound.mp3";

  function disableScroll() {
    document.body.style.overflow = 'hidden';
  }

  function enableScroll() {
    document.body.style.overflow = '';
  }

  function clearInputs() {
    const inputs = document.querySelectorAll('.timer__form input');
    inputs.forEach(input => {
      input.value = '';
    });
  }

  function renderTime(days = 0, hours = 0, minutes = 0, seconds = 0) {
    daysOutput.textContent = days;
    hoursOutput.textContent = hours;
    minutesOutput.textContent = minutes;
    secondsOutput.textContent = seconds;
  }

  function playSound() {
    if (soundEnabled) {
      if (countdownInterval) {
        audio.play();
      }
      soundButtonIcon.classList.add('fa-volume-up');
      soundButtonIcon.classList.remove('fa-volume-mute');
    } else {
      audio.pause();
      soundButtonIcon.classList.remove('fa-volume-up');
      soundButtonIcon.classList.add('fa-volume-mute');
    }
  }

  function startCountdown(days, hours, minutes, seconds) {
    countdownInterval = setInterval(() => {
      playSound();
      if (seconds > 0) {
        seconds--;
      } else if (minutes > 0) {
        minutes--;
        seconds = 59;
      } else if (hours > 0) {
        hours--;
        minutes = 59;
        seconds = 59;
      } else if (days > 0) {
        days--;
        hours = 23;
        minutes = 59;
        seconds = 59;
      } else {
        confettiAudio.play();
        audio.pause();
        confetti.start();
        clearInterval(countdownInterval);

        setTimeout(() => {
          confetti.stop();
        }, 5000);
      }

      renderTime(days, hours, minutes, seconds);
    }, 1000);
  }

  showDialog.addEventListener("click", () => {
    dialog.showModal();
    disableScroll();
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let days = +daysInput.value;
    let hours = +hoursInput.value;
    let minutes = +minutesInput.value;
    let seconds = +secondsInput.value;

    renderTime(days, hours, minutes, seconds);
    startCountdown(days, hours, minutes, seconds);

    dialog.close();
    clearInputs();
    enableScroll();
  });

  soundToggleButton.addEventListener("click", () => {
    soundEnabled = !soundEnabled;
    playSound();
  });

  closeDialog.addEventListener("click", function() {
    dialog.close();
    clearInputs();
    enableScroll();
  });

  renderTime();
})();

// Tab Navigation
(function() {
  function openTab(e, tab) {
    const tabContents = document.querySelectorAll('.tab-navigation__content');
    const tabLinks = document.querySelectorAll('.tab-btn');

    tabContents.forEach(content => content.classList.remove('active')); 
    tabLinks.forEach(link => link.classList.remove('active'));

    const activeTab = document.getElementById(tab);

    activeTab.classList.add('active');
    e.currentTarget.classList.add('active'); 
  }

  window.openTab = openTab;
})();

// Form Validation
(function() {
  const form = document.getElementById('registration-form');
  const name = document.querySelector('.input-group #name');
  const password = document.querySelector('.input-group #password');
  const confirmPassword = document.querySelector('.input-group #confirm-password');
  const nameError = document.getElementById('error-name');
  const passError = document.getElementById('error-pass');
  const confirmPassError = document.getElementById('error-confirm-pass');
  
  function validateInputs() { 
    resetStates();
    let isFormValid = true;

    if (name.value.trim() === "") {
      nameError.textContent = "Name is required";
      nameError.classList.add('active');
      isFormValid = false;
    } else {
      nameError.textContent = "";
      nameError.classList.remove('active');
      // isFormValid = true;
    }

    if (password.value.length < 8) {
      passError.textContent= "Password must be at least 8 characters long";
      passError.classList.add('active');
      isFormValid = false;
    } else {
      passError.textContent = "";
      passError.classList.remove('active');
      // isFormValid = true;
    }

    if (password.value !== confirmPassword.value) {
      confirmPassError.textContent = "Passwords do not match";
      confirmPassError.classList.add('active');
      isFormValid = false;
    } else {
      confirmPassError.textContent = "";
      confirmPassError.classList.remove('active');
      // isFormValid = true;
    }

    if (isFormValid) {
      form.reset();
      resetStates();
      alert("Form submitted successfully");
    }
  }

  function resetStates() {
    const errors = document.querySelectorAll('.error-message');
    errors.forEach(error => {
      error.textContent = "";
      error.classList.remove('active');
    });
  }

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateInputs();
  });
})();


confetti.start();