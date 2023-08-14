import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  FlatList,
} from 'react-native';
import io from 'socket.io-client';

export default function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Connect to the socket.io server
    const socket = io('http://192.168.1.56:3000');

    // Listen for incoming messages
    socket.on('message', message => {
      setMessages(messages => [...messages, message]);
    });

    // Clean up the socket connection on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  // Send a message to the server
  const sendMessage = () => {
    const socket = io('http://192.168.1.56:3000');
    socket.emit('message', message);
    console.log(message);
    setMessage('');
  };
  const renderItemChat = (item) => {
    return (
      <View style={styles.itemChat}>
        <Text>{item}</Text>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={({item}) => renderItemChat(item)}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Type your message"
          value={message}
          onChangeText={setMessage}
        />
        <Button title="Send" onPress={sendMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginRight: 10,
    padding: 10,
  },
  itemChat: {
    backgroundColor: 'pink',
    maxWidth: '80%',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    borderRadius: 15,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    marginVertical:5
  },
});
