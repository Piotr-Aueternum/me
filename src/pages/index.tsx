import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Contact, Intro } from '../modules';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Intro />
      <main className="container mx-auto px-6 md:px-0">
        <Contact />
      </main>
    </>
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
