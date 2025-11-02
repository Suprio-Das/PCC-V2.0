import React, { useRef, useEffect } from 'react';
import JoditEditor from 'jodit-react';

interface EditorProps {
  description: string;
  setDescription: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ description, setDescription }) => {
  const editor = useRef<any>(null);

  const config = {
    height: 300,
    readonly: false,
    toolbarAdaptive: false,
    toolbarSticky: false,
    uploader: { insertImageAsBase64URI: true },
  };

  useEffect(() => {
    if (editor.current && description !== editor.current.value) {
      editor.current.value = description;
    }
  }, [description]);

  return (
    <JoditEditor ref={editor} value={description} config={config} onBlur={(newContent) => setDescription(newContent)} />
  );
};

export default Editor;
