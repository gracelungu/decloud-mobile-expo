import React, { useState } from "react";
import { ActivityIndicator, TouchableOpacity } from "react-native";
import styles from "./styles";
import UploadIcon from "../../assets/icons/upload.svg";
import { s } from "react-native-size-matters";
import * as ImagePicker from "expo-image-picker";
import { IPFS_DOWNLOAD_URL } from "../../../credentials";
import useUpload from "../../hooks/useUpload";

type Props = {
  onFileSelected?: (file: any) => void;
  onUploadCompleted: (url: string) => void;
  fileType: "Images" | "Videos";
};

const Upload: React.FC<Props> = ({
  fileType,
  onFileSelected,
  onUploadCompleted,
}) => {
  const [loading, setLoading] = useState(false);
  const { upload } = useUpload({ fileType });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions[fileType],
      quality: 1,
    });

    if (!result.cancelled) {
      if (onFileSelected) onFileSelected(result.uri);
      setLoading(true);

      const response = await upload(result);
      setLoading(false);

      if (response) {
        onUploadCompleted(`${IPFS_DOWNLOAD_URL}/${response.IpfsHash}`);
      }
    }
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={pickImage}
      disabled={loading}
    >
      {!loading && <UploadIcon width={s(30)} height={s(30)} />}
      {loading && <ActivityIndicator />}
    </TouchableOpacity>
  );
};

export default Upload;
