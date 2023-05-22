import Blocks from "editorjs-blocks-react-renderer";

const ContentPost = ({ content }: { content?: string }) => {
  if (!JSON.parse(content || "null")) return null;
  return <Blocks data={JSON.parse(content || ``)} />;
};

export default ContentPost;
