import { AxiosError } from 'axios'
import { toastr } from 'react-redux-toastr'

export const handleApiError = (error: AxiosError) => {
    if (error.response) {
        toastr.error('Response error', 'Check network')
    } else if (error.request) {
        toastr.error('Request error', 'Check network')
    } else {
        toastr.error('Error', error.message)
    }
}