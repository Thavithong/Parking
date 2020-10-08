export default class ReturnMoney {
    return_id: number;
    trans_date: string;
    amount: number;
    vehicle_id: number;
    vehicle_name: string;
    vehicle_number: string;
    user_id: number;
    status: string;
    shop_id: number;
    shop_email: string;

    constructor(return_id = 1, trans_date = '', amount = 1, vehicle_id = 1, vehicle_name = '', vehicle_number = '', user_id = 1, status = '', shop_id=0, shop_email='') {
        this.return_id = return_id;
        this.trans_date = trans_date;
        this.amount = amount;
        this.vehicle_id = vehicle_id;
        this.vehicle_name = vehicle_name;
        this.vehicle_number = vehicle_number;
        this.user_id = user_id;
        this.status = status;
        this.shop_id = shop_id;
        this.shop_email = shop_email;
    }

    clone() {
        return new ReturnMoney(this.return_id, this.trans_date, this.amount, this.vehicle_id, this.vehicle_name, this.vehicle_number, this.user_id, this.status, this.shop_id, this.shop_email);
    }
}