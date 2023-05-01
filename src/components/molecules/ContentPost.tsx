import Blocks from "editorjs-blocks-react-renderer";

const ContentPost = ({ content }: { content?: string }) => {
  return (
    <div className="prose prose-cyan max-w-none dark:prose-invert my-6">
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
    </div>
  );
};

export default ContentPost;
