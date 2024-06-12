import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Plantas - GetById', () => {
  it('Busca registro por id', async () => {
    const resCreate = await testServer
      .post('/plantas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetById = await testServer
      .get(`/plantas/${resCreate.body}`)
      .send();

    expect(resGetById.statusCode).toEqual(StatusCodes.OK);
    expect(resGetById.body).toHaveProperty('nome');
    expect(resGetById.body).toHaveProperty('nome_cientifico');
  });

  it('Tenta buscar registro que não existe', async () => {
    const resGetById = await testServer
      .get('/plantas/99999')
      .send();

    expect(resGetById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resGetById.body).toHaveProperty('errors.deault');
  });
});
