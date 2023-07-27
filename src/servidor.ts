import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
class App{

    private app: Application; //DECLARANDO QUE ATRIBUTO APP E UMA APLICACAO EXPRESS
    private http: http.Server; //DECLARANDO QUE ATRIBUTO HTTP E UM "SERVIDOR" HTTP
    private socket: Server; //DECLARANDO QUE ATRIBUTO SOCKET E UM "SERVIDOR" QUE VEM DA IMPORTACAO SOCKET

    public constructor(){
        this.app = express();
        this.http = http.createServer(this.app);
        this.socket = new Server(this.http);
         // criando servico de socket, passando como parametro o servidor http,
        // que contem o gerenciamento de rotas do express
        this.listarSocket(); // conecta ao servidor socket assim que o arquivo for rodado
        this.controlaRotas();

    }

    public listarServidor(){
        this.http.listen(4000, () =>{
        console.log("Servidor esta rodando");
        }); //DECLARANDO QUE SERVIDOR IRA RODAR NA PORTA "4000"
    }

    public listarSocket(){
        this.socket.on("connection", (Socket) =>{ 
            console.log("usuario conectado ao socket com sucesso! id => "+ Socket.id);

            Socket.on("mensagem", (texto)=>{ //ENVIA MENSAGEM SOMENTE SE O USUARIO ESTIVER CONECTADO, POIS E PASSADO O PARAM Socket
                this.socket.emit("mensagem", texto);
            })
        }); 
    }

    public controlaRotas(){
        this.app.get('/', (req, res) => {
            res.sendFile(__dirname + "/index.html");
        });
    }
}

const app = new App();
app.listarServidor();
