import React from 'react'
import { StatusBar, StyleSheet,
  SafeAreaView, 
  KeyboardAvoidingView,
  Platform} from 'react-native';
import { globalStyles } from '../../utils';

function BaseScreen({isSafe=false,...props}:any) {
  return (
    <>
     {
      isSafe ? (
          <>
            <StatusBar translucent backgroundColor="transparent"/>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              style={globalStyles.container}
            >
              <SafeAreaView  style={
                            [
                                styles.wrapScreen,
                                {
                                    backgroundColor: props?.backgroundColor ? props?.backgroundColor : styles.scrollScreen.backgroundColor,

                                }
                            ]
                        }>
                {props.children}
              </SafeAreaView>
            </KeyboardAvoidingView>
          </>
      ): (
        <>
          <StatusBar barStyle="dark-content" backgroundColor="#ffffff"/>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={globalStyles.container}
          >
            <SafeAreaView  style={
                          [
                              styles.wrapScreen,
                              {
                                  backgroundColor: props?.backgroundColor ? props?.backgroundColor : styles.scrollScreen.backgroundColor,

                              }
                          ]
                      }>
              {props.children}
            </SafeAreaView>
          </KeyboardAvoidingView>
        </>
      )
     }
    </>
  )
}

const styles = StyleSheet.create({
  wrapScreen: {
      flex: 1,
      // marginTop: StatusBar.currentHeight,
  },
  scrollScreen: {
      flex: 1,
      backgroundColor: '#FFFFFF',
  },
  contentScroll: {
      paddingBottom: 50,
  },
  viewScreen: {
      flex: 1,
      backgroundColor: '#FFFFFF',
  },
})

export default React.memo(BaseScreen);