import React, {Component} from 'react';
import {
  View,
  Image,
  TouchableHighlight,ImageBackground,
  ScrollView,
  Dimensions,
  StyleSheet,
  I18nManager,
  Platform
  
} from 'react-native';
import colors from '../../styles/colors';
import styles from '../styles/auth/LoggedOut';
import { Container, Header, Content, Button,Text,Tabs,Tab,TabHeading,Icon} from 'native-base';
import {connect} from 'react-redux';
import UserSignIn from './SignIn';
import DrSignIn from './Doctor/DrSignIn';
import AsyncStorage from '@react-native-community/async-storage';

class LoggedOut extends Component{
  state = {
    device: Dimensions.get("window").width > 600 && Dimensions.get("window").height >700 ? "tablet":"phone",
    tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
    phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
    selectdLanguage:''
  }
  constructor (props){
    super(props);
    Dimensions.addEventListener("change",dims =>{
      this.setState({
        tabMode : Dimensions.get("window").width > 900 ? "landscape":"portrait",
        phoneMode :Dimensions.get("window").width >500 ? "landscape":"portrait",
      })
    })
    this._bootstrapAsync()
  }
  _bootstrapAsync = async () => {
      
    const value = await AsyncStorage.getItem('authData')
    this.props.navigation.navigate(value !==null?'App':'Auth');
    
}
  
  onLogin(){
    alert("onLogin");
  }
  onSignUp(){
    alert(Dimensions.get("window").height);
  }
  
  render() {
    const { width } = Dimensions.get('window');
  return(
    
    <Container>

      <Content>
        <ImageBackground source={require('../../assets/top.jpg')} style={inStyles.image}>
        </ImageBackground>
          <View>
              {/* <Image source={require('../../assets/BACKGRROYAL.png')}  style={{ width: width * 0.8, height: width * 0.2 * 2.16,alignItems:"center",alignSelf:"center", }} resizeMode={'contain'} ></Image> */}
              <Text style={ this.state.phoneMode == "landscape" ? styles.phoneWelcomeTextLview:styles.phoneWelcomeText}> Choose Account Type </Text>
          </View>
        <Tabs initialPage ={1} tabContainerStyle="border" tabBarInactiveTextColor="#fff" tabBarUnderlineStyle={{backgroundColor:"#fff"}} style={{marginTop:"3%"}}>
          <Tab heading="Patient"activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#009479"}:{color:"#009479"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
              {I18nManager.isRTL ? Platform.OS == "android" ? <DrSignIn {...this.props} />:<UserSignIn {...this.props}/>:<UserSignIn {...this.props}/>}
          </Tab>
          <Tab heading="Doctor" activeTextStyle={this.state.deviceWidth<360?{fontSize:10,color:"#fff"}:{color:"#fff"}}  textStyle={this.state.deviceWidth<360?{fontSize:10,color:"#009479"}:{color:"#009479"}} tabStyle={{backgroundColor:"#fff"}} activeTabStyle={{backgroundColor:"#009479"}}>
              {I18nManager.isRTL ? Platform.OS == "android" ?<UserSignIn {...this.props}/>: <DrSignIn {...this.props} />:<DrSignIn {...this.props} />}
          </Tab>
        </Tabs>
        </Content>
      </Container>
  );
  }
}
const inStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image:{
    height:300,
    width:"100%",
  }
});
mapStateToProps = (state) => ({
  language:state.selectdLanguage.selectdLanguage,
})

export default connect(mapStateToProps)(LoggedOut);