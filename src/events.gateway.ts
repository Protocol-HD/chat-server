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
    handleEvent(@MessageBody() data: {room: string, message: string}): void {
        this.server.to(data.room).emit('ServerToClient', data.message);
        this.logger.log(`${data}`);
    }

    @SubscribeMessage('joinRoom')
    createRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
        client.join(data);
        this.logger.log(`join room ${data}`);
    }

    @SubscribeMessage('leaveRoom')
    leaveRoom(@MessageBody() data: string, @ConnectedSocket() client: Socket): void {
        client.leave(data);
        this.logger.log(`leave room ${data}`);
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
