import React from "react";
import { Image } from "react-native-expo-image-cache";
import styles from "./styles";

type Props = {
  photo: string;
};

const Photo: React.FC<Props> = ({ photo }) => {
  return <Image key={photo} uri={photo} style={styles.imageStyle} />;
};

export default Photo;
