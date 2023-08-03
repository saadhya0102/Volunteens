function menu() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');

    navbar.classList.add('open');

    menuIcon.addEventListener('click', function() {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('open');
    });
  }
  
