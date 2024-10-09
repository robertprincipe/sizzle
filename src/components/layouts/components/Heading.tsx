import React from "react";

type IHeadingProps = {
  title: string;
  description?: string;
  children?: React.ReactNode;
};

const Heading = ({ title, description, children }: IHeadingProps) => {
  return (
    <header className="flex flex-col px-2 mb-4 md:flex-row md:items-center md:justify-between">
      <div className="grid mb-2 md:gap-1 md:mb-0">
        <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="md:text-lg text-muted-foreground">{description}</p>
      </div>
      {children}
    </header>
  );
};

export default Heading;
