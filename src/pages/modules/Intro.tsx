import React from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import { Dust } from './components/Dust';

export const Intro = () => {
  return (
    <>
      <div className="w-screen md:aspect-[3/1] relative flex justify-center">
        <StaticImage
          className=" w-screen object-fill md:aspect-[3/1] md:absolute z-10"
          src="../../images/intro.jpg"
          alt="Background image presenting cave"
        />
        <div className="absolute z-30 top-3/4 bottom-1/4 md:bottom-auto container mx-auto">
          <div className="text-slate-100 text-5xl">Piotr Sochacz</div>
          <div className="text-slate-300 text-2xl">Software Engineer</div>
        </div>
        <Dust className="w-screen md:aspect-[3/1] absolute z-20" />
      </div>
    </>
  );
};
