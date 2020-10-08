import axios from 'axios'
const api = axios.create({
    // baseURL: 'https://e-come.000webhostapp.com/parking/api',
    baseURL: 'https://southidabout.com/parking/api/',
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    },
    timeout: 60000
})

export function* shopRegister(data) {
    return yield api.get('/register.php', {
        params: {
            shop_name: data.shop_name,
            shop_email: data.shop_email,
            shop_phone: data.shop_phone,
            latitude: data.latitude,
            long_latitude: data.long_latitude,
            shop_address: data.shop_address
        }
    });
}

export function* register(data) {
    return yield api.get('/user_register.php', {
        params: {
            shop_id: data.shop_id,
            shop_email: data.shop_email,
            user_name: data.user_name,
            password: data.password,
            email: data.email,
            device_uid: data.device_uid,
            device_token: data.device_token
        }
    });
}

export function* checkLogin(data) {
    return yield api.get('/login.php', {
        params: {
            shop_id: data.shop_id,
            shop_email: data.shop_email,
            password: data.password,
            email: data.email,
            device_uid: data.device_uid,
        }
    });
}
