import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  StatusBar,
  ToastAndroid
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import { SearchBar } from 'react-native-elements'
import ActionButton from 'react-native-action-button'

import Contact from '../components/Contact'
import AddContacts from './AddContactModal';


/*Todo
 - Evento de atualizar dados ao clicar (trabalhando nisso)
 - Checar informações (se digitou algo errado, campos vazios e etc...)
 - Foto ao invés dos avatares
 - Botão de adicionar ao invés do adicionar ali em cima
 - Try/Catch AsyncStorage
 - Splash Screen, icone e nome
 - Criar metodo para filtrar os contatos, melhorando a visualização
 - Adicionar login/sistema de suuários
 - Verificar se já tem o email salvo

*/

export default class App extends Component {


  state = {
    contactsToSave: [],
    contactsToShown: [],
    contactReceived: [],
    refreshList: false,
    searchValue: "",
    searchingList: false,
    showAddContacts: false,

  }

  componentDidMount = async () => {
    this.recoverFromStorage()
  }

  componentWillUnmount() {

  }

  recoverFromStorage = async () => {
    ToastAndroid.show('Atualizando', ToastAndroid.SHORT)
    //Alert.alert('Atualizando', 'Buscando itens salvos')
    const data = await AsyncStorage.getItem('contacts')
    const contacts = JSON.parse(data) || []
    this.setState({ contactsToSave: contacts, contactsToShown: contacts, refreshList: false })
  }


  //o metodo abaixo vai gerenciar a atualização da lista
  //the above method deal with list update
  onRefreshHandler = () => {
    this.setState(
      {
        refreshList: true
      }, () => {
        this.recoverFromStorage()
      })
  }

  deleteContact = id => {
    const contacts = this.state.contactsToSave.filter(contact => contact.id != id)
    this.setState({ contactsToSave: contacts }, this.saveInStorage)
  }

  searchContact = (value) => {
    const contactsToFilter = [...this.state.contactsToSave]
    this.setState({ searchValue: value }, () => {
      const contactsFiltered = contactsToFilter.filter(contact => {
        return contact.name.toLowerCase().indexOf(this.state.searchValue.toLowerCase()) !== -1
      })
      this.setState({ contactsToShown: contactsFiltered })
    })
  }

  renderListHeader = () => {
    return <SearchBar lightTheme
      onChangeText={this.searchContact}
      onCancel={this.recoverFromStorage}
      onClear={this.recoverFromStorage}
      value={this.state.searchValue} />
  }

  updateContact = id => {
    Alert.alert('Item escolhido:', `${id}`)
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <AddContacts isVisible={this.state.showAddContacts}
          onSave={this.addContact}
          onCancel={() => this.setState({ showAddContacts: false })} />
        <View style={styles.scrollFlatlist}>
          <FlatList
            ListHeaderComponent={this.renderListHeader}
            refreshing={this.state.refreshList}
            onRefresh={this.onRefreshHandler}
            data={this.state.contactsToShown}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) =>
              <Contact {...item} onDelete={this.deleteContact} onUpdate={this.updateContact} />
            }
          />
        </View>
        <ActionButton
          buttonColor={'#FC0'}
          onPress={() => { this.props.navigation.navigate("AddContacts") }

            // () => { this.props.navigation.navigate("AddContacts", { callHome: this.addContactHandler.bind(this) }) }
          }></ActionButton>
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
