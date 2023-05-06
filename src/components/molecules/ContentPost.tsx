import Blocks from "editorjs-blocks-react-renderer";

const ContentPost = ({ content }: { content?: string }) => {
  return (
    
      <Blocks
        data={JSON.parse(
          content ||
            `{
              "time": 1564767102436,
              "blocks": [
                {
                  "type": "header",
                  "data": {
                    "level": 3,
                    "text": "Editor.js React Renderer"
                  }
                }
              ],
              "version": "2.14.0"
            }`
        )}
      />
    
  );
};

export default ContentPost;
