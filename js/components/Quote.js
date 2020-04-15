import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class Quote extends Component {
  render() {
    const { text, author } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.author}>&mdash;{author}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    fontSize: 34,
    fontStyle: "italic",
    margin: 12,
  },
  author: { fontSize: 20, marginBottom: 20, textAlign: "right" },
});
