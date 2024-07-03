import { AxiosError } from 'axios';
import { toastr } from 'react-redux-toastr';

const handleApiError = (error: AxiosError) :void => {
  if (error.response) {
    toastr.error('Response error', 'Check network');
  } else if (error.request) {
    toastr.error('Request error', 'Check network');
  } else {
    toastr.error('Error', error.message);
  }
};

export default handleApiError;
