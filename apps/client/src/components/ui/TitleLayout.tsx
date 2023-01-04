import React from 'react';

interface Props {
  title: string;
  children?: React.ReactNode;
}

const TitleLayout = ({ children, title }: Props) => {
  return (
    <section className="flex flex-col gap-6 md:gap-11">
      <div className="h-9">
        <h1 className="text-xl font-bold leading-none md:text-2xl">{title}</h1>
      </div>
      {children}
    </section>
  );
};

export default TitleLayout;
