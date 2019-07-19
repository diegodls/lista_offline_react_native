import React from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Swipeable from 'react-native-swipeable'

export default props => {
    const rightContent = [
        <View>
            <TouchableOpacity style={styles.delete} onPress={() => props.onDelete(props.id)}>
                <Icon name="delete" size={30} color='#FFF' />
            </TouchableOpacity>
        </View>
    ]

    return (
        <Swipeable
            rightActionActivationDistance={200}
            rightButtons={rightContent}
            onRightActionActivate={() => props.onDelete(props.id)}>
            <View style={styles.container}>
                <View style={styles.avatarField}>
                    <Icon name={props.avatar == null ? 'exclamation' : props.avatar} size={50} />
                </View>
                <View style={styles.infoField}>
                    <Text style={styles.idField}>{props.id}</Text>
                    <Text style={styles.nameField}>{props.name}</Text>
                    <Text style={styles.emailField}>{props.email}</Text>
                </View>
            </View>
        </Swipeable>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        width: '100%',
        paddingLeft: 10,
        marginBottom: 5,
        backgroundColor: '#EEE',
        alignItems: 'center'
    },
    idField: {
        fontSize: 15,
        textDecorationLine: 'underline'

    },
    avatarField: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        width: 50,
        height: 50,



    },
    infoField: {
        marginLeft: 10

    },
    nameField: {
        fontSize: 20,
        fontWeight: 'bold'

    },
    emailField: {
        fontSize: 15,
        //marginLeft: 10,
        //fontStyle: 'italic'

    },
    delete: {
        backgroundColor: 'red',
        height: '96%',
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15

    }



})