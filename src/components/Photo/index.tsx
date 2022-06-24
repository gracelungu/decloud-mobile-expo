import React from 'react';
import {Image} from 'react-native';
import styles from './styles';

type Props = {
  photo: string;
};

const Photo: React.FC<Props> = ({photo}) => {
  return <Image key={photo} source={{uri: photo}} style={styles.imageStyle} />;
};

export default Photo;
