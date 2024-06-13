import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";


describe('Doencas - UpdateById', () => {
  it('Atualiza registro', async () => {
    const resCreate = await testServer
      .post('/doencas')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp",
        "sobre": "jçdçsmlçf",
        "fonte": "https://www.npmjs.com/package/yup"
       });

    expect(resCreate.statusCode).toEqual(StatusCodes.CREATED);

    const resUpdateById = await testServer
      .put(`/doencas/${resCreate.body}`)
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp",
        "sobre": "jçdçsmlçf",
        "fonte": "https://www.npmjs.com/package/yup"
      });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it('Tenta atualizar registro que não existe', async () => {
    const resUpdateById = await testServer
      .put('/doencas/99999')
      .send({
        "nome": "oidio",
        "nome_cientifico": "ljopjsdçp",
        "sobre": "jçdçsmlçf",
        "fonte": "https://www.npmjs.com/package/yup"
      });

    expect(resUpdateById.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(resUpdateById.body).toHaveProperty('errors.deault');
  });
});
