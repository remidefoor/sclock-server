import { Door } from '../models';
import { client } from '../mqtt';

const EVT_CONNECT = 'connect';
const EVT_LISTEN = 'message';
const SERVER_TOPIC = 'candec-10-server';
const CLIENT_TOPIC = 'candec-10-door';

export function init(): void {
    client.on(EVT_CONNECT, () => {
        console.info('App is connected to MQTT broker.');
        client.subscribe(CLIENT_TOPIC, () => {
            console.info(`App is subscribed to topic ${CLIENT_TOPIC}.`);
        });
    });

    handleMsgs();
}

export function handleMsgs(): void {
    // TODO NYI
    client.on(EVT_LISTEN, (topic: string, msg: string) => {
        console.log('Received msg:', topic, msg.toString());
    });
}

export function publishDoor(door: Door): void {
    client.publish(
        SERVER_TOPIC,
        JSON.stringify(door),
        { qos: 0, retain: false },
        (err) => {
            if (err) console.log('Failed to publish the door.');
        }
    );
}

export default {
    init,
    publishDoor,
};
