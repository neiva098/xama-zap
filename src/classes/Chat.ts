import * as wa from '@open-wa/wa-automate'
import { getImage } from '../utils/bomDia'

import carburadorQueimadoAudio = require('../assets/audios/carburadorQueimado.json')

export class Chat {
    title: string
    id: string
    client: wa.Client
    supordedMessages: string[] = ['bom dia', 'bem vindo', 'o que curte']

     constructor (title: string, id: string, client: wa.Client) {
        this.title = title
        this.id = id
        this.client = client
    }

    getSuportedMessage(message: string) {
        let messageToTest = message.toLowerCase()

        for (let k = 0; k < this.supordedMessages.length; k++) {
            const suportedMessage = this.supordedMessages[k]

            const suportedMessageLength = suportedMessage.length
            let matches = 0

            for (let i = 0; i < messageToTest.length - 1; i++) {
                for (let j = 0; j < suportedMessageLength - 1; j++) {
                    if (`${messageToTest[i]}${messageToTest[i + 1]}` == `${suportedMessage[j]}${suportedMessage[j + 1]}`)
                        matches++
                }
            }

            if (matches / suportedMessageLength >= 0.7 ) {
                return suportedMessage
            }
        }
    }
    
    async respondBomDia() {
        const image = await getImage('Bom Dia')
        return await this.client.sendFile(this.id, image.base64, image.name, image.message)
    }
    
    async respondBemVindo() {
        const image = await getImage('Bem Vindo')
        return await this.client.sendFile(this.id, image.base64, image.name, image.message)
    }

    async respondDefault(senderName: string) {
        return 
    }

    async respondOQueCurte() {
        return await this.client.sendFile(this.id, carburadorQueimadoAudio.base64, carburadorQueimadoAudio.fileName, 'ouve ae')
    }

    async respond(message: wa.Message) {
        const suportedMessage = this.getSuportedMessage(message.body)

        switch (suportedMessage) {
            case 'bom dia':
                return await this.respondBomDia()
            case 'bem vindo':
                return await this.respondBemVindo()
            case 'o que curte':
                return await this.respondOQueCurte()
            default:
                return await this.respondDefault(message.sender.name)
        }
    }
}