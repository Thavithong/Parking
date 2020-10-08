import axios from 'axios'
// const SERVER_PATH ='https://e-come.000webhostapp.com/parking/api'
const SERVER_PATH ='https://southidabout.com/parking/api/'
function configAxios(ip){
    console.log('ip', ip)
    return axios.create({
        baseURL: ip == null ? SERVER_PATH : ip,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        timeout: 60000
    })
}

export function* shopRegister(data, ip) {
    const api = configAxios(ip)
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

export function* register(data, ip) {
    const api = configAxios(ip)
    return yield api.get('/user_register.php', {
        params: {
            shop_id: data.shop_id,
            shop_email: data.shop_email,
            user_name: data.user_name,
            password: data.password,
            email: data.email,
            device_uid: data.device_uid,
            device_token: data.device_token,
            lang: data.lang
        }
    });
}

export function* checkLogin(data, ip) {
    const api = configAxios(ip)
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

export function* checkVersion(language, ip) {
    const api = configAxios(ip)
    return yield api.get(`/version.php?language=${language}`)
}

export function* insertTransaction(data, ip) {
    const api = configAxios(ip)
    console.log('api', api)
    return yield api.post('/closeTransaction.php', data);
}

export function* insertRevertMoney(data, ip) {
    const api = configAxios(ip)
    return yield api.post('/revertMoney.php', data);
}

export function* checkShopInfo(shop_email, token , ip) {
    const api = configAxios(ip)
    return yield api.get('/checkShopInfo.php', {
        params: {
            shop_email: shop_email,
            device_token: token
        }
    });
}

