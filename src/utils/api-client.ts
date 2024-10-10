import axios from "axios";

interface RequestConfig {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  params?: any; 
  data?: any; 
}

export const apiRequest = async ({
  method,
  url,
  params,
  data,
}: RequestConfig) => {
  try {
    const config: any = {
      method,
      url,
    };

    if (method === "GET") {
      config.params = params;
    } else {
      config.data = data;
    }

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error("API Request Error:", error);
    throw error;
  }
};
