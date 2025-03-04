import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import ThemeContext from "../../theme/ThemeContext";
import MaterialIcons from "react-native-vector-icons/MaterialIcons"; 

const CardTwo = ({ title, desk }) => {
  const { colors } = useContext(ThemeContext);
  const navigation = useNavigation();
  const { width } = useWindowDimensions(); // Get dynamic screen width

  return (
    <TouchableOpacity onPress={() => navigation.navigate("QrCode")} style={{ marginVertical: 6 }}>
      <LinearGradient 
        colors={colors.cardBgColors} 
        start={{ x: 0, y: 0 }} 
        end={{ x: 1, y: 0 }}
        style={[styles.card, { width: width * 0.9, height: width * 0.28 }]} // Match Card component dimensions
      >
        <Image 
          source={{ uri: "https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1740960000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=KP~2OEKt9oEPFEnjhrobk54tcRdyMjXhf0rjBueJR3aLs9uGDv8pnwvoNk5bCP~E-EtMi7xyqm27zHOyhqlcjT3~ZM7XN9VThL1DeC9Pc1~bawNJFJwvxmoTgP5TiyfHZgWzlhhxmb~Gz5FI2fV5DB60EFpyhKEgIGvxlvVSYYJNFu7x3vH81~pnVVKutB2db0iIAQYAUIcYSk1V~-gjdH3RK3eW341fjqb0gUhZr5HTFBs2G8NTI9vB7nkK4T~J02GSZZE3Paoz3GbzE7Sl-DsPct~gejfHZGNT-N8fZ1WMWcbEPW21LLow8ZklgKxrFDKm~1mfJerRFiKTGMrXkQ__" }} 
          style={styles.image} 
        />
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: "white" }]}>{title}</Text>
          <Text style={[styles.subText, { color: colors.secondaryColor }]}>For: Self</Text>
          <Text style={[styles.subText, { color: colors.secondaryColor }]}>Desk: {desk}</Text>
        </View>
        <MaterialIcons name="bookmark-border" size={24} color="white" /> 
      </LinearGradient>
    </TouchableOpacity>
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

