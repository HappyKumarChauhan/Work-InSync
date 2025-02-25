import React, { useContext, useState } from 'react';
import {
  ImageBackground,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  Image,
  SafeAreaView,
  KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard
} from 'react-native';
import MenuScreen from './MenuScreen';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { ScrollView } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import ThemeContext from '../theme/ThemeContext';


const Dashboard = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarWidth] = useState(new Animated.Value(0));
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mainHeight] = useState(new Animated.Value(300)); // Initial height of the main section
  const [isExpanded, setIsExpanded] = useState(false);

  const { colors} = useContext(ThemeContext)

  const screenHeight = Dimensions.get('window').height; // Get screen height
  const screenWidth = Dimensions.get('window').width;   // Get screen width

  const expandSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: screenWidth,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsSidebarOpen(true);
  };

  const collapseSidebar = () => {
    Animated.timing(sidebarWidth, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsSidebarOpen(false);
  };

  const expandMain = () => {
    Animated.timing(mainHeight, {
      toValue: screenHeight * 0.92,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsExpanded(true);
  };

  const collapseMain = () => {
    Animated.timing(mainHeight, {
      toValue: 300,
      duration: 400,
      useNativeDriver: false,
    }).start();
    setIsExpanded(false);
  };

  // PanResponder for swipe to expand/collapse the main section
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < -50 && !isExpanded) {
        expandMain();
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 50 && isExpanded) {
        collapseMain();
      }
    },
  });

  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : null}
    style={{ flex: 1 }}
  >
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <ImageBackground
      source={{ uri: 'https://s3-alpha-sig.figma.com/img/0abf/9d1c/32df1966e2ce33e9f7138b85ab0dcecc?Expires=1739750400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=A1kNQe9mj62FyClMtjrdrFkS8CU4eKi4RzSy2oDq~iFlLLExGlBfu~3o7HbcrOzrQKxlItZWhFgdaZS84~wWtJwJhHz8hzn8Mei51zJQHgR7DFZKhMou9ArZBDQ5~QTaWhEKcLR~cgjqOAnLcdlZVNBk2Uoh8bNPDnXbRwsx8yOC~f~QrePRsdwF4JjINBdeVsOI~wjB0gm26DZ1RIl9xhHnP1FWfTDU16lYYKJ2VbX5mgFu6FMM1m0AU0az9RgwEMN5n8Ip-qo7EeCcORo6KuddFesoYQ8ztV120uFIdNAXFQ5oPmAI4gLouaM8nL09AR7mYSluVLMC-pNrwG0PZg__' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        {/* Sidebar */}
        <Animated.View style={[styles.sidebar, { width: sidebarWidth }]}>
          <MenuScreen navigation={navigation} collapseSideBar={collapseSidebar} />
        </Animated.View>

        {/* Top Bar */}
        <View style={styles.topBar}>
          <View style={styles.topBarButtonsContainer}>
            <TouchableOpacity style={[styles.topBarButton,{backgroundColor:colors.secondaryBg}]} onPress={()=>navigation.openDrawer()}>
              <Icon name="menu" size={30} color={colors.color} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.topBarButton,{backgroundColor:colors.secondaryBg}]} onPress={() => navigation.navigate('Notification')}>
              <Icon name="notifications" size={30} color={colors.color} />
            </TouchableOpacity>
          </View>
          <View style={[styles.searchBarTop,{backgroundColor:colors.secondaryBg}]}>
            <Icon name="search" size={24} color={colors.color} />
            <TextInput
              style={styles.searchInputTop}
              placeholder="Search"
              placeholderTextColor={colors.color}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </View>

        {/* Main Content */}
        <SafeAreaView style={{ flex: 1 }}>
          <Animated.View style={[styles.main, { height: mainHeight ,backgroundColor:colors.background}]}>
           
              {/* Top section that uses PanResponder */}
              <View
                style={styles.swipeSection}
                {...panResponder.panHandlers}
              >
                <View style={styles.swipeBar}>
                  <View style={[styles.swipeIndicator,{backgroundColor:colors.color}]} />
                  <Text style={[styles.swipeText,{color:colors.color}]}>Swipe Up</Text>
                </View>
              </View>


              {/* Other Scrollable Content */}
              <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag">
              <View style={styles.otherContent}>
                {/* Any other scrollable content goes here */}
                {Array.from({length:8}).map((_,index)=>(<LinearGradient key={index} colors={colors.cardBgColors} style={styles.card}>
                  <Image
                    style={styles.cardImage}
                    source={{
                      uri: 'https://s3-alpha-sig.figma.com/img/0404/f946/26a4a2e1c0b5a85c6e08dc70b45bde20?Expires=1741564800&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=Cv7SwThHtmKs6kAvmFlFYie6JTOqZsGdvogIKpfAgMkHaTJ9y6XgYlD7P-PjwqND-m~sQEz9N8tDyWxxLInxeolLTYNpTPUkutN-NpCFih-AT9PxTFju3Dh1mZzI7evtvf5cipkgEcrH0lfo7fY8ATAFG-d3SkP7mUpDmdkhkf~m1QDKwqE0NUQHnVzW03UlWdGsbvH9b8EO8WWyQz9KjF-xTPDqIlpphCtDCoKFQDxDVlGKub4JluWtRnNJwA29gpGX-ZWkutHxz6sqVX5Epvp~z-YyKbk-MKRr7u1i1K6q0xGJP~0HcAuytbbEFtAIdsWFupCTim-ga-Esf-6W0Q__',
                    }}
                  />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>Bengaluru Brigade</Text>
                    <Text style={styles.cardDetails}>For: Self</Text>
                    <Text style={styles.cardDetails}>Desk: BM-8F-WS-26-2nd Floor</Text>
                    <TouchableOpacity style={styles.detailsButton} onPress={() => navigation.navigate('RoomSpace')}>
                      <Text style={styles.detailsButtonText}>Details</Text>
                    </TouchableOpacity>
                  </View>
                </LinearGradient>))}
                
              </View>
            </ScrollView>
          </Animated.View>
        </SafeAreaView>
      </View>
    </ImageBackground>
    </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'space-between',
    backgroundColor: 'rgba(12, 25, 34, 0.1)',
  },
  topBar: {
    flexDirection: 'column',
    alignItems: 'center',
    gap: 20,
    justifyContent: 'space-between',
    padding: 10,
    paddingHorizontal: 20,
  },
  topBarButtonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  topBarButton: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 50,
  },
  searchBarTop: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  searchInputTop: {
    flex: 1,
    fontSize: 16,
    marginLeft: 5,
  },
  main: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingTop: 20,
    paddingBottom: 40,
    paddingHorizontal: 25,
    alignItems: 'center',
    backgroundColor: '#F3F3F3',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  scrollView: {
    width: '100%',
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // swipeSection: {
  //   marginTop: 30,
  // },
  swipeSection: {
    // You can customize your swipe section container as needed.
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  swipeBar: {
    width: '100%',
    height: 30, // Adjust based on your design
    // backgroundColor: '#fff', // Background color for the bar
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8, // Optional, for rounded corners
    // paddingVertical: 10,
  },
  swipeIndicator: {
    width: 40, // Adjust width of the line
    height: 2, // Height of the indicator line
    borderRadius: 1, // Optional, for rounded corners of the line
    marginBottom: 5, // Space between the line and the text
  },
  swipeText: {
    fontSize: 12, // Small font size
    fontWeight: '300', // Light weight
    color: '#000', // Text color
  },
  card: {
    width: '100%',
    flexDirection: 'row',
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    height: 190,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  cardContent: {
    marginLeft: 15,
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  cardDetails: {
    fontSize: 14,
    color: 'white',
    marginVertical: 2,
  },
  detailsButton: {
    marginTop: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: 85,
  },
  detailsButtonText: {
    color: '#052659',
    fontWeight: 'bold',
  },
  sidebar: {
    position: 'absolute',
    height: '100%',
    backgroundColor: '#0C1922',
    zIndex: 10,
  },
  otherContent: {
    // padding: 20,
  },
});

export default Dashboard;