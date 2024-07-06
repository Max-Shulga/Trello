import React, { useEffect } from 'react';

function useOutsideClick(ref:React.RefObject<HTMLElement>, callback:()=>void):void {
  useEffect(() => {
    const handleClickOutside = (event:MouseEvent):void => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return ():void => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback]);
}
export default useOutsideClick;
