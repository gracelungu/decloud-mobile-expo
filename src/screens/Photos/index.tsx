import { useWalletConnect } from "@walletconnect/react-native-dapp";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Empty from "../../components/Empty";
import Photo from "../../components/Photo";
import Sync from "../../components/Sync";
import Upload from "../../components/Upload";
import useLogin from "../../hooks/useLogin";
import authAtom from "../../store/atoms/auth";
import cloudAtom from "../../store/atoms/cloud";
import photosAtom from "../../store/atoms/photos";
import colors from "../../styles/colors";
import { getContractWithSigner, loadContract } from "../../web3";
import styles from "./styles";

function PhotosScreen() {
  const connector = useWalletConnect();
  const [cloud] = useAtom(cloudAtom);
  const [{ connected }] = useAtom<any>(authAtom);
  const { connectWallet, accounts } = useLogin();
  const [refreshing, setRefreshing] = useState(false);
  const [photos, setPhotos] = useAtom<any>(photosAtom);

  console.log(cloud);

  const onUploadCompleted = (photo: string) => {
    setPhotos([photo, ...photos]);
  };

  const getFiles = async () => {
    setRefreshing(true);
    const contract = await loadContract(connector, cloud.address);
    const contractWithSigner = await getContractWithSigner(connector, contract);
    const files = await contractWithSigner.getFiles("photo", {
      gasLimit: 3000000,
    });

    const extractedFiles = files.map((file: any[]) => file[1]);
    setPhotos(extractedFiles);
    setRefreshing(false);
  };

  console.log({ photos });

  const refresh = () => {
    setRefreshing(true);
    connectWallet();
    if (connected) {
      getFiles();
    }
  };

  useEffect(() => {
    setRefreshing(false);
  }, [accounts]);

  useEffect(() => {
    if (connected) {
      getFiles();
    }
  }, [connected]);

  const ListHeader = () => (
    <>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Photos</Text>
        <Sync fileType="photo" files={photos} setFiles={setPhotos} />
      </View>
      <Text style={styles.subtitle}>102 files have not been synched</Text>
    </>
  );

  return (
    <>
      <SafeAreaView />
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
        data={photos}
        renderItem={({ item }) => <Photo photo={item} />}
        numColumns={2}
      />
      <Upload onUploadCompleted={onUploadCompleted} fileType="Images" />
    </>
  );
}

export default PhotosScreen;
