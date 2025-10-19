// Utility function for confetti effects

export const confettiEffect = (element) => {
  if (!element) return;
  
  // Create confetti container
  const confettiContainer = document.createElement('div');
  confettiContainer.style.position = 'absolute';
  confettiContainer.style.top = '0';
  confettiContainer.style.left = '0';
  confettiContainer.style.width = '100%';
  confettiContainer.style.height = '100%';
  confettiContainer.style.pointerEvents = 'none';
  confettiContainer.style.zIndex = '1000';
  confettiContainer.style.overflow = 'hidden';
  
  // Add to element
  element.appendChild(confettiContainer);
  
  // Create confetti pieces
  const colors = ['#f1c40f', '#e74c3c', '#3498db', '#2ecc71', '#9b59b6'];
  const confettiCount = 150;
  
  for (let i = 0; i < confettiCount; i++) {
    const confetti = document.createElement('div');
    confetti.style.position = 'absolute';
    confetti.style.width = `${Math.random() * 10 + 5}px`;
    confetti.style.height = `${Math.random() * 10 + 5}px`;
    confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.top = '-10px';
    confetti.style.opacity = Math.random() + 0.5;
    confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
    
    confettiContainer.appendChild(confetti);
    
    // Animate confetti
    const animation = confetti.animate([
      { 
        transform: `translate(0, 0) rotate(0deg)`,
        opacity: 1
      },
      { 
        transform: `translate(${Math.random() * 100 - 50}px, ${window.innerHeight}px) rotate(${Math.random() * 360}deg)`,
        opacity: 0
      }
    ], {
      duration: Math.random() * 3000 + 2000,
      easing: 'cubic-bezier(0.1, 0.8, 0.2, 1)'
    });
    
    // Remove confetti after animation
    animation.onfinish = () => {
      confetti.remove();
    };
  }
  
  // Remove container after animation
  setTimeout(() => {
    confettiContainer.remove();
  }, 5000);
};

export const celebrate = (element, message = 'Congratulations!') => {
  if (!element) return;
  
  // Create celebration container
  const celebrationContainer = document.createElement('div');
  celebrationContainer.style.position = 'fixed';
  celebrationContainer.style.top = '0';
  celebrationContainer.style.left = '0';
  celebrationContainer.style.width = '100%';
  celebrationContainer.style.height = '100%';
  celebrationContainer.style.pointerEvents = 'none';
  celebrationContainer.style.zIndex = '1000';
  celebrationContainer.style.display = 'flex';
  celebrationContainer.style.alignItems = 'center';
  celebrationContainer.style.justifyContent = 'center';
  
  // Create message
  const messageElement = document.createElement('div');
  messageElement.style.backgroundColor = 'rgba(110, 69, 226, 0.9)';
  messageElement.style.color = 'white';
  messageElement.style.padding = '20px 40px';
  messageElement.style.borderRadius = '10px';
  messageElement.style.fontSize = '2rem';
  messageElement.style.fontWeight = 'bold';
  messageElement.style.textAlign = 'center';
  messageElement.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
  messageElement.style.transform = 'scale(0)';
  messageElement.style.transition = 'transform 0.5s ease-out';
  messageElement.textContent = message;
  
  celebrationContainer.appendChild(messageElement);
  document.body.appendChild(celebrationContainer);
  
  // Animate message
  setTimeout(() => {
    messageElement.style.transform = 'scale(1)';
  }, 100);
  
  // Add confetti
  confettiEffect(celebrationContainer);
  
  // Remove after animation
  setTimeout(() => {
    messageElement.style.transform = 'scale(0)';
    setTimeout(() => {
      celebrationContainer.remove();
    }, 500);
  }, 3000);
};