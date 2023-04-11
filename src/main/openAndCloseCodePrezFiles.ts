import decompress from "decompress";
import { app } from "electron";

import path from "path";
import fs from "fs";

const tempPath = app.getPath("temp");

const decompressCodePrezArchive = async (
    archivePath: string,
    presentationPath: string
) => {
    try {
        const files = await decompress(archivePath, presentationPath);
        return files;
    } catch (e) {
        console.error(e);
    }
};

export const openCodePrezArchive = async (archivePath: string) => {
    const presentationPath = path.join(tempPath, "codeprez"); //useful for assets, style.css and env

    deleteCodePrezTempFolder();

    const files = await decompressCodePrezArchive(
        archivePath,
        presentationPath
    );

    if (!files) return;

    const presentationFileContent = files
        .find((file) => file.path === "presentation.md")
        ?.data.toString();

    const plainPresentationConfig = files
        .find((file) => file.path === "config.json")
        ?.data.toString();
    const presentationConfig = JSON.parse(plainPresentationConfig ?? "{}");

    const presentationStyle = files
        .find((file) => file.path === "style.css")
        ?.data.toString();

    return { presentationConfig, presentationFileContent, presentationPath, presentationStyle };
};

export const deleteCodePrezTempFolder = async () => {
    const presentationPath = path.join(tempPath, "codeprez");

    try {
        fs.rmSync(presentationPath, { recursive: true });
    } catch (e) {
        console.error(e);
        return;
    }
};
