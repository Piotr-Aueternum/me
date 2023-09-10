import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Dust } from './components/Dust';

export const Intro = () => {
  return (
    <>
      <div className="w-full md:aspect-[3/1] relative flex justify-center o overflow-hidden">
        <StaticImage
          className="w-full object-fill md:aspect-[3/1] md:absolute left-0 top-0 z-10"
          src="../../images/intro.jpg"
          alt="Background image presenting cave"
        />
        <h1 className="absolute z-30 top-3/4 bottom-1/4 md:bottom-auto container mx-auto">
          <span className="text-slate-100 text-5xl">Piotr Sochacz</span>
          <br />
          <span className="text-slate-300 text-2xl  font-serif">
            Software Engineer
          </span>
        </h1>
        <Dust className="absolute left-0 top-0 z-20 md:aspect-[3/1] " />
      </div>
    </>
  );
};
