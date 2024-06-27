import React, { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
}

function Button({ className, ...rest }:ButtonProps):React.JSX.Element {
  return (
    <button type="button" className={`${styles.button} ${className}`} {...rest}>
      {rest.children}
    </button>
  );
}
export default Button;
