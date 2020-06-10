import * as jimp from "jimp"
import * as path from "path"
import * as moment from "moment"

moment.locale("pt-br");

function pegarLinkDeImagemAleatorio() {
    return `https://picsum.photos/400/400?random=${Math.random()}`;
}

async function pegarDimensoesDaImagem(imagem: any) {
    const largura = await imagem.getWidth();
    const altura = await imagem.getHeight();

    return { largura, altura };
}

function pegarDimensoesDeTexto(font: any, texto: string) {
    const largura = jimp.measureText(font, texto);
    const altura = jimp.measureTextHeight(font, texto, largura);

    return { largura, altura };
}

function pegarPosicaoCentralDeDimensao(dimensaoImagem: number, dimensaoTexto: number) {
    return dimensaoImagem / 2 - dimensaoTexto / 2;
}

export const getImage = async (message: string) => {
    const link = pegarLinkDeImagemAleatorio()
    const imagem = await jimp.read(link)
    const dimensoesDaImagem = await pegarDimensoesDaImagem(imagem)
    const font78 = await jimp.loadFont(path.resolve("src/fonts/font78.fnt"))
    const dimensoesDaFont78 = pegarDimensoesDeTexto(font78, message)
    const font28 = await jimp.loadFont(path.resolve("src/fonts/font28.fnt"))
    let dimensoesDaFont28 = pegarDimensoesDeTexto(font28, "Que você tenha uma ótima")

    let imagemComTexto = imagem.print(
        font78,
        pegarPosicaoCentralDeDimensao(dimensoesDaImagem.largura, dimensoesDaFont78.largura),
        0,
        message
    )

    imagemComTexto = imagemComTexto.print(
        font28,
        pegarPosicaoCentralDeDimensao(dimensoesDaImagem.largura, dimensoesDaFont28.largura),
        dimensoesDaImagem.altura - dimensoesDaFont28.altura - 60,
        "Que você tenha uma ótima"
    );

    dimensoesDaFont28 = pegarDimensoesDeTexto(font28, moment().format("dddd"));

    imagemComTexto = imagemComTexto.print(
        font28,
        pegarPosicaoCentralDeDimensao(dimensoesDaImagem.largura, dimensoesDaFont28.largura),
        dimensoesDaImagem.altura - dimensoesDaFont28.altura - 30,
        moment().format("dddd").toUpperCase()
    );

    const imagemBase64 = await imagemComTexto.getBase64Async(jimp.MIME_JPEG)

    return {
        base64: imagemBase64,
        name: 'bomdia.jpeg',
        message: message,
    }

}
