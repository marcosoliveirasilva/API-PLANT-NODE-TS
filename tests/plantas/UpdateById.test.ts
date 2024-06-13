import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Plantas - UpdateById', () => {
  it('Atualiza registro', async () => {
    const resCreate = await testServer
      .post('/plantas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdateById = await testServer
      .put(`/plantas/${resCreate.body}`)
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp"
      });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta atualizar registro que não existe', async () => {
    const resUpdateById = await testServer
      .put('/plantas/99999')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp"
      });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resUpdateById.body).toHaveProperty('errors.default');
  });
});
