  const imageCon = document.querySelector(".image-container");
      let x = 0;

      function updateImage() {
        x = x - 45;
        imageCon.style.transform = `perspective(1300px) rotateY(${x}deg)`;
      }

      setInterval(updateImage, 3000);





function toggleMenu() {
  const nav = document.querySelector('nav'); 
  const burger = document.querySelector('.burger');

  nav.classList.toggle('active');
  burger.classList.toggle('active');
}
