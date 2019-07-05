import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Contact from './components/contact'


export default class App extends Component {


  state = {
    nameToAdd: 'Teste 99',
    emailToAdd: 'teste99@teste.com',
    avatarToAdd: 'meh',
    contatos: []
  }

  componentDidMount = async () => {
    const data = await AsyncStorage.getItem('contacts')
    const contatos = JSON.parse(data) || []
    this.setState({ contatos })

  }

  alertRapidao = param => {
    Alert.alert("ALERTA", param)
  }

  saveContact = () => {
    const contatos = [...this.state.contatos]
    contatos.push({
      id: Math.round(Math.random() * 100),
      name: this.state.nameToAdd,
      email: this.state.emailToAdd,
      avatar: this.state.avatarToAdd,
    })
    this.setState({ contatos }, this.saveInStorage)

  }

  deleteContact = id => {
    const contatos = this.state.contatos.filter(contact => contact.id != id)
    this.setState({ contatos }, this.saveInStorage)
   
  }

  saveInStorage = () => {
    AsyncStorage.setItem('contacts', JSON.stringify(this.state.contatos))
  }


  render() {

    return (
      <View style={styles.container}>

        <View style={styles.addField}>
          <TextInput
            style={styles.textInput}
            placeholder="Nome"
            onChangeText={nameToAdd => this.setState({ nameToAdd })} />
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={emailToAdd => this.setState({ emailToAdd })} />
          <View style={styles.avatarAndSave}>
            <TextInput
              style={[styles.textInput, styles.avatar]}
              placeholder="Avatar"
              onChangeText={avatarToAdd => this.setState({ avatarToAdd })} />
            <TouchableOpacity onPress={this.saveContact}>
              <Text style={styles.saveButton} >SALVAR</Text>
            </TouchableOpacity>

          </View>



        </View>
        <View style={styles.scrollFlatlist}>
          <FlatList
            data={this.state.contatos}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => <Contact {...item} onDelete={this.deleteContact} />} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },

  addField: {
    width: "100%",

  },
  scrollFlatlist: {
    width: '100%',
    backgroundColor: "#CCC",
    flex: 1

  },
  textInput: {
    borderWidth: 1,
    borderColor: '#CCC',
    backgroundColor: '#e3e3e3',
    paddingLeft: 5,

  },
  avatarAndSave: {
    height: 50,
    flexDirection: 'row',


  },
  avatar: {
    flex: 1,
  },
  saveButton: {
    alignItems: 'center',
    backgroundColor: "#FC0",
    color: 'white',
    fontWeight: 'bold',
    height: "100%",
    textAlignVertical: 'center',
    padding: 10,
  }

});
