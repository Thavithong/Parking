import Vehicle from '../model/Vehicle'
import Message from '../model/Message';
import db from '../api/BaseConfig'

export const getAllVehicle = () => {
    return new Promise((resolve, reject) => {
        let msg = new Message();
        msg.result = [];
        db.transaction((tx) => {
            tx.executeSql('SELECT * FROM tb_vehicle limit 2', [], (tx, results) => {
                for (let i = 0; i < results.rows.length; i++) {
                    let item = results.rows.item(i);
                    let vehicle = new Vehicle(item.vehicle_id, item.vehicle_name, item.vehicle_price);
                    msg.result.push(vehicle);
                }
                msg.message = 'Get all vehicle successfully!';
                resolve({ result: msg.result, message: msg.message });
            }, (error) => {
                msg.result = [];
                msg.message = `${error.message}`;
                resolve({ result: msg.result, message: msg.message });
            });
        })
    });
}

