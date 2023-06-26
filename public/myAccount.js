function menu() {
    const menuIcon = document.getElementById('menu-icon');
    const navbar = document.querySelector('.navbar');
  
    menuIcon.addEventListener('click', function() {
      menuIcon.classList.toggle('bx-x');
      navbar.classList.toggle('open');
    });
  }

  const forms = document.querySelector(".forms");
  const pwShowHide = document.querySelectorAll(".fa-solid.fa-eye-slash");
  const links = document.querySelectorAll(".link");
pwShowHide.forEach(eyeIcon => {
eyeIcon.addEventListener("click", () => {
    let pwFields = eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    
    pwFields.forEach(password => {
        if(password.type === "password"){
            password.type = "text";
            eyeIcon.classList.replace("bx-hide", "bx-show");
            return;
        }
        password.type = "password";
        eyeIcon.classList.replace("bx-show", "bx-hide");
    })
    
})
})      
links.forEach(link => {
link.addEventListener("click", e => {
   e.preventDefault(); //preventing form submit
   forms.classList.toggle("show-signup");
})
})