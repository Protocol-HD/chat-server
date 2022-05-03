import { Logger } from '@nestjs/common';
import {
    ConnectedSocket,
    MessageBody,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway(8080, {
    transports: ['websocket'], cors: {
        origin: "*"
    }
})
export class EventsGateway {
    @WebSocketServer()
    server: Server;

    private logger: Logger = new Logger('EventsGateway');

    @SubscribeMessage('ClientToServer')
    handleEvent(@MessageBody() data: string, @ConnectedSocket() client: Socket,): void {
        this.server.emit('ServerToClient', data);
    }

    afterInit(server: Server) {
        this.logger.log('Init');
    }

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }
}
