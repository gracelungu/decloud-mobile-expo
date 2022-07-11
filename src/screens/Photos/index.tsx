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
import photosAtom from "../../store/atoms/photos";
import colors from "../../styles/colors";
import styles from "./styles";

function PhotosScreen() {
  const { connectWallet, accounts } = useLogin();
  const [refreshing, setRefreshing] = useState(false);
  const [photos, setPhotos] = useAtom<any>(photosAtom);

  const onUploadCompleted = (photo: string) => {
    setPhotos([...photos, photo]);
  };

  console.log({ photos });

  const refresh = () => {
    setRefreshing(true);
    connectWallet();
  };

  useEffect(() => {
    setRefreshing(false);
  }, [accounts]);

  const ListHeader = () => (
    <>
      <SafeAreaView />
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Photos</Text>
        <Sync />
      </View>
      <Text style={styles.subtitle}>102 files have not been synched</Text>
    </>
  );

  return (
    <>
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
        data={
          [] || [
            "https://gateway.pinata.cloud/ipfs/bafkreiblpl6xnjgabpczbg3gxhgy3n3a32qon6qdp4pkrlnha6wj4rholq",
          ]
        }
        renderItem={({ item }) => <Photo photo={item} />}
        numColumns={2}
      />
      <Upload onUploadCompleted={onUploadCompleted} fileType="Images" />
    </>
  );
}

export default PhotosScreen;
