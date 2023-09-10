import * as React from 'react';
import type { HeadFC, PageProps } from 'gatsby';
import { Contact, Intro } from '../modules';

const IndexPage: React.FC<PageProps> = () => {
  return (
    <>
      <Intro />
      <main className="container mx-auto">
        <Contact />
      </main>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
