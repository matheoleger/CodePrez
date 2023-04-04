import { app } from "electron";
import { createReadStream, existsSync, rename, unlink } from "fs";
import { mkdir, writeFile } from "fs/promises";
import { CreationCodePrezProps } from "../preload/preload";
import { join } from "path";
import archiver from "archiver";
import { createWriteStream } from "original-fs";

export const createArchive = async (data: CreationCodePrezProps, file: string) => {
    const tempPath = app.getPath("temp") + 'codeprez/';
    if (!existsSync(tempPath)) {
        mkdir(tempPath)
    }

    const configContent = JSON.stringify({
        title: data.title,
        duration: data.duration,
        participants: data.participants
    })
    await writeFile(join(tempPath, "config.json"), configContent, { encoding: "utf-8" });

    const archive = archiver('zip', {
        zlib: { level: 9 }
    });

    const fileName = file.split('.codeprez')[0];
    const output = createWriteStream(`${fileName}.zip`);

    output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    output.on('end', () => {
        console.log('Data has been drained');
    });

    archive.on('warning', (err) => {
        if (err.code === 'ENOENT') {
            // log warning
        } else {
            // throw error
            throw err;
        }
    });
    archive.on('error', (err) => {
        throw err;
    });
    archive.pipe(output);

    archive.append(createReadStream(data.mdFilePath), { name: 'presentation.md' });
    archive.append(createReadStream(data.cssFilePath), { name: 'style.css' });
    archive.append(createReadStream(tempPath + 'config.json'), { name: 'config.json' });
    if (data.envDirectoryPath) {
        archive.directory(data.envDirectoryPath, 'env');
    }
    if (data.assetsDirectoryPath) {
        archive.directory(data.assetsDirectoryPath, 'css');
    }

    archive.finalize().then(() => {
        rename(`${fileName}.zip`, `${fileName}.codeprez`, function (err) {
            if (err) console.log('ERROR: ' + err);
        });
        unlink(join(tempPath, "config.json"), (err) => {
            if (err) {
                console.error("Unabled to delete this file.")
            }
        });
    });

}