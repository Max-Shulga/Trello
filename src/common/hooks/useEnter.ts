import { useEffect } from 'react';

function useEnter(onEnter:()=>void):void {
  useEffect(() => {
    const handleEnter = (event:KeyboardEvent):void => {
      if (event.key === 'Enter') {
        event.preventDefault();
        onEnter();
      }
      window.addEventListener('keydown', handleEnter);
    };

    return ():void => {
      window.removeEventListener('keydown', handleEnter);
    };
  }, [onEnter]);
}

export default useEnter;
