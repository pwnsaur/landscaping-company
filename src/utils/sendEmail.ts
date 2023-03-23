import axios, { AxiosResponse } from 'axios';
import { FormData } from '@/types/contentfulTypes';

type ServerResponse = {
  messageId: string;
  response: string;
};

const sendEmail = async (
  formData: FormData
): Promise<AxiosResponse<ServerResponse>> => {
  return axios({
    method: 'post',
    url: '/api/send-mail',
    data: formData,
  });
};

export default sendEmail;
