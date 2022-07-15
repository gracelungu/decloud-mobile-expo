import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "react-native";
import { useAtom } from "jotai";
import React, { useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Empty from "../../components/Empty";
import Video from "../../components/Video";
import Sync from "../../components/Sync";
import Upload from "../../components/Upload";
import useLogin from "../../hooks/useLogin";
import authAtom from "../../store/atoms/auth";
import cloudAtom from "../../store/atoms/cloud";
import videosAtom from "../../store/atoms/videos";
import colors from "../../styles/colors";
import { getContractWithSigner, loadContract } from "../../web3";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function VideosScreen() {
  const insets = useSafeAreaInsets();
  const connector = useWalletConnect();
  const [cloud] = useAtom(cloudAtom);
  const [{ connected }] = useAtom<any>(authAtom);
  const { connectWallet, accounts } = useLogin();
  const [refreshing, setRefreshing] = useState(false);
  const [{ files, unsynched }, setVideos] = useAtom<any>(videosAtom);

  const onUploadCompleted = (video: string) => {
    setVideos({ files, unsynched: [...unsynched, video] });
  };

  const getFiles = async () => {
    if (!connected || !cloud.address) return;

    setRefreshing(true);
    const contract = await loadContract(connector, cloud.address);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    const files = await contractWithSigner.getFiles("video", {
      gasLimit: 3000000,
    });

    const extractedFiles = files.map((file: any[]) => file[1]);
    setVideos({ files: extractedFiles, unsynched: [] });
    setRefreshing(false);
  };

  const refresh = () => {
    getFiles();
  };

  const setFiles = () => {
    setVideos({ files: [...unsynched, files], unsynched: [] });
  };

  console.log({ files });

  const ListHeader = () => (
    <>
      <View style={[styles.titleContainer, { marginTop: insets.top }]}>
        <Text style={styles.title}>Videos</Text>
        <Sync fileType="video" files={unsynched} setFiles={setFiles} />
      </View>
      <>
        {unsynched.length > 0 && (
          <Text style={styles.subtitle}>
            {unsynched.length} file(s) not been synched
          </Text>
        )}
        {unsynched.length === 0 && (
          <Text style={styles.subtitle}>All files have been synched</Text>
        )}
      </>
    </>
  );

  return (
    <>
      <StatusBar barStyle="dark-content" hidden={false} translucent={true} />
      <FlatList
        onRefresh={connectWallet}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refresh}
            tintColor={colors.black}
          />
        }
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={ListHeader}
        ListEmptyComponent={Empty}
        data={[...unsynched, ...files]}
        renderItem={({ item }) => <Video video={item} />}
        numColumns={2}
      />
      <Upload onUploadCompleted={onUploadCompleted} fileType="Videos" />
    </>
  );
}

export default VideosScreen;
