import React from "react";
import { Video as VideoPlayer } from "expo-av";
import styles from "./styles";

type Props = {
  video: string;
};

const Video: React.FC<Props> = ({ video: videoURL }) => {
  return (
    <VideoPlayer
      key={videoURL}
      source={{ uri: videoURL }}
      style={styles.videoStyle}
    />
  );
};

export default Video;
