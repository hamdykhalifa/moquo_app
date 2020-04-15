import React, { Component } from "react";
import { Button, Modal, StyleSheet, TextInput, View } from "react-native";

export default class NewQuote extends Component {
  state = { content: null, author: null };

  render() {
    const { visible, onSave } = this.props;
    const { content, author } = this.state;

    /*
    if (this.props.visible === false) {
      return null;
    }
    */

    return (
      <Modal
        visible={visible}
        onRequestClose={() => {
          this.setState({ content: null, author: null });
          onSave(null, null);
        }}
        animationType="slide"
      >
        <View style={styles.container}>
          <TextInput
            style={[styles.input, { height: 200 }]}
            placeholder="New quote"
            multiline={true}
            onChangeText={(text) => this.setState({ content: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Who said that?"
            onChangeText={(text) => this.setState({ author: text })}
          />
          <Button
            title="Save"
            onPress={() => {
              this.setState({ content: null, author: null });
              onSave(content, author);
            }}
          />
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "moccasin",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#00bfff",
    borderRadius: 10,
    width: "80%",
    marginBottom: 20,
    fontSize: 25,
    padding: 10,
    height: 50,
  },
});
