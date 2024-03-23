import React, { useEffect, useRef } from "react";
import JSONEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
import "./fixAce.css";
// const jsonEditorImport = import("jsoneditor").then(
//   ({ default: JSONEditor }) => JSONEditor
// );

export default function JSONEditorDemo({
  value,
  onChange,
  ...rest
}: {
  value: any;
  onChange: (value: any) => void;
}) {
  const htmlElementRef = useRef<HTMLDivElement>(null);
  const jsonEditorRef = useRef<JSONEditor | null>(null);
  // const [error, setError] = React.useState<string | null>(null);

  const handleChange = () => {
    if (!jsonEditorRef.current) return;
    const jsonEditor = jsonEditorRef.current;
    try {
      const currentJson = jsonEditor.get();
      if (value !== currentJson) {
        onChange(currentJson);
      }
    } catch (error) {
      console.log(error.message);
      // setError(error.message);
    }
  };
  useEffect(() => {
    if (!!jsonEditorRef.current) {
      jsonEditorRef.current.destroy();
    }
    jsonEditorRef.current = new JSONEditor(htmlElementRef.current!, {
      mode: "code",
      history: false,
      onChange: handleChange,
      ...rest,
    });
    jsonEditorRef.current.set(value);
  }, []);

  return <div className="jsoneditor-react-container" ref={htmlElementRef} />;
}
