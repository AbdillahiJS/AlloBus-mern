import {atom} from 'nanostores'

export const tripTimeStore = atom({
    jour: 0,
    heure: 0,
    min: 0,
    sec: 0
  });

export function resterTime(prise, retour) {
    let days, hours, minutes, seconds;
  
    const start = new Date(prise);
    const end = new Date(retour);
    const now = new Date();
  
    if (now >= start) {

      const diffTotal = end - start; // in ms
      const diffSinceStart = now - start; // in ms
      const remaining = Math.max(diffTotal - diffSinceStart, 0); // in ms
  
      days = Math.floor(remaining / (1000 * 60 * 60 * 24));
      hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((remaining % (1000 * 60)) / 1000);

    } else {

      const tripLength = end - start; // in ms
  
      days = Math.floor(tripLength / (1000 * 60 * 60 * 24));
      hours = Math.floor((tripLength % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutes = Math.floor((tripLength % (1000 * 60 * 60)) / (1000 * 60));
      seconds = Math.floor((tripLength % (1000 * 60)) / 1000);
    }

   return {days,hours,minutes,seconds}
    
    
  }
  