import React from 'react';
export const Contact = () => {
  return (
    <section className="py-60">
      <h2 className="text-3xl font-serif">Contact</h2>
      <ul className="mt-4">
        <li>
          mail:{' '}
          <a className="text-blue-600" href="mailto:pior.aueternum@gmail.com">
            piotr.aueternum@gmail.com
          </a>
        </li>
        <li>
          phone:{' '}
          <a className="text-blue-600" href="tel:+48531243693">
            +48 531 243 693
          </a>
        </li>
      </ul>
    </section>
  );
};
