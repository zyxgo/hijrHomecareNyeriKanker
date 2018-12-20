import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  ScrollView,
  Switch,
  Button,
} from 'react-native';
import { observer } from 'mobx-react';
import { inject } from 'mobx-react/native';
import LayananHomecare from '../AppsData/LayananHomecare';
import * as db1 from '../../../firebase/firebase';
import NumberFormat from 'react-number-format';
import Moment from 'moment';
// import styles from '../Styles/template1';

import { ratio, colors } from '../../../utils/Styles';

interface IProps {
  navigation?: any;
  store?: any;
}

interface IState {
  isLoaded: boolean;
  items: any;
  switchValue;
}

@inject('store') @observer
class Screen extends Component<IProps, IState> {
  public static navigationOptions = {
    title: 'Pilihan Layanan Homecare',
  };

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      switchValue: [false, false, false, false, false, false, false],
      items: [],
    };
  }

  public render() {
    return (
      <View style={styles.container}>
        <ScrollView>
        { LayananHomecare.map((el, key) =>
          <View key={key}
            style={styles.containerCard}>
              <View style={styles.card1}>
                {/* <TouchableOpacity
                  onPress={() => this._onPress(el, key)}
                  > */}
                  <View style={styles.content1}>
                    <Text style={styles.tex1} numberOfLines={2} >{ el.r1 }</Text>
                    <Switch
                      // style={styles.itemRight}
                      onValueChange={() => this._toggleSwitch(key, el)}
                      value={this.state.switchValue[key]}/>
                  </View>
                  <View style={styles.content2}>
                    <Text style={styles.tex2}>{ el.r2 }</Text>
                    <Text style={styles.tex3}>{ el.r3 }</Text>
                  </View>
                {/* </TouchableOpacity> */}
              </View>
          </View>,
        )}
        </ScrollView>
        <View style={{marginVertical: 3}}>
          <Button title='PROSES'
              onPress={() => this._onPress()}
              // disabled={true}
          />
        </View>
      </View>
    );
  }

  private _onPress( ) {
    // this.setState({ totalHargaLayanan: 0 });
    const a = [];
    this.state.switchValue.forEach((res, key) => {
      if (res) {
        // console.log(LayananHomecare[key].r1);
        a.push({
          namaLayanan: LayananHomecare[key].r1,
          hargaLayanan: LayananHomecare[key].r2,
        });
      }
    });
    const url2 = 'users/' + this.props.store.user.uid + '/visit';
    const a2 = db1.db.ref(url2).push();
    db1.db.ref(url2 + '/' + a2.key).update({
      _id: a2.key,
      uid: this.props.store.user.uid,
      namaLengkap: this.props.store.user.userNamaLengkap,
      tanggalRequestVisit: Moment().format('DD/MM/YYYY'),
      itemLayanan: JSON.stringify(a),
      // alamat: p.alamat,
      // handphone: p.handphone,
      requestVisit: 'Request visit',
    });
    db1.db.ref('users/' + this.props.store.user.uid).update({
      requestVisit: 'Request visit',
    });
    const url = 'homecare/visit';
    // const a = db1.db.ref(url).push();
    db1.db.ref(url + '/' + a2.key).update({
      _id: a2.key,
      uid: this.props.store.user.uid,
      namaLengkap: this.props.store.user.userNamaLengkap,
      tanggalRequestVisit: Moment().format('DD/MM/YYYY'),
      itemLayanan: JSON.stringify(a),
      // alamat: p.alamat,
      // handphone: p.handphone,
      requestVisit: 'Request visit',
    });
    this.props.navigation.navigate('Home');
    // console.log(JSON.stringify(a));
  }

  private _toggleSwitch( p, q ) {
    const a = this.state.switchValue;
    a[p] = !this.state.switchValue[p];
    this.setState({
      switchValue: a,
    });
    // console.log(p, this.state.switchValue);
  }
}

export default Screen;

const styles: any = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 5,
  },
  containerCard: {
    flex: 1,
    width: '100%',
    // marginTop: 10,
  },
  card1: {
    flex: 1,
    width: '100%',
    marginBottom: 10,
    padding: 5,
    backgroundColor: '#c8e6c9',
    borderRadius: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  content1: {
    flex: 1,
    // width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  content2: {
    // justifyContent: 'center',
    flex: 1,
    // width: '100%',
    // flexDirection: 'column',
  },
  tex1: {
    fontSize: 16,
  },
  tex2: {
    fontSize: 14,
  },
  tex3: {
    fontSize: 12,
  },
});
