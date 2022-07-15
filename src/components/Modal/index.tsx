import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { s } from "react-native-size-matters";
import colors from "../../styles/colors";
import styles from "./styles";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: () => void;
  children: React.ReactNode;
  title: string;
  text?: string;
};

const ModalComponent: React.FC<Props> = ({
  visible,
  children,
  title,
  text,
  onClose,
  onSubmit,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <View style={[styles.mainContainer]}>
        <View style={[styles.container]}>
          <Text style={[styles.title]}>{title}</Text>
          <Text style={[styles.text]}>{text}</Text>

          {children}

          <View style={[styles.actions]}>
            <TouchableOpacity
              style={[{ marginRight: s(40) }]}
              onPress={onClose}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={[styles.buttonText, { color: colors.primary }]}
                onPress={onSubmit}
              >
                Save
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;
