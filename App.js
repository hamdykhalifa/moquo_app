import React, { Component } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";

import Firebase from "./js/Firebase";
import Quote from "./js/components/Quote";
import NewQuote from "./js/components/NewQuote";

function StyledButton(props) {
  let button = null;
  if (props.visible)
    button = (
      <View style={props.style}>
        <Button title={props.title} onPress={props.onPress} />
      </View>
    );
  return button;
}

export default class App extends Component {
  state = { index: 0, showNewQuoteScreen: false, quotes: [], isLoading: true };

  _retrieveData = async () => {
    let quotes = [];
    let query = await Firebase.db.collection("quotes").get();
    query.forEach((quote) => {
      quotes.push({
        id: quote.id,
        text: quote.data().text,
        author: quote.data().author,
      });
    });
    this.setState({ quotes, isLoading: false });
  };

  _saveQuoteDB = async (text, author, quotes) => {
    docRef = await Firebase.db.collection("quotes").add({ text, author });
    quotes[quotes.length - 1].id = docRef.id;
  };

  _removeQuoteDB(id) {
    Firebase.db.collection("quotes").doc(id).delete();
  }

  _addQuote = (text, author) => {
    let { quotes } = this.state;
    if (text !== null && author !== null) {
      quotes.push({ text, author });
      this._saveQuoteDB(text, author, quotes);
    }

    this.setState({
      index: quotes.length - 1,
      showNewQuoteScreen: false,
      quotes,
    });
  };

  _deleteButton() {
    Alert.alert("Delete?", "Are you sure you want to delete this quote?", [
      { text: "Cancel" },
      {
        text: "Delete",
        onPress: () => {
          this._deleteQuote();
        },
      },
    ]);
  }

  _deleteQuote() {
    let { index, quotes } = this.state;
    this._removeQuoteDB(quotes[index].id);
    quotes.splice(index, 1);
    this.setState({ index: 0, quotes });
  }

  componentDidMount() {
    Firebase.init();
    this._retrieveData();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color="black" />
        </View>
      );
    }
    let { index, quotes } = this.state;
    const quote = quotes[index];
    let nextIndex = index + 1;
    let preIndex = index - 1;
    if (nextIndex === quotes.length) nextIndex = 0;
    if (preIndex === quotes.length) preIndex = 0;
    let content = <Text style={{ fontSize: 36 }}>Keine Zitate</Text>;
    if (quote) {
      content = <Quote text={quote.text} author={quote.author} />;
    }

    return (
      <View style={styles.container}>
        <StyledButton
          style={styles.newButton}
          visible={true}
          title="New"
          onPress={() => this.setState({ showNewQuoteScreen: true })}
        />
        <NewQuote
          visible={this.state.showNewQuoteScreen}
          onSave={this._addQuote}
        />
        {content}
        <StyledButton
          style={styles.nextButton}
          visible={quotes.length >= 2}
          title="Next quote"
          onPress={() => this.setState({ index: nextIndex })}
        />

        <StyledButton
          style={styles.preButton}
          visible={quotes.length >= 2}
          title="Previous quote"
          onPress={() => this.setState({ index: preIndex })}
        />

        <StyledButton
          style={styles.delButton}
          visible={quotes.length >= 1}
          title="Delete"
          onPress={() => this._deleteButton()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightcyan",
    alignItems: "center",
    justifyContent: "center",
  },
  nextButton: { position: "absolute", bottom: 80, right: 70 },
  preButton: { position: "absolute", top: 80, left: 10 },
  newButton: { position: "absolute", top: 80, right: 20 },
  delButton: { position: "absolute", bottom: 80, left: 10 },
});
