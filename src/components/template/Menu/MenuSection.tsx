import React from 'react';
import Image from 'next/image';
import MenuItem from './MenuItem';

interface MenuSectionProps {
  title: string;
  items: { href: string; label: string; icon: JSX.Element }[];
}

const MenuSection: React.FC<MenuSectionProps> = ({ title, items }) => (
  <div>
    <span>{title}</span>
    <Image
      src="/images/vetor_menu.png"
      alt="Menu icon"
      width={120}
      height={120}
      draggable={false}
    />
    <nav>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <MenuItem key={index} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </ul>
    </nav>
  </div>
);

export default MenuSection;
