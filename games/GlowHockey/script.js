document.addEventListener('DOMContentLoaded', () => {
    const hockeyField = document.getElementById('hockeyField');
    const puck = document.getElementById('puck');
    const shadowPuck = document.getElementById('shadowPuck');
    const goalkeeperTop = document.getElementById('goalkeeperTop');
    const goalkeeperBottom = document.getElementById('goalkeeperBottom');
    const scoreTopElem = document.getElementById('scoreTop');
    const scoreBottomElem = document.getElementById('scoreBottom');
    let isDraggingPuck = false;
    let isDraggingGoalkeeper = false;
    let activeGoalkeeper = null;
    let velocity = { x: 0, y: 0 };
    let rafId;
    let scoreTop = 0;
    let scoreBottom = 0;
    const friction = 0.99; // Constant friction factor

    // Initialize the scores on the board
    updateScores();

    // Puck event listeners
    puck.addEventListener('touchstart', handlePuckTouchStart, { passive: true });
    puck.addEventListener('touchmove', handlePuckTouchMove, { passive: true });
    puck.addEventListener('touchend', handlePuckTouchEnd, { passive: true });

// Goalkeeper event listeners
goalkeeperTop.addEventListener('touchstart', handleGoalkeeperTouchStart, { passive: false });
goalkeeperBottom.addEventListener('touchstart', handleGoalkeeperTouchStart, { passive: false });
document.addEventListener('touchmove', handleGoalkeeperTouchMove, { passive: false });
document.addEventListener('touchend', handleGoalkeeperTouchEnd, { passive: false });

    function handleGoalkeeperTouchStart(e) {
        if (e.target.id === 'externalLink') return;
        e.preventDefault(); // Prevent default to avoid any potential zoom behavior
        const touchedElement = e.target;
        if (touchedElement === goalkeeperTop || touchedElement === goalkeeperBottom) {
            touchedElement.isDragging = true;
            touchedElement.initialTouchId = e.targetTouches[0].identifier;
        }
    }

    function handleGoalkeeperTouchMove(e) {
        if (e.target.id === 'externalLink') return;
        e.preventDefault(); // Prevent default to avoid any potential zoom behavior
        Array.from(e.touches).forEach(touch => {
            const touchedElement = document.elementFromPoint(touch.clientX, touch.clientY);
            if (touchedElement === goalkeeperTop || touchedElement === goalkeeperBottom) {
                moveGoalkeeper(touchedElement, touch);
            }
        });
    }

    function handleGoalkeeperTouchEnd(e) {
        if (e.target.id === 'externalLink') return;
        e.preventDefault(); // Prevent default to avoid any potential zoom behavior
        Array.from(e.changedTouches).forEach(touch => {
            const goalkeeper = touch.target.isDragging ? touch.target : null;
            if (goalkeeper && goalkeeper.initialTouchId === touch.identifier) {
                goalkeeper.isDragging = false;
                goalkeeper.initialTouchId = null;
            }
        });
    }

    function moveGoalkeeper(goalkeeper, touch) {
        const fieldRect = hockeyField.getBoundingClientRect();
        const goalkeeperWidth = goalkeeper.offsetWidth;
        const newLeft = touch.clientX - fieldRect.left - (goalkeeperWidth / 2);

        // Constrain the goalkeeper within the goal area
        if (newLeft >= 0 && newLeft <= fieldRect.width - goalkeeperWidth) {
            goalkeeper.style.left = `${newLeft}px`;
        }
    }

    function handlePuckTouchStart(e) {
        if (e.target.id === 'externalLink') return;
        isDraggingPuck = true;
        shadowPuck.style.display = 'block';
        placeShadowPuck(e.touches[0]);
        puck.style.transition = 'none';
        cancelAnimationFrame(rafId); // Stop the puck movement when touched
    }

    function handlePuckTouchMove(e) {
        if (e.target.id === 'externalLink') return;
        if (isDraggingPuck) {
            placeShadowPuck(e.touches[0]);
        }
    }

    function handlePuckTouchEnd(e) {
        if (e.target.id === 'externalLink') return;
        if (isDraggingPuck) {
            isDraggingPuck = false;
            shadowPuck.style.display = 'none';
            calculatePuckVelocity(e.changedTouches[0]);
            rafId = requestAnimationFrame(movePuck);
        }
    }


    function placeShadowPuck(touch) {
        shadowPuck.style.left = `${touch.clientX - shadowPuck.offsetWidth / 2}px`;
        shadowPuck.style.top = `${touch.clientY - shadowPuck.offsetHeight / 2}px`;
    }

    function calculatePuckVelocity(touch) {
        const puckCenterX = puck.offsetLeft + puck.offsetWidth / 2;
        const puckCenterY = puck.offsetTop + puck.offsetHeight / 2;
        const deltaX = touch.clientX - puckCenterX;
        const deltaY = touch.clientY - puckCenterY;
        velocity.x = -deltaX / 10;
        velocity.y = -deltaY / 10;
    }

    function movePuck() {
        const fieldRect = hockeyField.getBoundingClientRect();
        const goalTopRect = document.getElementById('goalTop').getBoundingClientRect();
        const goalBottomRect = document.getElementById('goalBottom').getBoundingClientRect();
        const keeperTopRect = goalkeeperTop.getBoundingClientRect();
        const keeperBottomRect = goalkeeperBottom.getBoundingClientRect();
    
        // Apply velocity to the puck's position
        puck.style.left = `${puck.offsetLeft + velocity.x}px`;
        puck.style.top = `${puck.offsetTop + velocity.y}px`;
    
        // Check for collisions with the goalkeepers or walls
        if (puck.offsetLeft <= 0 || puck.offsetLeft + puck.offsetWidth >= fieldRect.width) {
            velocity.x = -velocity.x; // Reverse direction
        }
        if (puck.offsetTop <= 0 || puck.offsetTop + puck.offsetHeight >= fieldRect.height) {
            velocity.y = -velocity.y; // Reverse direction
        }
    
        // Check for collisions with the goalkeepers
        if (isColliding(puck, keeperTopRect) || isColliding(puck, keeperBottomRect)) {
            velocity.y = -velocity.y; // Reverse direction
        }
    
        // Check if the puck has entered either goal completely
        if (puckCompletelyInGoal(puck, document.getElementById('goalTop'))) {
            scoreBottom++; // Increase score for bottom player
            resetPuck();
        } else if (puckCompletelyInGoal(puck, document.getElementById('goalBottom'))) {
            scoreTop++; // Increase score for top player
            resetPuck();
        }
    
        // Apply friction to gradually reduce the velocity
        velocity.x *= friction;
        velocity.y *= friction;
    
        // Update the scoreboard
        updateScores();
    
        // Continue the animation loop if the puck is still moving
        if (Math.abs(velocity.x) > 0.01 || Math.abs(velocity.y) > 0.01) {
            rafId = requestAnimationFrame(movePuck);
        } else {
            // Stop the animation if the puck's velocity is too low
            velocity.x = 0;
            velocity.y = 0;
        }
    }
    
    // Additional functions used by movePuck
    
    function puckCompletelyInGoal(puckElem, goalElem) {
        const puckRect = puckElem.getBoundingClientRect();
        const goalRect = goalElem.getBoundingClientRect();
        return (
            puckRect.right <= goalRect.right &&
            puckRect.left >= goalRect.left &&
            puckRect.bottom <= goalRect.bottom &&
            puckRect.top >= goalRect.top
        );
    }
    
    function resetPuck() {
        puck.style.left = '50%';
        puck.style.top = '50%';
        puck.style.transform = 'translate(-50%, -50%)'; // Adjust for puck's center
        velocity.x = 0;
        velocity.y = 0;
    }
    
    function isColliding(puckElem, rect) {
        const puckRect = puckElem.getBoundingClientRect();
        return (
            puckRect.left < rect.right &&
            puckRect.right > rect.left &&
            puckRect.top < rect.bottom &&
            puckRect.bottom > rect.top
        );
    }
    
    function updateScores() {
        scoreTopElem.textContent = scoreTop;
        scoreBottomElem.textContent = scoreBottom;
    }
    
});
