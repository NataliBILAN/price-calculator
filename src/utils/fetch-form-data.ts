import axios from "axios";

export const fetchContainerSizes = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/container-sizes`
  );
  return response.data;
};

export const fetchShipmentTypes = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_API_URL}/shipment-types`
  );
  return response.data;
};
