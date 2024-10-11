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