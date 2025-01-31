// DONT DELETE
document.addEventListener("DOMContentLoaded", function() {
   
    const hamburgerToggle = document.getElementById('hamburger-toggle');
    const closeHamburger = document.getElementById('close-hamburger');
  
    hamburgerToggle.addEventListener('click', function(event) {
      event.preventDefault(); 
      ShowHamburger();
     
    });
  
    closeHamburger.addEventListener('click', function(event) {
      event.preventDefault();
      HideHamburger();
    });
  
  
    function ShowHamburger() {
      const Hamburger = document.querySelector('.Hamburger');
      Hamburger.classList.add('open');
    }
  

    function HideHamburger() {
      const Hamburger = document.querySelector('.Hamburger');
      Hamburger.classList.remove('open');
    }
  
    
    document.addEventListener('click', function(event) {
      const Hamburger = document.querySelector('.Hamburger');
      const toggle = document.getElementById('hamburger-toggle');
  
   
      if (!Hamburger.contains(event.target) && !toggle.contains(event.target)) {
        HideHamburger();
      }
    });
  });