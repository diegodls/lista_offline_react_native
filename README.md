# lista_offline_react_native
Aplicativo CRUD desenvolvido em React Native para armazenar dados em uma lista simples.\
![imagem exemplo](https://github.com/diegodls/lista_offline_react_native/blob/master/lista_react_png.png)\
Sistema de localização de dados com barra dedicada.\
Ao adicionar, é aberto uma nova tela que salva no armazenamento do dispositivo.\
Armazenamento de dados é feito na memoria interna do dispositivo, ao fechar o aplicativo, os dados são salvos e podem ser reutilizados novamente.

# Dependencias
[react-native-swipeable](https://github.com/jshanson7/react-native-swipeable)\
[react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)\
[react-native-action-button](https://github.com/mastermoo/react-native-action-button)\
[react-native-elements](https://github.com/react-native-training/react-native-elements)\
[react-navigation](https://reactnavigation.org/docs/en/getting-started.html)

Swipeable, que permite deletar(ou qualquer outra função) ao deslizar para os lados (vide imagem exemplo abaixo).\
Vector Icons, icones como avatares (opções de câmera poderão ser adicionados).\
Action Button, usado para adicionar um botão para adicionar um novo dado.\
Native Elements, usado para adicionar a barra de pesquisa.\
Navigation, usado para navegar entre as telas.

# Instalação
```
clone este repositório
npm install (para instalar os módulos)
react-native run-android (ou react-native run-ios)
```

# Notas
Aplicativo desenvolvido apenas para testes de conhecimento.\
Alguns avisos de seguranças podem aparecer, devido a atualizações dos módulos do react native.\
Algumas dependências deverão ser instaladas para o todal funcionamento, por isso, sempre confira as paginas de cada dependência.

# ToDo
Opção de câmera, utilizar foto como avatar.\
Salvar dados na nuvem, utlizando MongoDB ou Google Firebase.\
Sinta-se livre para sugerir.
