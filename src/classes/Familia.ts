import * as wa from '@open-wa/wa-automate'
import * as cron from 'node-cron'
import { Chat } from './Chat'

export class Familia extends Chat {
    constructor(client: wa.Client) {
        super('Familia', 'chat_id', client)

        cron.schedule('0 15 9 * * *', async () => {
            await this.sendBomDia()
        })
    }

    async sendBomDia() {
        return await this.respondBomDia()
    }
}