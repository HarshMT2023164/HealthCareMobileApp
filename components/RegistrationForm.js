import React, { useEffect, useState } from "react";
import { StyleSheet, View, Alert ,Text} from "react-native";
import {
  TextInput,
  Button,
  Menu,
  HelperText,
  useTheme,
} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import SQLite from "react-native-sqlite-storage";
// import { insertFormData } from "../common/Database";
// import { syncDataWithBackend } from "../utils/dataSyncService";

const RegistrationForm = () => {
  const navigation = useNavigation();
  const theme = useTheme();

  const [form, setForm] = useState({
    name: "",
    age: "",
    gender: "",
    address: "",
    pincode: "",
    state: "",
    district: "",
    abhaId: "",
  });

  const [errorFields, setErrorFields] = useState({
    name: false,
    age: false,
    gender: false,
    address: false,
    pincode: false,
    state: false,
    district: false,
    abhaId: false,
  });

  const [visible, setVisible] = useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  const handleInputChange = (key, value) => {
    setForm({
      ...form,
      [key]: value,
    });

    // Reset the error state for the field being edited
    setErrorFields({
      ...errorFields,
      [key]: false,
    });
    closeMenu();
  };

  const clearForm = () => {
    setForm({
      name: "",
      age: "",
      gender: "",
      address: "",
      pincode: "",
      state: "",
      district: "",
      abhaId: "",
    });
  };


  const handleSync = async () => {
    return;
    await syncDataWithBackend();
  };

  const handleFormSubmit = async() => {
    // navigation.push('question');
    const requiredFields = [
      "name",
      "age",
      "gender",
      "address",
      "pincode",
      "state",
      "district",
      "abhaId",
    ];
    const missingFields = requiredFields.filter((field) => !form[field]);

    if (missingFields.length > 0) {
      // Set error state for missing fields
      const newErrorFields = {};
      requiredFields.forEach((field) => {
        newErrorFields[field] = !form[field];
      });
      setErrorFields(newErrorFields);

      Alert.alert("Error", "Please fill out all required fields");
      return;
    }

    if (isNaN(Number(form.age)) || isNaN(Number(form.pincode))) {
      Alert.alert("Error", "Please enter a valid age and pincode");
      return;
    }

    // insertFormData(form);
    console.log("Form submitted!");
    console.log(form);

    // Clear form fields and error states after successful submission
    // setForm({
    //   name: '',
    //   age: '',
    //   gender: '',
    //   address: '',
    //   pincode: '',
    //   state: '',
    //   district: '',
    //   abhaId: ''
    // });
    setErrorFields({
      name: false,
      age: false,
      gender: false,
      address: false,
      pincode: false,
      state: false,
      district: false,
      abhaId: false,
    });

    // Navigate to the next screen or perform other actions
        const temp ={
            name:form.name,
            gender:form.gender,
            age:form.age,
          }
    const res = await AsyncStorage.setItem('userObject', JSON.stringify(temp));
    navigation.push("question");
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label="Name"
          value={form.name}
          onChangeText={(value) => handleInputChange("name", value)}
          mode="outlined"
          style={styles.input}
          error={errorFields.name}
        />

        <HelperText type="error" visible={errorFields.name}>
          Please enter your name
        </HelperText>
      </View>
      <TextInput
        label="Age"
        value={form.age}
        onChangeText={(value) => handleInputChange("age", value)}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        error={errorFields.age}
      />
      <HelperText type="error" visible={errorFields.age}>
        Please enter a valid age
      </HelperText>

      {/* Gender selection with error handling */}
      <Menu
        visible={visible} // Show the menu only if a gender is selected
        onDismiss={closeMenu}
        anchor={
          <TextInput
            label="Gender"
            value={form.gender}
            mode="outlined"
            style={styles.input}
            error={errorFields.gender}
            onFocus={openMenu}
          />
        }
      >
        <Menu.Item
          onPress={() => handleInputChange("gender", "male")}
          title="Male"
        />
        <Menu.Item
          onPress={() => handleInputChange("gender", "female")}
          title="Female"
        />
        <Menu.Item
          onPress={() => handleInputChange("gender", "other")}
          title="Other"
        />
      </Menu>
      <HelperText type="error" visible={errorFields.gender}>
        Please select a gender
      </HelperText>

      {/* Additional inputs with error handling */}
      <TextInput
        label="Address"
        value={form.address}
        onChangeText={(value) => handleInputChange("address", value)}
        mode="outlined"
        style={styles.input}
        error={errorFields.address}
      />
      <HelperText type="error" visible={errorFields.address}>
        Please enter your address
      </HelperText>

      <TextInput
        label="Pincode"
        value={form.pincode}
        onChangeText={(value) => handleInputChange("pincode", value)}
        keyboardType="numeric"
        mode="outlined"
        style={styles.input}
        error={errorFields.pincode}
      />
      <HelperText type="error" visible={errorFields.pincode}>
        Please enter a valid pincode
      </HelperText>

      <TextInput
        label="State"
        value={form.state}
        onChangeText={(value) => handleInputChange("state", value)}
        mode="outlined"
        style={styles.input}
        error={errorFields.state}
      />
      <HelperText type="error" visible={errorFields.state}>
        Please enter your state
      </HelperText>

      <TextInput
        label="District"
        value={form.district}
        onChangeText={(value) => handleInputChange("district", value)}
        mode="outlined"
        style={styles.input}
        error={errorFields.district}
      />
      <HelperText type="error" visible={errorFields.district}>
        Please enter your district
      </HelperText>

      <TextInput
        label="Abha ID"
        value={form.abhaId}
        onChangeText={(value) => handleInputChange("abhaId", value)}
        mode="outlined"
        style={styles.input}
        error={errorFields.abhaId}
      />
      <HelperText type="error" visible={errorFields.abhaId}>
        Please enter your Abha ID
      </HelperText>
      <View style={styles.btnCont}>
        <Button
          mode="contained"
          onPress={handleFormSubmit}
          style={styles.button}
        >
          Submit
        </Button>
        
        <Button
          mode="contained"
          onPress={() => clearForm()}
          style={styles.button}
        >
          <Text style={{fontSize:12}}>Clear form</Text>
        </Button>
        <Button
          mode="contained"
          onPress={() => handleSync()}
          style={styles.button}
        >
          Sync
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    
  },
  button: {
    width: "33%",
    marginTop: 20,
    height : "70%",
    backgroundColor : "#7aa8d2"
  },
  btnCont: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
});

export default RegistrationForm;