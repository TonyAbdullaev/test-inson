import axios from "axios";

type ApiError = {
  message: string;
};

export const customFetcher = async <Data>(url: string, options?: {
  headers?: { "Content-Type": string };
  method: string;
  data?: string;
  revalidate? : boolean;
}): Promise<ApiError | Data> => {
  try {
    const response = await axios(url, options);
    return await response.data;
  } catch (e) {
    throw new Error('An error occurred while fetching the data.')
  }
};
