import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Plantas - DeleteById', () => {
  it('Apaga registro', async () => {
    const resCreate = await testServer
      .post('/plantas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/plantas/${resCreate.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta apagar registro que não existe', async () => {
    const resDelete = await testServer
      .delete('/plantas/9999999')
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resDelete.body).toHaveProperty('errors.default');
  });


});
