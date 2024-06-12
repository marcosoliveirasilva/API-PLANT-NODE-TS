import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Plantas - GetAll', () => {
  it('Busca todos os registros', async () => {
    const resCreate = await testServer
      .post('/plantas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer
      .get('/plantas')
      .send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});
