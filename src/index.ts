import * as wa from '@open-wa/wa-automate'
import { chats } from './utils/chats'

import { Familia } from './classes/Familia'
import { Chat } from './classes/Chat'

const job = async () => {
    const myZap = await wa.create()

    const familia = new Familia(myZap)

    myZap.onMessage(async (message: wa.Message) => {
        const chatId = message.chatId

        let responder

        switch (chats[chatId]?.name) {
            case 'Familia':
                responder = familia
                break
            default:
                responder = new Chat(message.sender.formattedName, message.from, myZap)
                break
        }

        return await responder.respond(message)
    })
}

job()