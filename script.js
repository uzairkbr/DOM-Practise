const sideBar = document.getElementById('sidebar');
const toggleBtn = document.getElementById('toggle-btn');

function toggleSideBar() {
  sideBar.classList.toggle('close');
  toggleBtn.classList.toggle('rotate');

  if(!button.nextElementSibling.classList.contains("show")) {
    closeAllSubMenus();
  }
}

function toggleSubMenu(button) {

  if(!button.nextElementSibling.classList.contains("show")) {
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