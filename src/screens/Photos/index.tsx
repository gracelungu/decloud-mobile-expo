import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { StatusBar } from "react-native";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Empty from "../../components/Empty";
import Photo from "../../components/Photo";
import Sync from "../../components/Sync";
import Upload from "../../components/Upload";
import authAtom from "../../store/atoms/auth";
import cloudAtom from "../../store/atoms/cloud";
import photosAtom from "../../store/atoms/photos";
import colors from "../../styles/colors";
import { getContractWithSigner, loadContract } from "../../web3";
import styles from "./styles";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function PhotosScreen() {
  const insets = useSafeAreaInsets();
  const connector = useWalletConnect();
  const [cloud] = useAtom(cloudAtom);
  const [{ connected }] = useAtom<any>(authAtom);
  const [refreshing, setRefreshing] = useState(false);
  const [{ files, unsynched }, setPhotos] = useAtom<any>(photosAtom);

  const onUploadCompleted = (photo: string) => {
    setPhotos({ files, unsynched: [...unsynched, photo] });
  };

  const getFiles = async () => {
    if (!connected || !cloud.address) return;

    setRefreshing(true);
    const contract = await loadContract(connector, cloud.address);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    const files = await contractWithSigner.getFiles("photo", {
      gasLimit: 3000000,
    });

    const extractedFiles = files.map((file: any[]) => file[1]);
    setPhotos({ files: extractedFiles, unsynched });
    setRefreshing(false);
  };

  const refresh = () => {
    getFiles();
  };

  const setFiles = () => {
    setPhotos({ files: [...unsynched, files], unsynched: [] });
  };

  const ListHeader = () => (
    <>
      <View style={[styles.titleContainer, { marginTop: insets.top }]}>
        <Text style={styles.title}>Photos</Text>
        <Sync fileType="photo" files={unsynched} setFiles={setFiles} />
      </View>
      <>
        {unsynched.length > 0 && (
          <Text style={styles.subtitle}>
            {unsynched.length} file(s) have not been synched.
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
        onRefresh={refresh}
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
        renderItem={({ item }) => <Photo photo={item} />}
        numColumns={2}
      />
      <Upload onUploadCompleted={onUploadCompleted} fileType="Images" />
    </>
  );
}

export default PhotosScreen;
