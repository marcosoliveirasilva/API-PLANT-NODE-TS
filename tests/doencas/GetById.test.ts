import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Doencas - GetById', () => {
  it('Busca registro por id', async () => {
    const resCreate = await testServer
      .post('/doencas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp",
        "sobre": "jçdçsmlçf",
        "fonte": "https://www.npmjs.com/package/yup"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetById = await testServer
      .get(`/doencas/${resCreate.body}`)
      .send();

    expect(resGetById.statusCode).toEqual(StatusCodes.OK);
    expect(resGetById.body).toHaveProperty('nome');
    expect(resGetById.body).toHaveProperty('nome_cientifico');
    expect(resGetById.body).toHaveProperty('sobre');
    expect(resGetById.body).toHaveProperty('fonte');
  });

  it('Tenta buscar registro que não existe', async () => {
    const resGetById = await testServer
      .get('/doencas/99999')
      .send();

    expect(resGetById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resGetById.body).toHaveProperty('errors.deault');
  });
});
