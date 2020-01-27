import React from 'react';
import { StyleSheet,TouchableHighlight,TouchableOpacity,Alert, Image, Button, View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';

class MyHomeScreen extends React.Component {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={require('./android/app/src/Images/chats-icon.png')}
        style={[styles.icon, {
          tintColor: tintColor }]}
      />
    ),
  };

  render() {
    return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Welcome :)
  </Text>

      <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text> Home Page! </Text>
        <TouchableHighlight 
                style ={{
                    height: 40,
                    width:200,
                    borderRadius: 10,
                    marginLeft : 50,
                    marginRight: 50,
                    marginTop : 10
                }}>
      <Button
        onPress={() => this.props.navigation.openDrawer()}
        title="Drawer Open"
      />
      </TouchableHighlight>
      </View>
      </LinearGradient>
    );
  }
}

 class MyNotificationsScreen extends React.Component {
  constructor(props){
        super(props);
    
        this.state = {
          gameState:  [
            [0,0,0],
            [0,0,0],
            [0,0,0]
          ],
          currentPLayer: 1,
        }
      }
      componentDidMount(){
        this.initializeGame();
      }
      initializeGame = () => {
         this.setState({gameState:
           [
             [0 ,0 ,0],
             [0, 0, 0],
             [0, 0, 0]
           ],
           currentPLayer: 1,
         });
      }
      // Agar player 1 jeete to "1" return kary, player 2 jeete to "-1", agar koi na jeety to zero..
      Winner = () => {
        const NUM_TILES = 3;
        var arr = this.state.gameState;
        var sum;
      // Pehle Rows check kary gy..
      for (var i = 0; i < NUM_TILES; i++){
        sum = arr[i][0] + arr[i][1] + arr[i][2];
        if(sum == 3){return 1;}
        else if(sum == -3){return -1;}
      }
      // Ab Column check kary gy..
      for (var i = 0; i < NUM_TILES; i++){
        sum = arr[0][i] + arr[1][i] + arr[2][i];
        if(sum == 3){return 1;}
        else if(sum == -3){return -1;}
      }
      // ab Diagnol me check kary gy..
      sum = arr[0][0] + arr[1][1] + arr[2][2];
      if(sum == 3){return 1;}
      else if(sum == -3){return -1;}
    
      sum = arr[2][0] + arr[1][1] + arr[0][2];
      if(sum == 3){return 1;}
      else if(sum == -3){return -1;}
    // Agar koi winner na ho to..
    return 0;  
    } 
      onTilePress = (row , col) => {
        // Sign change na hone k liye..
        var value = this.state.gameState[row][col];
        if (value !== 0){return;} 
      // Current player ko pakarne k liye..
    var currentPLayer = this.state.currentPLayer;
    //Check Karne k liye k sab "x"pe click ho rahe..
    var arr = this.state.gameState.slice();
    arr[row][col] = currentPLayer;
    this.setState({gameState: arr});
    //Dosre player pe switch hone k liye..
    var nextPlayer = (currentPLayer==1)? -1 : 1;
    this.setState({currentPLayer: nextPlayer});
    
    // winner check karne k liye..
    var win = this.Winner();
    if (win == 1){
      Alert.alert("Player 1 is the winner");
      this.initializeGame();
    }
    else if (win == -1){
      Alert.alert("Player 2 is the winner");
      this.initializeGame();
    }
    
    }
    //Game agar draw ho to refresh karne k liye
    onNewGamePress = () => {
      this.initializeGame();
    }
      renderIcon = (row , col) => {
        var value = this.state.gameState[row][col];
        switch (value) 
        {
          case 1: return<Icon name="close" style = {styles.tileX} />;
          case -1: return<Icon name="check" style = {styles.tileY} />;
          default: return <View />;
        }
      }
   static navigationOptions = {
    drawerLabel: 'Game',
     drawerIcon: ({ tintColor }) => (
       <Image
         source={require('./android/app/src/Images/notify.png')}
         style={[styles.icon, {
           tintColor: tintColor}]}
       />
     ),
   };

   render() {
     return (
      <LinearGradient colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
      <Text style={styles.buttonText}>
        Welcome :)
      </Text>
      <>
        <View style={styles.container}>
           <View style = {{flexDirection: "row"}}>
                <TouchableOpacity onPress = {() => this.onTilePress(0,0)} style = {[styles.title, {borderLeftWidth: 0, borderTopWidth: 0, }]}>
                    {this.renderIcon(0,0)}
                   </TouchableOpacity>
                 <TouchableOpacity  onPress = {() => this.onTilePress(0,1)} style = {[styles.title, {borderTopWidth: 0, }]}>
                 {this.renderIcon(0,1)}
                   </TouchableOpacity>
                 <TouchableOpacity  onPress = {() => this.onTilePress(0,2)} style = {[styles.title, {borderRightWidth: 0, borderTopWidth: 0, }]}>
             {this.renderIcon(0,2)}
               </TouchableOpacity>
          </View>
           <View style = {{flexDirection: "row"}}>
             <TouchableOpacity  onPress = {() => this.onTilePress(1,0)} style = {[styles.title, {borderLeftWidth: 0, }]}>
             {this.renderIcon(1,0)}
                   </TouchableOpacity>
                 <TouchableOpacity  onPress = {() => this.onTilePress(1,1)} style = {[styles.title, { }]}>
                 {this.renderIcon(1,1)}
                   </TouchableOpacity>
                 <TouchableOpacity  onPress = {() => this.onTilePress(1,2)} style = {[styles.title, {borderRightWidth: 0, }]}>
                {this.renderIcon(1,2)}
                   </TouchableOpacity>
            </View>
           <View style = {{flexDirection: "row"}}>
                 <TouchableOpacity  onPress = {() => this.onTilePress(2,0)} style = {[styles.title, {borderBottomWidth: 0, borderLeftWidth: 0,}]}>
                 {this.renderIcon(2,0)}
                   </TouchableOpacity>
                 <TouchableOpacity  onPress = {() => this.onTilePress(2,1)} style = {[styles.title, {borderBottomWidth: 0,}]}>
                 {this.renderIcon(2,1)}
                   </TouchableOpacity>
                 <TouchableOpacity  onPress = {() => this.onTilePress(2,2)} style = {[styles.title, {borderBottomWidth: 0,borderRightWidth: 0, }]}>
                 {this.renderIcon(2,2)}
                   </TouchableOpacity>
           </View>
           <View style = {{paddingTop: 50}} />
           <Button title = "New Game" onPress = {this.onNewGamePress} />
      </View>
               
       <View style = {{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
         <Text> Go Back Home! </Text>
         <TouchableHighlight 
                 style ={{
                     height: 40,
                     width:200,
                     borderRadius: 10,
                     marginLeft : 50,
                     marginRight: 50,
                     marginTop : 10
                 }}>
       <Button
         onPress={() => this.props.navigation.goBack()}
         title="Go back home"
       />
       </TouchableHighlight>
       <TouchableHighlight 
                 style ={{
                     height: 40,
                     width:200,
                     borderRadius: 10,
                     marginLeft : 50,
                     marginRight: 50,
                     marginTop : 10
                 }}>
       <Button
         onPress={() => this.props.navigation.openDrawer()}
         title="Drawer Open"
       />
       </TouchableHighlight>
       </View>
      </>
      </LinearGradient>
     );
  }
 }
 const styles = StyleSheet.create({
   container:{
     flex: 1,
     backgroundColor: 'yellow',
     alignItems: 'center',
     justifyContent: 'center',
   },
   title:{
     borderWidth: 10,
     width: 100,
     height: 100
   },
   tileX: {
     color: "red",
     fontSize: 60,
     marginLeft: 10,
   },
   tileY: {
     color: "green",
     fontSize: 60,
     marginLeft: 10,
   }, icon: {
     width: 24,
     height: 24,
   },
   linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
 });

 const MyDrawerNavigator = createDrawerNavigator({
   Home: {
     screen: MyHomeScreen,
   },
   Notifications: {
     screen: MyNotificationsScreen,
   },
 },
 {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerBackgroundColor: 'orange',
    drawerWidth: 200,
 }
 ); 
 export default createAppContainer(MyDrawerNavigator);

// import React, { useState, useEffect } from 'react';
// import { Animated, Text, View } from 'react-native';

// const FadeInView = (props) => {
//   const [fadeAnim] = useState(new Animated.Value(0))  // Initial value for opacity: 0

//   React.useEffect(() => {
//     Animated.timing(
//       fadeAnim,
//       {
//         toValue: 1,
//         duration: 10000,
//       }
//     ).start();
//   }, [])

//   return (
//     <Animated.View                 // Special animatable View
//       style={{
//         ...props.style,
//         opacity: fadeAnim,         // Bind opacity to animated value
//       }}
//     >
//       {props.children}
//     </Animated.View>
//   );
// }

// // You can then use your `FadeInView` in place of a `View` in your components:
// export default () => {
//   return (
//     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//       <FadeInView style={{width: 250, height: 50, backgroundColor: 'powderblue'}}>
//         <Text style={{fontSize: 28, textAlign: 'center', margin: 10}}>Fading in</Text>
//       </FadeInView>
//     </View>
//   )
// }



/***************************************Gradient********************************************************************

import React from 'react';
import {StyleSheet, Button, TextInput, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function App() {
return(
  <LinearGradient start={{x: 0, y: 1}} end={{x: 1, y: 0}} colors={['#4c669f', '#3b5998', '#192f6a']} style={styles.linearGradient}>
  <Text style={styles.buttonText}>
    Sign in with Facebook
  </Text>
  <View style={{flex: 1, alignItems: "center", justifyContent: "center"}}>
    <View style = {{ flexDirection: 'row', justifyContent:'space-between'}}>
      <TextInput 
       placeholder = "Course goal"
       style = {{color: 'white', width: '80%' , borderColor: 'black', borderWidth: 1}}
      />
      <Button title = "Add" />
    </View>
  </View>
  </LinearGradient>
);
}
var styles = StyleSheet.create({
  
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
});

/***************************************************************************************************************************************/


// import React from 'react';
// import {StyleSheet,View,TouchableOpacity,Alert,Button} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// export default class App extends React.Component {
//   constructor(props){
//     super(props);

//     this.state = {
//       gameState:  [
//         [0,0,0],
//         [0,0,0],
//         [0,0,0]
//       ],
//       currentPLayer: 1,
//     }
//   }
//   componentDidMount(){
//     this.initializeGame();
//   }
//   initializeGame = () => {
//      this.setState({gameState:
//        [
//          [0 ,0 ,0],
//          [0, 0, 0],
//          [0, 0, 0]
//        ],
//        currentPLayer: 1,
//      });
//   }
//   // Agar player 1 jeete to "1" return kary, player 2 jeete to "-1", agar koi na jeety to zero..
//   Winner = () => {
//     const NUM_TILES = 3;
//     var arr = this.state.gameState;
//     var sum;
//   // Pehle Rows check kary gy..
//   for (var i = 0; i < NUM_TILES; i++){
//     sum = arr[i][0] + arr[i][1] + arr[i][2];
//     if(sum == 3){return 1;}
//     else if(sum == -3){return -1;}
//   }
//   // Ab Column check kary gy..
//   for (var i = 0; i < NUM_TILES; i++){
//     sum = arr[0][i] + arr[1][i] + arr[2][i];
//     if(sum == 3){return 1;}
//     else if(sum == -3){return -1;}
//   }
//   // ab Diagnol me check kary gy..
//   sum = arr[0][0] + arr[1][1] + arr[2][2];
//   if(sum == 3){return 1;}
//   else if(sum == -3){return -1;}

//   sum = arr[2][0] + arr[1][1] + arr[0][2];
//   if(sum == 3){return 1;}
//   else if(sum == -3){return -1;}
// // Agar koi winner na ho to..
// return 0;


// }
  
//   onTilePress = (row , col) => {
//     // Sign change na hone k liye..
//     var value = this.state.gameState[row][col];
//     if (value !== 0){return;} 
//   // Current player ko pakarne k liye..
// var currentPLayer = this.state.currentPLayer;
// //Check Karne k liye k sab "x"pe click ho rahe..
// var arr = this.state.gameState.slice();
// arr[row][col] = currentPLayer;
// this.setState({gameState: arr});
// //Dosre player pe switch hone k liye..
// var nextPlayer = (currentPLayer==1)? -1 : 1;
// this.setState({currentPLayer: nextPlayer});

// // winner check karne k liye..
// var win = this.Winner();
// if (win == 1){
//   Alert.alert("Player 1 is the winner");
//   this.initializeGame();
// }
// else if (win == -1){
//   Alert.alert("Player 2 is the winner");
//   this.initializeGame();
// }

// }
// //Game agar draw ho to refresh karne k liye
// onNewGamePress = () => {
//   this.initializeGame();
// }
//   renderIcon = (row , col) => {
//     var value = this.state.gameState[row][col];
//     switch (value) 
//     {
//       case 1: return<Icon name="close" style = {styles.tileX} />;
//       case -1: return<Icon name="check" style = {styles.tileY} />;
//       default: return <View />;
//     }
//   }
  
//   render() {
//   return (
//       <View style={styles.container}>

//       <View style = {{flexDirection: "row"}}>
//           <TouchableOpacity onPress = {() => this.onTilePress(0,0)} style = {[styles.title, {borderLeftWidth: 0, borderTopWidth: 0, }]}>
//              {this.renderIcon(0,0)}
//             </TouchableOpacity>
//           <TouchableOpacity  onPress = {() => this.onTilePress(0,1)} style = {[styles.title, {borderTopWidth: 0, }]}>
//           {this.renderIcon(0,1)}
//             </TouchableOpacity>
//           <TouchableOpacity  onPress = {() => this.onTilePress(0,2)} style = {[styles.title, {borderRightWidth: 0, borderTopWidth: 0, }]}>
//           {this.renderIcon(0,2)}
//             </TouchableOpacity>
//         </View>
//         <View style = {{flexDirection: "row"}}>
//           <TouchableOpacity  onPress = {() => this.onTilePress(1,0)} style = {[styles.title, {borderLeftWidth: 0, }]}>
//           {this.renderIcon(1,0)}
//             </TouchableOpacity>
//           <TouchableOpacity  onPress = {() => this.onTilePress(1,1)} style = {[styles.title, { }]}>
//           {this.renderIcon(1,1)}
//             </TouchableOpacity>
//           <TouchableOpacity  onPress = {() => this.onTilePress(1,2)} style = {[styles.title, {borderRightWidth: 0, }]}>
//           {this.renderIcon(1,2)}
//             </TouchableOpacity>
//         </View>
//         <View style = {{flexDirection: "row"}}>
//           <TouchableOpacity  onPress = {() => this.onTilePress(2,0)} style = {[styles.title, {borderBottomWidth: 0, borderLeftWidth: 0,}]}>
//           {this.renderIcon(2,0)}
//             </TouchableOpacity>
//           <TouchableOpacity  onPress = {() => this.onTilePress(2,1)} style = {[styles.title, {borderBottomWidth: 0,}]}>
//           {this.renderIcon(2,1)}
//             </TouchableOpacity>
//           <TouchableOpacity  onPress = {() => this.onTilePress(2,2)} style = {[styles.title, {borderBottomWidth: 0,borderRightWidth: 0, }]}>
//           {this.renderIcon(2,2)}
//             </TouchableOpacity>
//         </View>
//         <View style = {{paddingTop: 50}} />
//         <Button title = "New Game" onPress = {this.onNewGamePress} />
//         </View>
   
//   );
// }
// }
// const styles = StyleSheet.create({
//   container:{
//     flex: 1,
//     backgroundColor: 'yellow',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title:{
//     borderWidth: 10,
//     width: 100,
//     height: 100
//   },
//   tileX: {
//     color: "red",
//     fontSize: 60,
//     marginLeft: 10,
//   },
//   tileY: {
//     color: "green",
//     fontSize: 60,
//     marginLeft: 10,
//   }
// });












