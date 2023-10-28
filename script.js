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
