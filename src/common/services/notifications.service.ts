import { Injectable } from '@nestjs/common';
import Expo, { ExpoPushMessage, ExpoPushTicket } from 'expo-server-sdk';
import config from '../../config/config';

@Injectable()
export class NotificationsService {
    private expo: Expo;

    constructor() {
        this.expo = new Expo({
            accessToken: config.EXPO_ACCESS_TOKEN
        });
    }

    async sendPushNotification(
        expoPushTokens: string[],
        message: ExpoPushMessage
    ) {
        const messages = expoPushTokens.map((token) => ({
            ...message,
            to: token
        }));

        const chunks = this.expo.chunkPushNotifications(messages);
        const tickets: ExpoPushTicket[] = [];

        for (const chunk of chunks) {
            try {
                const ticketChunk =
                    await this.expo.sendPushNotificationsAsync(chunk);
                tickets.push(...ticketChunk);
            } catch (error) {
                console.error('Error sending notification chunk:', error);
            }
        }

        return tickets;
    }
}
