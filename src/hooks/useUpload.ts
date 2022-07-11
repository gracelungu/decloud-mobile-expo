import axios from "axios";
import { ImageInfo } from "expo-image-picker";
import { useState } from "react";
import { Platform } from "react-native";
import { IPFS_UPLOAD_URL, PINATA_JWT } from "../../credentials";

type UseUploadType = {
  fileType: string;
};

const useUpload = ({ fileType }: UseUploadType) => {
  const upload = async (file: ImageInfo) => {
    try {
      const data = new FormData();
      data.append("file", {
        type: fileType,
        name: String(Date.now()),
        uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
      });

      const response = await axios({
        method: "post",
        url: IPFS_UPLOAD_URL,
        headers: {
          Authorization: `Bearer ${PINATA_JWT}`,
          "Content-Type":
            "multipart/form-data; charset=utf-8; boundary=------random-boundary",
        },
        data,
        transformRequest: (d) => d,
      });

      return response.data;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  return { upload };
};

export default useUpload;
