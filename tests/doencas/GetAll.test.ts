import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Doencas - GetAll', () => {
  it('Busca todos os registros', async () => {
    const resCreate = await testServer
      .post('/doencas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp",
        "sobre": "jçdçsmlçf",
        "fonte": "https://www.npmjs.com/package/yup"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resGetAll = await testServer
      .get('/doencas')
      .send();

    expect(Number(resGetAll.header['x-total-count'])).toBeGreaterThan(0);
    expect(resGetAll.statusCode).toEqual(StatusCodes.OK);
    expect(resGetAll.body.length).toBeGreaterThan(0);
  });
});
