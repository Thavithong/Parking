export default class Transaction {
    trans_id: number;
    trans_date: string;
    amount: number;
    vehicle_id: number;
    vehicle_name: string;
    vehicle_number: string;
    user_id: number;
    status: string;
    trans_time: string;
    shop_id: number;
    shop_email: string;
    trans_sate: string;
    check_out_time: string;

    constructor(trans_id = 1, trans_date = '', amount = 1, vehicle_id = 1, vehicle_name = '', vehicle_number = '', user_id = 1, status = '', trans_time ='', shop_id=0, shop_email='', trans_sate='', check_out_time='') {
        this.trans_id = trans_id;
        this.trans_date = trans_date;
        this.amount = amount;
        this.vehicle_id = vehicle_id;
        this.vehicle_name = vehicle_name;
        this.vehicle_number = vehicle_number;
        this.user_id = user_id;
        this.status = status;
        this.trans_time = trans_time;
        this.shop_id = shop_id;
        this.shop_email = shop_email;
        this.trans_sate = trans_sate;
        this.check_out_time = check_out_time;
    }

    clone() {
        return new Transaction(this.trans_id, this.trans_date, this.amount, this.vehicle_id, this.vehicle_name, this.vehicle_number, this.user_id, this.status, this.trans_time, this.shop_id, this.shop_email, this.trans_sate, this.check_out_time);
    }
}