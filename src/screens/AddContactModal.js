import React, { Component } from 'react'
import {
    Modal,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    StyleSheet,
    Alert,
    View,
    TextInput,
    Keyboard
} from 'react-native'

export default class AddContacts extends Component {

    constructor(props) {
        super(props)
        this.state = this.getInitialState()
    }

    getInitialState = () => {
        return {
            name: 'test',
            email: 'test@test.com',
            avatar: 'smileo',
        }

    }

    save = () => {
        if (!this.state.name.trim()) {
            Alert.alert('Dados Invalidos', 'Informe dados validos!')
            return
        }
        const data = { ...this.state }
        this.props.onSave(data)
    }

    render() {
        return (
            <Modal
                onRequestClose={this.props.onCancel}
                visible={this.props.isVisible}
                animationType='fade'
                transparent={true}
                onShow={() => this.setState({ ...this.getInitialState() })}>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}>Novo Contato...</Text>
                    <View style={styles.textInputField}>
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
                    <View style={styles.buttonsField}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.buttonCancel}>Cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.buttonSave}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.offset}></View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}
const styles = StyleSheet.create({
    offset: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },
    container: {
        backgroundColor: '#FFF',
        justifyContent: 'space-between',
        paddingTop: 5,
        paddingBottom: 5,
        borderRadius: 5,
    },
    header: {
        textAlign: 'center',
        padding: 15,
        fontSize: 15,
    },
    textInputField: {

    },
    textInput: {
        borderWidth: 1,
        borderColor: '#CCC',
        backgroundColor: '#e3e3e3',
        paddingLeft: 5,
    },
    buttonsField: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingTop: 5,
        paddingBottom: 5,
    },
    buttonCancel: {
        backgroundColor: "#F00",
        color: '#000',
        fontWeight: 'bold',
        height: 40,
        textAlignVertical: 'center',
        padding: 10,
        margin: 2,
    },
    buttonSave: {
        backgroundColor: "#CF0",
        color: '#000',
        fontWeight: 'bold',
        height: 40,
        textAlignVertical: 'center',
        padding: 10,
        margin: 2,
    },


})