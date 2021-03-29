import fs from 'fs';

export const deleteFile = async(filename: string) => {

    try {
        //verifica se o arquivo existe
        await fs.promises.stat(filename);

    } catch {
        return;
    }
    //Remove o arquivo, caso exista.
    await fs.promises.unlink(filename)
}