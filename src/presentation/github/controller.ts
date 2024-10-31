import { Request, Response } from "express";
import { GithubService } from "../services/github.service";
import { DiscordService } from "../services/discord.service";



export class GithubController {

    constructor(
        private readonly githubService = new GithubService(),
        private readonly discordService = new DiscordService(),
    ) {}

    webHookHandler = (req: Request, res: Response) => {

        const gihubEvent = req.header('x-github-event') ?? 'unknown';
        const payload = req.body;
        let message: string = '';

        switch (gihubEvent) {
            case 'star':
                message = this.githubService.onStar(payload);
                break;

            case 'issues':
                message = this.githubService.onIssue(payload);
                break;
                
            default:
                message = `Event not handled ${gihubEvent}`;
        }
        
        this.discordService.notify(message)
            .then( () => res.status(202).send('Webhook received') )
            .catch( () => res.status(500).json('Error sending message to Discord') );
        
    }
    
    
}