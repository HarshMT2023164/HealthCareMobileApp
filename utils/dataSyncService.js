import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import {
  deleteAllDataFromTable,
  deleteAllFormData,
  fetchAllFormData,
  fetchDoctorAssignmentsFromDb,
  fetchResponsesFromDb
} from "../common/Database";

import {
  ADD_RESPONSES,
  ASSIGN_DOCTOR,
  BASE_URL,
  Register_Patient
} from "../common/Constants/URLs";
import { TableNames } from "../common/Constants/DBConstants";

const syncRegisterData = async () => {
  try {
    let formData = await fetchAllFormData();
    console.log(formData);
    
    const reqBody = formData.map((item) => {
      const tempObj = {
        abhaId : item.abhaID,
        address : item.address,
        age : item.age,
        district  : item.district,
        gender : item.gender,
        name : item.name,
        pincode : item.pincode,
        state : item.state,

      }
      return tempObj;
    })

    if (reqBody.length > 0) {
      // Make API call to sync data with backend
      const keyToAdd = "fieldHealthCareWorkerUsername";
      const valueToAdd = "FHW41545";

      // // Using map to create a new array with updated objects
      const updatedFormData = reqBody.map((item) => ({
        ...item, // Spread existing properties of the object
        [keyToAdd]: valueToAdd, // Append the new key-value pair
      }));

      const objWithListOfPatient = {
        citizens: updatedFormData,
      };

      console.log(objWithListOfPatient);

      const response = await axios.post(
        BASE_URL + Register_Patient,
        objWithListOfPatient
      );

      if (response.status === 200) {
        console.log("Form data synced with backend successfully.");
        await deleteAllFormData();
        // Optional: Handle successful sync (e.g., clear locally stored data)
      } else {
        console.error("Failed to sync form data with backend:", response.data);
      }
    }
    else{
      console.log("no locally stored data to sync");
    }
  } catch (error) {
    console.log(error);
  }
};

const syncResponseData = async () => {
  
  try {
    let formData = await fetchResponsesFromDb();
    console.log(formData);
    
    

    if (formData.length > 0) {
      // Make API call to sync data with backend
     
   
      const reqBody = formData.map((item) => {
        const tempObj  = {
          abhaId : item.abhaId,
          answers : Object.values(item.responses).map((item) => String(item)),
          score : item.score  
        }
        
        return tempObj;
      })

      const objWithListOfResponses = {
        responses: reqBody,
      };

      console.log(objWithListOfResponses);

      const response = await axios.post(
        BASE_URL + ADD_RESPONSES,
        objWithListOfResponses
      );

      if (response.status === 200) {
        console.log("response data synced with backend successfully.");
        await deleteAllDataFromTable(TableNames.RegisterResponses);
        // Optional: Handle successful sync (e.g., clear locally stored data)
      } else {
        console.error("Failed to sync response data with backend:", response.data);
      }
    }
    else{
      console.log("no locally stored data to sync");
    }
  } catch (error) {
    console.log(error);
  }
};


const syncDocAssignData = async () => {
  
  try {
    let formData = await fetchDoctorAssignmentsFromDb();
    console.log(formData);
    
    

    if (formData.length > 0) {
      // Make API call to sync data with backend

      const objWithListOfAssigns = {
        doctorAssignments: formData,
      };

      console.log(objWithListOfAssigns);

      const response = await axios.post(
        BASE_URL + ASSIGN_DOCTOR,
        objWithListOfAssigns
      );

      if (response.status === 200) {
        console.log("Assign data synced with backend successfully.");
        await deleteAllDataFromTable(TableNames.DoctorAssignment);
        // Optional: Handle successful sync (e.g., clear locally stored data)
      } else {
        console.error("Failed to sync assign data with backend:", response.data);
      }
    }
    else{
      console.log("no locally stored data to sync");
    }
  } catch (error) {
    console.log(error);
  }
};

const syncDataWithBackend = async () => {
  try {
   
      const isConnected = await NetInfo.fetch().then(
        (state) => state.isConnected
      );

      if (isConnected) {
        // Make API call to sync data with backend
        
        await syncRegisterData();
        await syncResponseData();
        await syncDocAssignData();

      } else {
        console.log(
          "Device is offline. Data will be synced automatically when online."
        );
      } 
  } catch (error) {
    console.error("Error syncing form data with backend:", error);
  }
};

export { syncDataWithBackend };
