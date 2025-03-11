import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../theme/ThemeContext";
import Icon from "react-native-vector-icons/MaterialIcons";
import axios from '../../config/axios'

const CardTwo = ({ data }) => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { width } = useWindowDimensions(); // Get dynamic screen width
  
  return (
    <View style={{ marginVertical: 6 }}>
      <LinearGradient
        colors={colors.cardBgColors}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[styles.card, { width: width * 0.9, height: width * 0.28 }]} // Match Card component dimensions
      >
        <Image
          source={{ uri: `${axios.defaults.baseURL}/${data.images[0]}` }}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: "white" }]}>{data.title}</Text>
          <Text style={[styles.subText, { color: colors.secondaryColor }]}>Location: {data.location}</Text>
          <Text style={[styles.subText, { color: colors.secondaryColor }]}>Price: {data.price}</Text>
        </View>
        <TouchableOpacity onPress={()=>{navigation.navigate('UploadScreen',{propertyId:data._id})}}>
          <Icon name="upload" size={24} color="white" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    marginHorizontal: "2%", // Centering adjustment
    marginVertical: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
  },
  subText: {
    fontSize: 12,
  },
});

export default CardTwo;

