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

  const daysInput = document.querySelector(".timer__form #days");
  const hoursInput = document.querySelector(".timer__form #hours");
  const minutesInput = document.querySelector(".timer__form #minutes");
  const secondsInput = document.querySelector(".timer__form #seconds");

  const daysOutput = document.querySelector('.timer__days #days');
  const hoursOutput = document.querySelector('.timer__hours #hours');
  const minutesOutput = document.querySelector('.timer__minutes #minutes');
  const secondsOutput = document.querySelector('.timer__seconds #seconds');

  let countdownInterval;

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

  function startCountdown(days, hours, minutes, seconds) {
    const audio = new Audio();
    audio.src = "./audio/sound.mp3";
    audio.loop = true;
    audio.play();
    
    countdownInterval = setInterval(() => {
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
        audio.pause();
        clearInterval(countdownInterval);
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

    tabContents.forEach(content => content.classList.remove('active'));  // Remove active class from all content
    tabLinks.forEach(link => link.classList.remove('active')); // Remove active class from all buttons

    document.getElementById(tab).classList.add('active');  // Add active class to the selected content
    e.currentTarget.classList.add('active');  // Add active class to the clicked button
  }

  // Expose the function globally by attaching it to the window object
  window.openTab = openTab;
})();
