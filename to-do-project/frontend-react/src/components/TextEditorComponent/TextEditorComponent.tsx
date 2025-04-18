import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { ControllerRenderProps } from 'react-hook-form/dist/types/controller';
import { ICreateTaskFormField } from 'types/taskType';
import { DeltaStatic, Sources } from 'quill';

const TextEditorComponent = ({field}: {field: ControllerRenderProps<ICreateTaskFormField, "descriptionField">}) => {

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      ['clean']
    ],
  };

  const formats = [
      'header',
      'bold', 'italic', 'underline', 'strike', 'blockquote',
      'list', 'bullet', 'indent',
      'link', 'image'
  ];

  return (
        <ReactQuill
          {...field}
          className="modal-description"
          theme="snow"
          onChange={(e: string, b: DeltaStatic, source: Sources ) => {
            if (source !== 'api') field.onChange(e);
          }}
          ref={field.ref}
          value={field.value}
          modules={modules}
          formats={formats}
          placeholder="Description*"
        />
  );
};

export default TextEditorComponent;