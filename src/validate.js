import * as yup from 'yup';

export const inputMessageSchema = yup.object().shape({
  message: yup.string().required('Required'),
});

export const channelNameSchema = yup.object().shape({
  channelName: yup.string()
    .required('Required')
    .min(3, 'wrong length')
    .max(12, 'wrong length'),
});
