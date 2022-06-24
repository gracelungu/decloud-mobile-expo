import React, { useEffect, useState } from "react";
import { RefreshControl, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import Empty from "../../components/Empty";
import Photo from "../../components/Photo";
import Sync from "../../components/Sync";
import Upload from "../../components/Upload";
import useLogin from "../../hooks/useLogin";
import colors from "../../styles/colors";
import styles from "./styles";

function PhotosScreen() {
  const { connectWallet, accounts } = useLogin();
  const [refreshing, setRefreshing] = useState(false);

  const photos = [
    // "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    // "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    // "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    // "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    // "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
  ];

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
        data={photos}
        renderItem={({ item }) => <Photo photo={item} />}
        numColumns={2}
      />
      <Upload />
    </>
  );
}

export default PhotosScreen;
