import { describe, test, expect } from "@jest/globals";
import app from "../src/server.js";
import request from "supertest";
import { configuration } from "../src/config.js";

describe("Test Suite App", () => {

    test("endpoint /", async() => {
        return await request(app)
            .get("/")
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api fue configurada por el usuario ${configuration.username}`);
            });
    });

    test("endpoint key", async() => {
        return await request(app)
            .get("/key")
            .expect(200)
            .then((response) => {
                expect(response.text).toBe(`Hola, esta api contiene la siguiente api-key: ${configuration.apiKey}`);
            });
    });

    test('Frase vacía', async () => {
        return await request(app)
            .get("/palindromo/")
            .expect("Content-Type", /text\/html/)
            .expect(404)
            /*.then((response) => {
                expect(response.text).toBe("Hola, debe enviar una frase");
            });*/
    });

    test('Frase solo con espacios', async () => {
        return await request(app)
            .get("/palindromo/     ")
            .expect("Content-Type", /text\/html/)
            .expect(404)
            /*.then((response) => {
                expect(response.text).toBe("Hola, debe enviar una frase con algun caracter");
            });*/
    });

    test('Frase con caracteres especiales', async () => {
        return await request(app)
            .get("/palindromo/a%20man,%20a%20plan,%20a%20canal,%20Panama")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
            });
    });

    test('Frase con mayúsculas y minúsculas', async () => {
        return await request(app)
            .get("/palindromo/Able%20was%20I%20ere%20I%20saw%20Elba")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });

    test('Frase no palíndromo', async () => {
        return await request(app)
            .get("/palindromo/Hello%20World")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada no es palindromo");
            });
    });

    test('Frase con números y letras', async () => {
        return await request(app)
            .get("/palindromo/12321")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });

    test('Frase con solo una letra', async () => {
        return await request(app)
            .get("/palindromo/a")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, La frase ingresada es palindromo");
            });
    });
    /*test("endpoint /palindromo", () => {
        expect(1 + 1).toBe(2);
    });*/

    test('Número negativo', async () => {
        return await request(app)
            .get("/primo/-1")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número 0', async () => {
        return await request(app)
            .get("/primo/0")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número 1', async () => {
        return await request(app)
            .get("/primo/1")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número 2 (el primer número primo)', async () => {
        return await request(app)
            .get("/primo/2")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Número grande-primo', async () => {
        return await request(app)
            .get("/primo/7919")  // 7919 es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Número grande-no primo', async () => {
        return await request(app)
            .get("/primo/8000")  // 8000 no es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número par mayor a 2, no primo', async () => {
        return await request(app)
            .get("/primo/10")
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });

    test('Número primo', async () => {
        return await request(app)
            .get("/primo/13")  // 13 es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado es un numero primo");
            });
    });

    test('Número no primo', async () => {
        return await request(app)
            .get("/primo/9")  // 9 no es primo
            .expect("Content-Type", /text\/html/)
            .expect(200)
            .then((response) => {
                expect(response.text).toBe("Hola, el numero ingresado no es un numero primo");
            });
    });
});