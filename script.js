window.onload = function() {
  const rectangles = document.querySelectorAll('.rectangle');

  rectangles.forEach(rectangle => {
      rectangle.addEventListener('click', function() {
          if(!this.classList.contains('active_categorie')) {
              const activeRectangle = document.querySelector('.rectangle.active_categorie');
              if (activeRectangle) {
                  activeRectangle.classList.remove('active_categorie');
              }
              this.classList.add('active_categorie');
          }

          // Zustand im localStorage speichern
          const activeCategory = this.getAttribute('data-category'); // z.B. 'Singleplayer', 'OneVsOne' oder 'twoPlayers'
          localStorage.setItem('activeCategory', activeCategory);

          // Ansicht der Spiele entsprechend setzen
          setGameView(activeCategory);
      });
  });

  // Zustand aus localStorage abrufen und setzen
  const savedCategory = localStorage.getItem('activeCategory');
  if (savedCategory) {
      setGameView(savedCategory);

      const targetRectangle = document.querySelector(`.rectangle[data-category="${savedCategory}"]`);
      if (targetRectangle) {
          targetRectangle.classList.add('active_categorie');
      }
  }
}

function setGameView(category) {
  const allGames = document.querySelectorAll('.game');
  allGames.forEach(game => {
      if(game.classList.contains(category)) {
          game.classList.remove('hid');
      } else {
          game.classList.add('hid');
      }
  });
}


// GoodleJump Version

function ChangeVersion() {
    // Global Version-Button States
    var appleLogo = document.getElementById('appleLogo');
    var androidLogo = document.getElementById('androidLogo');

    if (appleLogo.style.display !== 'none') {
        appleLogo.style.display = 'none';
        androidLogo.style.display = 'block';
    } else {
        appleLogo.style.display = 'block';
        androidLogo.style.display = 'none';
    }
    
    // Local in Game-States
    // Select the paragraph, anchor, and SVG elements
    var paragraph = document.querySelector('#multiversiongame .gamedesc p');
    var anchor = document.querySelector('#multiversiongame a');
    var svgElement = paragraph.querySelector('svg'); // SVG within the paragraph

    // Define the SVG strings for both versions
    var originalSvgMarkup = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512"><!-- Original SVG content --><style>svg{fill:#ffffff}</style><path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"></svg>';
    var newSvgMarkup = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 576 512"><!-- New SVG content --><style>svg{fill:#ffffff}</style><path d="M420.55,301.93a24,24,0,1,1,24-24,24,24,0,0,1-24,24m-265.1,0a24,24,0,1,1,24-24,24,24,0,0,1-24,24m273.7-144.48,47.94-83a10,10,0,1,0-17.27-10h0l-48.54,84.07a301.25,301.25,0,0,0-246.56,0L116.18,64.45a10,10,0,1,0-17.27,10h0l47.94,83C64.53,202.22,8.24,285.55,0,384H576c-8.24-98.45-64.54-181.78-146.85-226.55"></svg>';

    // Check the current text of the paragraph to determine the state and update accordingly
    if (paragraph.textContent.includes("Iphone Version")) {
        // Update to the Android version
        paragraph.innerHTML = "Android Version " + newSvgMarkup;
        anchor.href = "games/GoodleJump/index.html";
    } else {
        // Revert back to the iPhone version
        paragraph.innerHTML = "Iphone Version " + originalSvgMarkup;
        anchor.href = "games/GoodleJumpIOS/index.html";
    }
}
