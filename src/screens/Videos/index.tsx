import React from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Video from "../../components/Video";
import Sync from "../../components/Sync";
import styles from "./styles";

function VideosScreen() {
  const videos = [
    "https://v16-webapp.tiktok.com/087f324b611b17f0b033618a4feda615/62aa09b1/video/tos/useast2a/tos-useast2a-pve-0037-aiso/1bf033d051a74e73bc6b6af1f04d7c32/?a=1988&ch=0&cr=0&dr=0&lr=tiktok_m&cd=0%7C0%7C0%7C0&br=1084&bt=542&btag=80000&cs=0&ds=1&ft=eXd.6HnlMyq8ZXXxFwe2Nkhoyl7Gb&mime_type=video_mp4&qs=0&rc=NTs5O2c3ODgzOzdlOjpkM0BpMzVnNWY6ZnlnZDMzZjczM0AyMTMuXzYxNi0xLTIyYS1fYSMwMDBpcjQwZTRgLS1kMWNzcw%3D%3D&l=20220615103056010223082152170550A3",
  ];

  const ListHeader = () => (
    <>
      <Text style={styles.title}>Photos</Text>
      <Text style={styles.subtitle}>102 files have not been synched</Text>
    </>
  );

  return (
    <>
      <FlatList
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={ListHeader}
        data={[...videos, ...videos, ...videos]}
        renderItem={({ item }) => <Video video={item} />}
        numColumns={2}
      />
      <Sync />
    </>
  );
}

export default VideosScreen;
