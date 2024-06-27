import React, { forwardRef } from 'react';

import styles from './ModalMenuContainer.module.scss';

interface ModalMenuContainerProps {
  className?: string;
  children: React.ReactNode;
  ref?: React.Ref<HTMLDivElement>;
}

const ModalMenuContainer = forwardRef<HTMLDivElement, Readonly<ModalMenuContainerProps>>(
  ({ className, children }, ref) => (
    <div ref={ref} className={`${styles.container} ${className}`}>
      {children}
    </div>
  ),
);

export default ModalMenuContainer;
