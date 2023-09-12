import { StaticImage } from 'gatsby-plugin-image';

import React from 'react';

const services = [
  {
    href: 'https://www.linkedin.com/in/piotr-sochacz/',
    icon: () => (
      <StaticImage
        src="./servicesIcons/In-White-96.png"
        alt="LinkedIn service logo"
        width={30}
        height={30}
      />
    ),
  },
  {
    href: 'https://github.com/Piotr-Aueternum',
    icon: () => (
      <StaticImage
        src="./servicesIcons/github-mark-white.png"
        alt="LinkedIn service logo"
        width={30}
        height={30}
      />
    ),
  },
  {
    href: 'https://www.instagram.com/piotr.aueternum/',
    icon: () => (
      <StaticImage
        src="./servicesIcons/Instagram_Glyph_White.png"
        alt="Instagram service logo"
        width={30}
        height={30}
      />
    ),
  },
  {
    href: 'https://drive.google.com/file/d/1eAl1jcbRizvCCeljzz7c3dymy8BZQhDf/view?usp=drive_link',
    icon: () => (
      <div className="w-8 h-8 uppercase text-slate-50 font-bold border-slate-50 border-2 rounded-md flex justify-center items-center">
        cv
      </div>
    ),
  },
];

export const SocialMedia = () => {
  return (
    <ul className="mt-4 dark:text-slate-100 text-lg flex items-center gap-4">
      {services.map((service) => (
        <li key={service.href}>
          <a
            className="text-blue-600 dark:text-amber-300 block"
            target="_blank"
            rel="noreferrer"
            href={service.href}
          >
            {service.icon()}
          </a>
        </li>
      ))}
    </ul>
  );
};
