import { Injectable} from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  public socketStatus = false;
  sucursal = JSON.parse(localStorage.getItem("sucursalBT"));
  idSucursal = this.sucursal['_id'];

  constructor(
    private socket: Socket
  ) { 
    this.checkStatus();
  }


  checkStatus(){
    this.socket.on('connect', () => {
      console.log('Conectado al servidor');
      this.socketStatus = true;
    });

    this.socket.on('disconnect', () => {
      console.log('Desconectado del servidor');
      this.socketStatus = false;
    });

    // this.emit('login', {sala: this.idSucursal });

  }

  emit(evento: string, payload?: any, callback?: Function ){
    this.socket.emit(evento, payload, callback);
    console.log('Envio solicitud socket ' + payload);
  }

  listen (evento: string){
    return this.socket.fromEvent( evento );
  }


}
