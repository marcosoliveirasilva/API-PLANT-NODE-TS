import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Doencas - DeleteById', () => {
  it('Apaga registro', async () => {
    const resCreate = await testServer
      .post('/doencas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp",
        "sobre": "jçdçsmlçf",
        "fonte": "https://www.npmjs.com/package/yup"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resDelete = await testServer
      .delete(`/doencas/${resCreate.body}`)
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta apagar registro que não existe', async () => {
    const resDelete = await testServer
      .delete('/doencas/9999999')
      .send();

    expect(resDelete.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resDelete.body).toHaveProperty('errors.default');
  });


});
