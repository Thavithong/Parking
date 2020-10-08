export default class User {
    user_id: number;
    user_name: string;
    email:string;
    password: string;
    shop_id:number;
    shop_name:string;
    shop_email:string;
    user_state: string;
    shop_permission: number;
    device_token:string;
    latitude:string;
    long_latitude:string;
    serail_number:string;
    
    constructor(user_id = 1, user_name = '', email='', password='', shop_id=0, shop_name='',shop_email='',user_state='',shop_permission=-1, device_token='', latitude='', long_latitude='', serail_number=''  ) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
        this.shop_id = shop_id;
        this.shop_name = shop_name;
        this.shop_email = shop_email;
        this.user_state = user_state;
        this.shop_permission = shop_permission;
        this.device_token = device_token;
        this.latitude = latitude;
        this.long_latitude = long_latitude;
        this.serail_number = serail_number;
    }

    clone() {
        return new User(this.user_id, this.user_name, this.email, this.password, this.shop_id, this.shop_name, this.shop_email, this.user_state, this.shop_permission, this.device_token, this.latitude, this.long_latitude, this.serail_number );
    }
}