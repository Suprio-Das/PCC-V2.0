import React, { useEffect, useState } from 'react';
import JoditEditor from 'jodit-react';

interface EditorProps {
  description: string;
  setDescription: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ description, setDescription }) => {
  const [editorInstance, setEditorInstance] = useState<any>(null);

  const config = {
    height: 300,
    readonly: false,
    toolbarAdaptive: false,
    toolbarSticky: false,
    uploader: { insertImageAsBase64URI: true },
  };

  useEffect(() => {
    if (editorInstance && editorInstance.value !== description) {
      editorInstance.value = description;
    }
  }, [description, editorInstance]);

  return (
    <JoditEditor
      value={description}
      config={config}
      // @ts-expect-error: getInstance is missing from types
      getInstance={setEditorInstance}
      onBlur={(newContent) => setDescription(newContent)}
    />
  );
};

export default Editor;
