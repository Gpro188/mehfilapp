// Utility functions for animations

export const animateValue = (start, end, duration, callback) => {
  const startTime = performance.now();
  const change = end - start;
  
  const animate = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Using easeOutCubic easing function
    const easedProgress = 1 - Math.pow(1 - progress, 3);
    const currentValue = start + change * easedProgress;
    
    callback(currentValue);
    
    if (progress < 1) {
      requestAnimationFrame(animate);
    }
  };
  
  requestAnimationFrame(animate);
};

export const fadeIn = (element, duration = 300) => {
  element.style.opacity = 0;
  element.style.transition = `opacity ${duration}ms ease-out`;
  
  requestAnimationFrame(() => {
    element.style.opacity = 1;
  });
};

export const fadeOut = (element, duration = 300) => {
  element.style.opacity = 1;
  element.style.transition = `opacity ${duration}ms ease-out`;
  
  requestAnimationFrame(() => {
    element.style.opacity = 0;
  });
};

export const slideIn = (element, direction = 'left', distance = 100, duration = 300) => {
  const transformValue = direction === 'left' ? `translateX(-${distance}px)` : 
                       direction === 'right' ? `translateX(${distance}px)` : 
                       direction === 'top' ? `translateY(-${distance}px)` : 
                       `translateY(${distance}px)`;
  
  element.style.opacity = 0;
  element.style.transform = transformValue;
  element.style.transition = `all ${duration}ms ease-out`;
  
  requestAnimationFrame(() => {
    element.style.opacity = 1;
    element.style.transform = 'translateX(0) translateY(0)';
  });
};

export const slideOut = (element, direction = 'left', distance = 100, duration = 300) => {
  const transformValue = direction === 'left' ? `translateX(-${distance}px)` : 
                       direction === 'right' ? `translateX(${distance}px)` : 
                       direction === 'top' ? `translateY(-${distance}px)` : 
                       `translateY(${distance}px)`;
  
  element.style.opacity = 1;
  element.style.transform = 'translateX(0) translateY(0)';
  element.style.transition = `all ${duration}ms ease-out`;
  
  requestAnimationFrame(() => {
    element.style.opacity = 0;
    element.style.transform = transformValue;
  });
};

export const bounce = (element, duration = 500) => {
  element.style.transition = 'transform 0.2s ease-in-out';
  
  const keyframes = [
    { transform: 'scale(1)' },
    { transform: 'scale(1.1)' },
    { transform: 'scale(0.9)' },
    { transform: 'scale(1.05)' },
    { transform: 'scale(0.95)' },
    { transform: 'scale(1)' }
  ];
  
  const options = {
    duration: duration,
    easing: 'ease-in-out'
  };
  
  element.animate(keyframes, options);
};