import React from "react";
import { TextInput } from "react-native-paper";

interface Props {
  text: string;
  label: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  multiLine?: boolean;
}

const MyTextInput = (props: Props) => {
  return (
    <TextInput
      label={props.label}
      value={props.text}
      onChangeText={props.setText}
      multiline={props.multiLine ? true: false}
      numberOfLines={2}
      mode="outlined"
    />
  );
};

export default MyTextInput;
