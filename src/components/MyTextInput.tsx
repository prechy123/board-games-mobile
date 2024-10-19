import React from "react";
import { TextInput } from "react-native-paper";

interface Props {
  text: string;
  label: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
}

const MyTextInput = (props: Props) => {
  return (
    <TextInput
      label={props.label}
      value={props.text}
      onChangeText={props.setText}
      mode="outlined"
    />
  );
};

export default MyTextInput;
