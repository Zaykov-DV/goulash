import axios from 'axios'
import axiosUrl from '../utils/_axiosUrl'

export const getProducts = async () => {
    const response = await axios({
        method: 'get',
        url: axiosUrl('products'),
    })

    return response.data ?? {}
}
