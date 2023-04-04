import decompress from "decompress";
import { app } from "electron";

import path from "path";

const tempPath = app.getPath("temp")

const decompressCodePrezArchive = async (archivePath: string, presentationPath: string) => {
    try {
        const files = await decompress(archivePath, presentationPath);
        console.log(files.find((file) => file.path == "presentation.md")?.data.toString());
        return files
    } catch(e) {
        console.error(e);
    }
}

export const openCodePrezArchive = async (archivePath: string) => {

    const presentationPath = path.join(tempPath, "codeprez") //useful for assets, style.css and env

    const files = await decompressCodePrezArchive(archivePath, presentationPath);

    if(!files) return;

    const presentationFileContent = files.find((file) => file.path == "presentation.md")?.data.toString();

    const plainPresentationConfig = files.find((file) => file.path == "config.json")?.data.toString();
    const presentationConfig = JSON.parse(plainPresentationConfig ?? "{}");

    // const presentationPath = `${tempPath}/codeprez`; //useful for assets, style.css and env

    return {presentationConfig, presentationFileContent, presentationPath};
}