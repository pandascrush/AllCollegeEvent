import axios from "axios";
import api from "../redux/api";


export const getPeak = async () => {
  let result =  api.get("/perk/g_perk");
  return result
 
};

export const getEventType = async () => {
  let result =  api.get("/eve-type/get");
  return result
 
};

export const getEventTypeCategorys = async () => {
  let result =  api.get("/eve-type-cat/get");
  return result
 
};
export const getCertification = async () => {
  let result =  api.get("/cert/get");
  console.log("check value",result)
  return result
 
};

