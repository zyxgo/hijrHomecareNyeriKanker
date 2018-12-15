import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TouchableHighlight,
  TextInput,
} from 'react-native';
import styles from '../Styles/template1';
import { db } from '../../../firebase';
import * as db1 from '../../../firebase/firebase';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  email;
  namaLengkap;
  handphone;
  alamat;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Input User Profile',
  };
  private taskUser: any;

  constructor(props) {
    super(props);
    this.taskUser = db1.db.ref(`users/${this.props.store.user.uid}`);
    this.state = {
      email : '',
      namaLengkap : '',
      handphone : '',
      alamat : '',
    };
  }

  // public componentDidMount() {
  //   // this.getFirstData(this.taskUser);
  // }

  public render() {
    return (
      <View style={styles.container}>
        {/* <View style={styles.inputContainer}>
          <Text>Email Address</Text>
          <TextInput style={styles.inputs}
              placeholder='Email'
              keyboardType='email-address'
              underlineColorAndroid='transparent'
              onChangeText={(email) => this.setState({email})}/>
        </View> */}
        {/* <View style={styles.card2}><Text>Hi, { this.props.store.user.uid }</Text></View> */}

        <View style={styles.card1}>
          <Text style={styles.itemLeft}>Nama Lengkap</Text>
          <TextInput style={styles.itemRight}
              // placeholder='Nama Lengkap'
              underlineColorAndroid='transparent'
              onChangeText={(namaLengkap) => this.setState({namaLengkap})}/>
        </View>

        <View style={styles.card1}>
          <Text style={styles.itemLeft}>Handphone</Text>
          <TextInput style={styles.itemRight}
              keyboardType='number-pad'
              // placeholder='Nama Lengkap'
              underlineColorAndroid='transparent'
              onChangeText={(handphone) => this.setState({handphone})}/>
        </View>

        <View style={styles.card3}>
          <Text style={styles.itemLeft}>Alamat</Text>
          <TextInput style={styles.itemRight2}
              // placeholder='Alamat'
              multiline={true}
              numberOfLines={4}
              underlineColorAndroid='transparent'
              onChangeText={(alamat) => this.setState({alamat})}/>
        </View>

        <View style={styles.card2}>
          <TouchableHighlight
            style={[styles.buttonContainer, styles.loginButton]}
              onPress={() => this._onSubmit()}
          >
            <Text style={styles.loginText}>Submit</Text>
          </TouchableHighlight>
        </View>
        {/* <TouchableHighlight style={styles.buttonContainer} onPress={() => this.onClickListener('restore_password')}>
            <Text>Forgot your password?</Text>
        </TouchableHighlight> */}

      </View>
    );
  }

  public _onSubmit() {
    // console.log('save', this.props.store.user.uid);
    // db._saveUserProfile(
    //   this.props.store.user.uid,
    //   null,
    //   this.state.namaLengkap,
    //   this.state.handphone,
    //   this.state.alamat,
    // );
    this.taskUser.update({
      namaLengkap: this.state.namaLengkap,
      handphone: this.state.handphone,
      alamat: this.state.alamat,
    });
    // db1.db.ref(`users/${this.props.store.user.uid}`).update({
    //   namaLengkap: this.state.namaLengkap,
    //   handphone: this.state.handphone,
    //   alamat: this.state.alamat,
    // });
  }

  // private async getFirstData( p ) {
  //   await p.once('value')
  //     .then((result) => {
  //       const r1 = [];
  //       r1.push(result.val());
  //       this.setState({
  //         // listUsers: r1,
  //         // btnDisabled: r1[0].flagActivity === 'userIdle' ? false : true,
  //       });
  //       console.log(r1);
  //     }).catch((err) => {
  //       console.log(err);
  //   });
  // }
}

export default Screen;