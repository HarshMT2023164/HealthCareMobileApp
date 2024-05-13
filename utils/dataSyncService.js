import NetInfo from "@react-native-community/netinfo";
import axios from "axios";
import {
  deleteAllDataFromTable,
  deleteAllFormData,
  fetchAllFormData,
  fetchDoctorAssignmentsFromDb,
  fetchFollowUpInstructionData,
  fetchHospitalAssignmentsFromDb,
  fetchResponsesFromDb
} from "../common/Database";

import {
  ADD_FOLLOWUP_INSTRUCTIONS,
  ADD_RESPONSES,
  ASSIGN_DOCTOR,
  ASSIGN_HOSPITAL,
  BASE_URL,
  Register_Patient
} from "../common/Constants/URLs";
import { TableNames } from "../common/Constants/DBConstants";
import { Askeys, getFromAsyncStorage } from "./AsyncStorageService";

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
      const valueToAdd = await getFromAsyncStorage(Askeys.FHW_USERNAME);

      // // Using map to create a new array with updated objects
      const updatedFormData = reqBody.map((item) => ({
        ...item, // Spread existing properties of the object
        [keyToAdd]: valueToAdd, // Append the new key-value pair
      }));

      const objWithListOfPatient = {
        citizens: updatedFormData,
      };

      console.log(objWithListOfPatient);
      const token = await getFromAsyncStorage(Askeys.TOKEN);

      const response = await axios.post(
        BASE_URL + Register_Patient,
        objWithListOfPatient,{
          headers : {
            Authorization: `Bearer ${token}`
          }
        }
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
      const token = await getFromAsyncStorage(Askeys.TOKEN);
      const response = await axios.post(
        BASE_URL + ADD_RESPONSES,
        objWithListOfResponses,
        {
          headers : {
            Authorization: `Bearer ${token}`
          }
        }
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


const syncHospitalAssignData = async () => {
  
  try {
    let formData = await fetchHospitalAssignmentsFromDb();
    console.log(formData);
    
    

    if (formData.length > 0) {
      // Make API call to sync data with backend

      const objWithListOfAssigns = {
        hospitalAssignments: formData,
      };

      console.log(objWithListOfAssigns);
      const token = await getFromAsyncStorage(Askeys.TOKEN);

      const response = await axios.post(
        BASE_URL + ASSIGN_HOSPITAL,
        objWithListOfAssigns,
        {
          headers : {
            Authorization: `Bearer ${token}`,
            
          }
        }
      );

      if (response.status === 200) {
        console.log("Assign data synced with backend successfully.");
        await deleteAllDataFromTable(TableNames.HospitalAssignments);
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

const syncFollowUpInstructionData = async () => {
  
  try {
    let followUpData = await fetchFollowUpInstructionData();
    console.log(followUpData);
    
    

    if (followUpData.length > 0) {
      // Make API call to sync data with backend

      const objWithListOfFollowUpInstructions = {
        followUpInstructionsRequests: followUpData,
      };

      console.log(objWithListOfFollowUpInstructions);
      const token = await getFromAsyncStorage(Askeys.TOKEN);

      const response = await axios.post(
        BASE_URL + ADD_FOLLOWUP_INSTRUCTIONS,
        objWithListOfFollowUpInstructions,
        {
          headers : {
            Authorization: `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        console.log("followUp instruction data synced with backend successfully.");
        await deleteAllDataFromTable(TableNames.FollowUpInstructions);
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
        // deleteAllTableFromSync();
        await syncRegisterData();
        await syncResponseData();
        await syncHospitalAssignData();
        await syncFollowUpInstructionData();

      } else {
        console.log(
          "Device is offline. Data will be synced automatically when online."
        );
      } 
  } catch (error) {
    console.error("Error syncing form data with backend:", error);
  }
};

export const deleteAllTableFromSync = async () => {
  await deleteAllFormData();
  await deleteAllDataFromTable(TableNames.RegisterResponses);
  await deleteAllDataFromTable(TableNames.DoctorAssignment);

}

export { syncDataWithBackend };
