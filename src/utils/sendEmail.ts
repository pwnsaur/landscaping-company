import axios, { AxiosResponse } from 'axios';

import { FormData } from '@/types/contactForm';

type ServerResponse = {
  messageId: string;
  response: string;
};

type SendEmailFn = (
  formData: FormData
) => Promise<AxiosResponse<ServerResponse>>;

const sendEmail: SendEmailFn = async (formData: FormData) => {
  return axios({
    method: 'post',
    url: '/api/send-mail',
    data: formData,
  });
};

export default sendEmail;
