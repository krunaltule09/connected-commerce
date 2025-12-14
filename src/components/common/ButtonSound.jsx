import React, { useEffect } from 'react';
import { useSound } from '../../hooks';

/**
 * A component that adds click sound to any element with onClick handler
 * This component uses event delegation to handle clicks on buttons and other clickable elements
 */
const ButtonSound = () => {
  const playSound = useSound('/assets/sounds/button-click.mp3', { volume: 0.5, preload: true });
  
  useEffect(() => {
    // Function to handle click events using event delegation
    const handleClick = (event) => {
      // Check if the clicked element or its parent is a button or has onClick attribute
      const isClickable = (element) => {
    if (!element) return false;
    
    // Exclude elements that should never trigger sounds
    const excludedTags = ['INPUT', 'TEXTAREA', 'SELECT', 'OPTION'];
    if (excludedTags.includes(element.tagName)) {
      return false;
    }
    
    // Exclude elements with specific classes
    if (element.className && typeof element.className === 'string') {
      const excludedClasses = ['container', 'panel', 'content', 'frame', 'overlay'];
      if (excludedClasses.some(className => element.className.includes(className))) {
        return false;
      }
    }
    
    // Get element text content for specific button text matching
    const textContent = element.textContent?.trim().toLowerCase() || '';
    
    // List of specific button texts from the codebase
    const specificButtonTexts = [
      'start journey',
      'touch here to activate servicing mode',
      'scan document',
      'back',
      'next',
      'back to home'
    ];
    
    // Check if element text matches any of our specific button texts
    if (specificButtonTexts.some(text => textContent.includes(text.toLowerCase()))) {
      return true;
    }
    
    // Check for HTML button elements
    if (element.tagName === 'BUTTON') {
      return true;
    }
    
    // Check for links that are styled as buttons
    if (element.tagName === 'A' && element.href) {
      // Only consider links that look like buttons
      if (element.className.includes('button') || 
          element.getAttribute('role') === 'button') {
        return true;
      }
    }
    
    // Check for specific MUI button classes
    if (
      element.className && (
        element.className.includes('MuiButton') ||
        element.className.includes('MuiIconButton')
      )
    ) {
      return true;
    }
    
    // Check for specific component classes from our app
    if (element.className && typeof element.className === 'string') {
      const classNames = [
        'startJourneyButton',
        'backButton',
        'nextButton',
        'navigationButtons',
        'buttonText'
      ];
      
      if (classNames.some(className => element.className.includes(className))) {
        return true;
      }
    }
    
    // Check for data attributes
    if (element.getAttribute('data-clickable') === 'true') {
      return true;
    }
    
    // Check for elements with onClick handlers but only if they look like buttons
    // This helps prevent random divs with onClick from triggering sounds
    if (element.onclick || element.getAttribute('onclick')) {
      // Only consider it a button if it has button-like styling or text
      const style = window.getComputedStyle(element);
      const hasButtonStyling = 
        style.cursor === 'pointer' && 
        (style.backgroundColor !== 'transparent' || 
         style.border !== 'none' || 
         element.className.includes('button'));
      
      if (hasButtonStyling) {
        return true;
      }
    }
    
    return false;
      };
      
      // Check the clicked element and its parents up to 2 levels only
      // This makes the sound more selective
      let currentElement = event.target;
      let depth = 0;
      
      while (currentElement && depth < 2) {
        if (isClickable(currentElement)) {
          // Log what triggered the sound (for debugging)
          const elementInfo = {
            tagName: currentElement.tagName,
            className: currentElement.className,
            id: currentElement.id,
            text: currentElement.textContent?.trim().substring(0, 30) || ''
          };
          console.debug('Button sound triggered by:', elementInfo);
          
          // Play the sound
          playSound();
          break;
        }
        currentElement = currentElement.parentElement;
        depth++;
      }
    };
    
    // Add event listener to document
    document.addEventListener('click', handleClick);
    
    // Cleanup
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [playSound]);
  
  // This component doesn't render anything
  return null;
};

export default ButtonSound;
