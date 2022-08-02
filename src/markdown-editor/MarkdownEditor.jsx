import MDEditor from "@uiw/react-md-editor";
import { useState } from "react";
import onImagePasted from "./onImagePasted";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const MarkdownEditor = () => {
  const [markdown, setMarkdown] = useState();

  return (
    <div data-color-mode="light">
      <MDEditor
        value={markdown}
        onChange={(value) => {
          setMarkdown(value);
        }}
        onPaste={async (event) => {
          await onImagePasted(event.clipboardData, setMarkdown);
        }}
        onDrop={async (event) => {
          await onImagePasted(event.dataTransfer, setMarkdown);
        }}
        height={440}
        textareaProps={{
          placeholder: "Fill in your markdown for the coolest of the cool."
        }}
        // hideToolbar
      />
    </div>
  );
};

export default MarkdownEditor;