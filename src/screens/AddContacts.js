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
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage'
export default class AddContacts extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            name: '',
            email: '',
            avatar: '',
        }

    }

    componentWillUnmount() {

    }

    save = async () => {
        const data = await AsyncStorage.getItem('contacts')
        const contacts = JSON.parse(data) || []
        contacts.push({
            id: Math.round(Math.random() * 1000),
            name: this.state.name,
            email: this.state.email,
            avatar: this.state.avatar,
        })

        AsyncStorage.setItem('contacts', JSON.stringify(contacts))
        
        this.state = this.getInitialState()
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
                        value={this.state.email} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Avatar"
                        onChangeText={avatar => this.setState({ avatar })}
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