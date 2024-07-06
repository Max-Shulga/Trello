import { useEffect } from 'react';

function useEscape(onEscape: ()=>void):void {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent):void => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onEscape();
      }
    };
    window.addEventListener('keydown', handleEscape);

    return () :void => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onEscape]);
}
export default useEscape;
