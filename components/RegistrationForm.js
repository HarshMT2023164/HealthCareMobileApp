import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import {
  Button,
  HelperText,
  Menu,
  TextInput,
  useTheme,
} from "react-native-paper";
import { insertFormData } from "../common/Database";
import { syncDataWithBackend } from "../utils/dataSyncService";
import { Askeys, storeInAsyncStorage } from "../utils/AsyncStorageService";



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

    useEffect(() => {
    },[])

  const handleSync = async () => {
    await syncDataWithBackend();
  };

  const handleFormSubmit = async() => {
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
   const abhaIdRegex = /^AB.{5}$/;

  // Check if abhaId matches the regex pattern
  if (!abhaIdRegex.test(form.abhaId)) {
    setErrorFields({
      ...errorFields,
      abhaId: true,
    });
    Alert.alert("Error", "Abha ID must start with 'AB' followed by 5 characters");
    return;
  }

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

    if (isNaN(Number(form.age)) || Number(form.age) <= 0 || Number(form.age) > 150) {
      Alert.alert("Error", "Please enter a valid age (between 1 and 150)");
      return;
    }
  
    if (isNaN(Number(form.pincode)) || form.pincode.length !== 6) {
      Alert.alert("Error", "Please enter a valid 6-digit pincode");
      return;
    }




    insertFormData(form).then(() => {
      storeInAsyncStorage("abhaId", form.abhaId);
      storeInAsyncStorage(Askeys.REGISTER_USER, {name : form.name , gender : form.gender , age : form.age});
      
      console.log("Register data submitted successfully");
    })
    .catch(() => {
      console.log("Error in adding register data to db");
    });
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

    navigation.push("question");
    
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          label={t('Name')}
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
        label={t('Age')}
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
            label={t('Gender')}
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
          title={t('Male')}
        />
        <Menu.Item
          onPress={() => handleInputChange("gender", "female")}
          title={t('Female')}
        />
        <Menu.Item
          onPress={() => handleInputChange("gender", "other")}
          title={t('Others')}
        />
      </Menu>
      <HelperText type="error" visible={errorFields.gender}>
        Please select a gender
      </HelperText>

      {/* Additional inputs with error handling */}
      <TextInput
        label={t('Address')}
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
        label={t('Pincode')}
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
        label={t('State')}
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
        label={t('District')}
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
        label={t('Abha-ID')}
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
          {t('Submit')}
        </Button>
        
        <Button
          mode="contained"
          onPress={() => clearForm()}
          style={styles.button}
        >
          <Text>{t('Clear')}</Text>
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
    width: "47%",
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
