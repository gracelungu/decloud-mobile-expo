import React from 'react';
import {Image, Text, View} from 'react-native';
import styles from './styles';

type Props = {
  contact: Record<string, any>;
};

const Contact: React.FC<Props> = ({contact: {phone, name, picture}}) => {
  return (
    <View style={styles.itemContainer} key={phone}>
      <Image source={{uri: picture}} style={styles.image} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>{phone}</Text>
      </View>
    </View>
  );
};

export default Contact;
