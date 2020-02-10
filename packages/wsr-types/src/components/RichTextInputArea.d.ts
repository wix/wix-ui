declare namespace __WSR {
  namespace RichTextInputArea {
    export interface RichTextInputAreaProps {
      dataHook?: string;
      initialValue?: string;
      placeholder?: string;
      disabled?: boolean;
      status?: 'error';
      statusMessage?: string;
      onChange?: import('draft-js').EditorProps['onChange'];
      maxHeight?: string;
      texts?: texts;
    }

    export type texts = {
      toolbarButtons?: {
        boldButtonLabel?: string,
        italicButtonLabel?: string,
        underlineButtonLabel?: string,
        linkButtonLabel?: string,
        bulletedListButtonLabel?: string,
        numberedListButtonLabel?: string,
      }
      insertionForm?: {
        confirmButtonLabel?: string,
        cancelButtonLabel?: string,
        link?: {
          textInputPlaceholder?: string,
          urlInputPlaceholder?: string,
        },
      }
    };

    export class RichTextInputArea extends React.PureComponent<RichTextInputAreaProps> {}
  }
}

declare module 'wix-style-react' {
  export import RichTextInputArea = __WSR.RichTextInputArea.RichTextInputArea;
  export import RichTextInputAreaProps = __WSR.RichTextInputArea.RichTextInputAreaProps;
}

declare module 'wix-style-react/RichTextInputArea' {
  export interface RichTextInputAreaProps extends __WSR.RichTextInputArea.RichTextInputAreaProps {}
  export default __WSR.RichTextInputArea.RichTextInputArea;
}
