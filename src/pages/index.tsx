import type { HeadFC, PageProps } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import * as React from "react";
import { Dust } from "@components/Dust";
import { SocialMedia } from "@components/SocialMedia";

const IndexPage: React.FC<PageProps> = () => {
  return (
    <div className="o relative flex h-screen w-full justify-center overflow-hidden">
      <StaticImage
        className="absolute left-0 top-0 z-10 h-screen w-full object-cover object-[80%] md:object-right "
        imgClassName="object-[80%] md:object-right"
        src="../images/intro.webp"
        alt="Background image presenting cave"
      />
      <div className="container absolute bottom-8 left-6 z-30 mx-auto md:left-auto landscape:bottom-8 landscape:lg:bottom-28 ">
        <h1 className="">
          <span className="text-5xl text-slate-100">Piotr Sochacz</span>
          <br />
          <span className="font-serif text-2xl  text-slate-300">
            Software Engineer
          </span>
        </h1>
        <SocialMedia />
      </div>
      <Dust className="absolute left-0 top-0 z-20" />
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
