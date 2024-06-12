import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Plantas - Create', () => {
  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/plantas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp"
       });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  });

  it('Validar parâmetros', async () => {
    const res1 = await testServer
      .post('/plantas')
      .send({
        "nome": "oi",
        "nome_cientifico": "lj"
       });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
    expect(res1.body).toHaveProperty('errors.body.nome_cientifico');
  })
});
