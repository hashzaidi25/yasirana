import React from 'react';
import { Link } from 'react-scroll';

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
}

export function NavLink({ to, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      smooth={true}
      duration={500}
      className="text-gray-600 hover:text-rose-500 transition-colors cursor-pointer"
    >
      {children}
    </Link>
  );
}