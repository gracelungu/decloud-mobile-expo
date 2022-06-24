import React from "react";
import { TouchableOpacity, View } from "react-native";
import styles from "./styles";
import UploadIcon from "../../assets/icons/upload.svg";
import { s } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";

type Props = {
  onFileSelected: (file: any) => void;
};

const Upload: React.FC<Props> = ({ onFileSelected }) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      onFileSelected(result.uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      <UploadIcon width={s(30)} height={s(30)} />
    </TouchableOpacity>
  );
};

export default Upload;
