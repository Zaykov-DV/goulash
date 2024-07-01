import axios from 'axios'
import axiosUrl from '../utils/_axiosUrl'

export const saveProducts = async (products) => {
    const response = await axios({
        method: 'post',
        url: axiosUrl('save'),
        params: {
            products
        }
    })

    return response.data ?? {}
}
