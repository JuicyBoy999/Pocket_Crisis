import React, { useEffect, useState } from 'react';

const BreathingAnimation: React.FC = () => {
  const [size, setSize] = useState(100);
  const [instruction, setInstruction] = useState('Breathe in...');
  const [count, setCount] = useState(3);

useEffect(() => {
  let breathing = true;
  let timer: NodeJS.Timeout;

  const countUp = (num: number = 1) => {
    if (num <= 3) {
      setCount(num);
      timer = setTimeout(() => countUp(num + 1), 1000);
    }
  };

  const countDown = (num: number = 3) => {
    if (num >= 1) {
      setCount(num);
      timer = setTimeout(() => countDown(num - 1), 1000);
    }
  };

  const breathingCycle = () => {
    // Breathe in
    setInstruction('Breathe in...');
    countUp(); // 1 to 3

    // Expand circle
    setSize(100);
    const expandInterval = setInterval(() => {
      setSize(prev => {
        if (prev < 200) return prev + 2;
        clearInterval(expandInterval);
        return prev;
      });
    }, 50);

    // After inhale
    setTimeout(() => {
      if (!breathing) return;

      // Breathe out
      setInstruction('Breathe out...');
      countDown(); // 3 to 1

      const contractInterval = setInterval(() => {
        setSize(prev => {
          if (prev > 100) return prev - 2;
          clearInterval(contractInterval);
          return prev;
        });
      }, 50);

      // Loop again
      setTimeout(() => {
        if (breathing) breathingCycle();
      }, 5000);
    }, 5000);
  };

  breathingCycle();

  return () => {
    breathing = false;
    clearTimeout(timer);
  };
}, []);



  return (
    <div className="flex flex-col items-center justify-center py-6">
      <div 
        className="rounded-full bg-sky-100 flex items-center justify-center mb-4 transition-all duration-500 ease-in-out"
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
        }}
      >
        <span className="text-sky-700 text-2xl font-light">{count}</span>
      </div>
      <p className="text-gray-600 animate-pulse">{instruction}</p>
    </div>
  );
};

export default BreathingAnimation;