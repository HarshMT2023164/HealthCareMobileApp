import { deleteAllFormData, fetchAllFormData } from "../common/Database";
import axios from "axios";
import NetInfo from "@react-native-community/netinfo";
import { BASE_URL, Register_Patient } from "../common/urls";
import { deleteDatabase } from "react-native-sqlite-storage";

const syncDataWithBackend = async () => {
  try {
    let formData = await fetchAllFormData();
    console.log(formData);

    if (formData.length > 0) {
      const isConnected = await NetInfo.fetch().then(
        (state) => state.isConnected
      );

      if (isConnected) {
        // Make API call to sync data with backend
        const keyToAdd = "fieldHealthCareWorkerUsername";
        const valueToAdd = "FHW41545";

        // Using map to create a new array with updated objects
        const updatedFormData = formData.map((item) => ({
          ...item, // Spread existing properties of the object
          [keyToAdd]: valueToAdd, // Append the new key-value pair
        }));

        const objWithListOfPatient = {
          citizens: updatedFormData
        };
        const response = await axios.post(BASE_URL + Register_Patient, objWithListOfPatient);

        if (response.status === 200) {
          console.log("Form data synced with backend successfully.");
          await deleteAllFormData();
          // Optional: Handle successful sync (e.g., clear locally stored data)
        } else {
          console.error(
            "Failed to sync form data with backend:",
            response.data
          );
        }
      } else {
        console.log(
          "Device is offline. Data will be synced automatically when online."
        );
      }
    } else {
      console.log("No locally stored form data to sync.");
    }
  } catch (error) {
    console.error("Error syncing form data with backend:", error);
  }
};

export { syncDataWithBackend };
