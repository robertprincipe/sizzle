import React from 'react';
import { Link, LinkProps } from 'react-router-dom';

interface SmoothScrollLinkProps extends LinkProps {
  to: string;
}

export const SmoothScrollLink: React.FC<SmoothScrollLinkProps> = ({ to, children, ...props }) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const target = document.getElementById(to.substring(1));
    if (target) {
      event.preventDefault();
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};