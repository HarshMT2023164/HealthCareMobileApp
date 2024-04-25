import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Card, Surface, Text, TextInput, IconButton } from "react-native-paper";
import { useTranslation } from "react-i18next";

const FollowUpScreen = () => {
  const [noteText, setNoteText] = useState("");

    //Multilingual
    const {t} = useTranslation();

  const handleInputChange = (inputText) => {
    setNoteText(inputText);
  };

  return (
    <View style={styles.container}>
      <Surface mode="elevated" style={styles.followUpHeading}>
        <Text variant="titleMedium">{t('Instructions')}</Text>
      </Surface>
      <Surface mode="elevated" elevation={4} style={styles.followUpCard}>
        <Card.Content>
          <Text>Follow-up Note 1</Text>
        </Card.Content>
      </Surface>
      <Surface mode="elevated" elevation={4} style={styles.followUpCard}>
        <Card.Content>
          <Text>Follow-up Note 2</Text>
        </Card.Content>
      </Surface>
      <Surface mode="elevated" elevation={4} style={styles.followUpCard}>
        <Card.Content>
          <Text>Follow-up Note 3</Text>
        </Card.Content>
      </Surface>
      <Card style={styles.notesCard}>
        <Card.Content >
          <TextInput style={styles.notesCardContent}
            label={t('Notes')}
            value={noteText}
            onChangeText={handleInputChange}
            multiline
            numberOfLines={10}
            activeUnderlineColor="transparent"
            textAlignVertical="top"
            cursorColor="black"
          />
        </Card.Content>
        <Card.Actions>
          <IconButton
            icon="plus"
            color="#73c0fa"
            size={30}
            style={styles.notesIcon}
          />
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: "10%",
  },
  followUpHeading: {
    width: "55%",
    alignSelf: "center",
    borderRadius: 10,
    textAlign: "center",
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#73c0fa",
    height: 50,
    alignItems: "center",
  },
  followUpCard: {
    borderLeftWidth: 10,
    borderLeftColor: "#73c0fa",
    backgroundColor: "white",
    width: "90%",
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 20,
    height: 80,
  },
  notesCard: {
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 10,
    backgroundColor:'#f5f5f5',
    borderWidth:2,
    borderColor:'lightgray'
  },
  notesCardContent:
  {
    backgroundColor:'white',
  },
  notesIcon: {
    marginTop: 10,
    marginLeft: 10,

  },
});

export default FollowUpScreen;
