import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
} from 'react-native';

import { ratio, colors } from '../../utils/Styles';

import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import * as db1 from '../../firebase/firebase';

interface IProps {
  navigation?: any;
  store: any;
}

interface IState {
  isLoggingIn: boolean;
  // email;
  // password;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {

  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      isLoggingIn: false,
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }

  private _bootstrapAsync = () => {
    // const userToken = this.props.store.user.uid;
    // db1.db.ref(`users/${userToken}`).once('value')
    // .then((el) => {
    //   this.props.store.user.userRole = el.val().role;
    //   this.props.store.user.userNamaLengkap = el.val().namaLengkap;
    //   this.props.store.user.userTerms = el.val().userTerms;
    //   this.props.store.user.userHandphone = el.val().handphone;
    //   this.props.store.user.userAlamat = el.val().alamat;
    //   // this.props.store.user.userAvatar1 = el.val().userAvatar;
      console.log('roleLoader', this.props.store.user.userRole);
    // });
      this.props.navigation.navigate(this.props.store.user.userRole === 'admin' ? 'HomeAdmin' : 'Home');
    // if (this.props.store.user.userTerms === 'ok') {
    //   this.props.navigation.navigate('Home');
    // } else {
    //   this.props.navigation.navigate('Terms');
    // }
  }

}

export default Screen;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
  },
});
