import React from "react";
import { Text, View } from "react-native";
import { getInitials } from "../../helpers/getIntials";
import styles from "./styles";

type Props = {
  contact: Record<string, any>;
};

const Contact: React.FC<Props> = ({ contact: { phoneNumbers, name } }) => {
  return (
    <View style={styles.itemContainer} key={name}>
      <View style={styles.initialsContainer}>
        <Text style={styles.initials}>{getInitials(name)}</Text>
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.phone}>
          {phoneNumbers && phoneNumbers.length > 0
            ? phoneNumbers![0]?.number
            : ""}
        </Text>
      </View>
    </View>
  );
};

export default Contact;
