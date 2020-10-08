export default class Vehicle {
    vehicle_id: number;
    vehicle_name: string;
    vehicle_price: number

    constructor(vehicle_id = 1, vehicle_name = '', vehicle_price=1) {
        this.vehicle_id = vehicle_id;
        this.vehicle_name = vehicle_name;
        this.vehicle_price = vehicle_price
    }

    clone() {
        return new Vehicle(this.vehicle_id, this.vehicle_name, this.vehicle_price);
    }
}