import React, { Component } from 'react'
import {
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    View,
    TextInput,
    Image,
    StatusBar,
    Dimensions,
    ToastAndroid,
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
export default class AddContacts extends Component {

    state = {
        name: '',
        email: '',
        avatar: '',
        isUpdating: false,
        idToUpdate: '',
    }

    componentDidMount = async () => {
        this.startState()
    }

    startState = async () => {

        const Updating = this.props.navigation.state.params.isUpdating

        if (Updating) {
            const id = this.props.navigation.state.params.id

            if (!id) {
                ToastAndroid.show("Problemas ao encontrar o ID!", ToastAndroid.SHORT)
                return
            }
            ToastAndroid.show("Atualizando: " +
                "ID: " + id + "\n" +
                "isUpdating: " + Updating, ToastAndroid.SHORT)
            const data = await AsyncStorage.getItem('contacts')
            const contacts = JSON.parse(data) || []
            const index = contacts.findIndex(element => element.id === id)

            this.setState({
                id: contacts[index].id,
                name: contacts[index].name,
                email: contacts[index].email,
                avatar: contacts[index].avatar,
                isUpdating: true,
                idToUpdate: id,
            })

        } else {
            this.setState({
                id: '',
                name: '',
                email: '',
                avatar: '',
                isUpdating: false,
                idToUpdate: '',
            })
            ToastAndroid.show("Novo" + "\n" + "isUpdating: " + this.state.isUpdating, ToastAndroid.LONG)

        }
    }

    save = async () => {
        const data = await AsyncStorage.getItem('contacts')
        const contacts = JSON.parse(data) || []

        if (!this.state.name.trim() || !this.state.email.trim() || !this.state.avatar.trim()) {
            ToastAndroid.show("Campos vazios, preencha-os...", ToastAndroid.LONG)
            return
        }

        if (this.state.isUpdating) {

            id = this.state.idToUpdate
            const index = contacts.findIndex(element => element.id === id)
            contacts[index] = {
                ...contacts[index],
                name: this.state.name,
                email: this.state.email,
                avatar: this.state.avatar,
            }
        } else {
            contacts.push({
                id: Math.round(Math.random() * 1000),
                name: this.state.name,
                email: this.state.email,
                avatar: this.state.avatar,
            })

            this.setState({
                id: '',
                name: '',
                email: '',
                avatar: '',
                isUpdating: false,
                idToUpdate: '',
            })

        }

        AsyncStorage.setItem('contacts', JSON.stringify(contacts))
        ToastAndroid.show("Salvo com sucesso!", ToastAndroid.LONG)

    }

    onCancel = () => {
        this.props.navigation.navigate('Home')
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
                <Text style={styles.header}>Novo Contato...</Text>
                <View style={styles.contactImageContainer} >
                    <Image style={styles.contactImage} source={require('../imgs/add_photo-512.png')} />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nome"
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Email"
                        onChangeText={email => this.setState({ email })}
                        autoCapitalize='none'
                        value={this.state.email} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Avatar"
                        onChangeText={avatar => this.setState({ avatar })}
                        autoCapitalize='none'
                        value={this.state.avatar} />
                </View>

                <View style={styles.buttonsContainer}>
                    <TouchableOpacity onPress={this.onCancel}>
                        <Text style={styles.buttonCancel}>Voltar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.save}>
                        <Text style={styles.buttonSave}>Salvar</Text>
                    </TouchableOpacity>
                </View>

            </View >

        )
    }
}
const styles = StyleSheet.create({
    header: {
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 15,
        fontSize: 20,
    },
    container: {
        backgroundColor: '#FFF',
        paddingHorizontal: 5,
        flex: 1,
    },
    contactImageContainer: {
        width: '100%',
        height: Dimensions.get('window').width / 2,
        alignItems: 'center',
    },
    contactImage: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: Dimensions.get('window').width / 2,
        resizeMode: 'center',

    },
    textInputContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    textInput: {
        borderWidth: 1,
        borderColor: '#CCC',
        //backgroundColor: '#e3e3e3',
        backgroundColor: '#FFF',
        paddingLeft: 5,
        height: 50,
        fontSize: 20,
        width: '100%',
    },
    buttonsContainer: {
        flexDirection: 'row',
        padding: 5,
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    },
    buttonCancel: {
        backgroundColor: "#F00",
        color: '#000',
        fontWeight: 'bold',
        height: 50,
        fontSize: 20,
        textAlignVertical: 'center',
        padding: 10,
        margin: 2,
    },
    buttonSave: {
        backgroundColor: "#CF0",
        color: '#000',
        fontWeight: 'bold',
        height: 50,
        fontSize: 20,
        textAlignVertical: 'center',
        padding: 10,
        margin: 2,
    },


})