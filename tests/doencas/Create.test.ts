import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Doencas - Create', () => {
  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/doencas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp",
        "sobre": "jçdçsmlçf",
        "fonte": "https://www.npmjs.com/package/yup"
       });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1.body).toEqual('number');
  })
});

describe('Doencas - Validar parâmetros', () => {
  it('Cria registro', async () => {
    const res1 = await testServer
      .post('/doencas')
      .send({
        "nome": "oi",
        "nome_cientifico": "lj",
        "sobre": "jç",
        "fonte": "http://www.npmjs.com/package/yup"
       });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.body.nome');
    expect(res1.body).toHaveProperty('errors.body.nome');
    expect(res1.body).toHaveProperty('errors.body.nome');
    expect(res1.body).toHaveProperty('errors.body.nome');
  })
});
