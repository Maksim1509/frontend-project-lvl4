export default ({ channelName }) => {
  const errors = {};
  if (!channelName) {
    errors.channelName = 'Required';
  }
  return errors;
};
