import { envs } from "../../config";



export class DiscordService {

    private readonly discordWebhookUrl = envs.DISCORD_WEBHOOK_URL;
    
    constructor() {}


    async notify(message: string) {

        const body = {
            content: message,
            // embeds: [
            //     {
            //          image: {url: 'https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNjRkdWdiemdtOGZpYW9jazM5YmV0YXN3NmphOGN0cWwxcWdjZHpxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8yehqw4EgwW9kuR6HQ/giphy.gif'}
            //     }
            // ],
        }

        const resp = await fetch(this.discordWebhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if ( !resp.ok ) {
            console.log('Error sending message to Discord');
            return false;
        }

        return true;

    }


}