import { server } from "./server/Server";

server.listen(process.env.PORT || 3333, () => console.log(`API Rodando! ${process.env.PORT}`));
