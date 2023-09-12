import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Dust } from '../components/Dust';
import { SocialMedia } from '../components/SocialMedia';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="w-full h-screen md:aspect-[3/1] relative flex justify-center o overflow-hidden">
      <StaticImage
        className="w-full h-screen object-cover object-[80%] md:object-right md:aspect-[3/1] absolute left-0 top-0 z-10 "
        imgClassName="object-[80%] md:object-right"
        src="../images/intro.webp"
        alt="Background image presenting cave"
      />
      <div className="absolute z-30 left-6 md:left-auto md:top-3/4 bottom-8 md:bottom-auto container mx-auto">
        <h1 className="">
          <span className="text-slate-100 text-5xl">Piotr Sochacz</span>
          <br />
          <span className="text-slate-300 text-2xl  font-serif">
            Software Engineer
          </span>
        </h1>
        <SocialMedia />
      </div>
      <Dust className="absolute left-0 top-0 z-20 md:aspect-[3/1] " />
    </div>
  );
};

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <meta name="viewport" content="initial-scale=1, viewport-fit=cover"></meta>
    <meta name="theme-color" content="#010101"></meta>
    <title>Piotr Sochacz - Software Engineer</title>
  </>
);
