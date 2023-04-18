import { Helmet } from "react-helmet-async";

type IHeadProps = {
  title: string;
};

const Head = ({ title }: IHeadProps) => {
  return (
    <Helmet>
      <title>{title}</title>
    </Helmet>
  );
};

export default Head;
