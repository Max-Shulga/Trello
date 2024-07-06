import { ReactElement, useEffect, useState } from 'react';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

function StrictModeDroppable({ children, ...props }: DroppableProps):ReactElement | null {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return ():void => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  return <Droppable {...props}>{children}</Droppable>;
}
export default StrictModeDroppable;
