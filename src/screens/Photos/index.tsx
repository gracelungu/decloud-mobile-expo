import React from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Photo from '../../components/Photo';
import Sync from '../../components/Sync';
import styles from './styles';

function PhotosScreen() {
  const photos = [
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
    'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60',
  ];

  const ListHeader = () => (
    <>
      <Text style={styles.title}>Photos</Text>
      <Text style={styles.subtitle}>102 files have not been synched</Text>
    </>
  );

  return (
    <>
      <SafeAreaView />
      <FlatList
        contentContainerStyle={styles.container}
        columnWrapperStyle={styles.columnWrapper}
        ListHeaderComponent={ListHeader}
        data={[...photos, ...photos, ...photos]}
        renderItem={({item}) => <Photo photo={item} />}
        numColumns={2}
      />
      <Sync />
    </>
  );
}

export default PhotosScreen;
