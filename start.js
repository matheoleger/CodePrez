const { spawn } = require("child_process");
const { createInterface } = require("readline");

const vite = spawn("npm", ["run", "dev"]);
let electron;
vite.stdout.on("data", (data) => {
    const str = data.toString();
    if (str.includes("webpack compiled successfully")) {
        relaunchElectron();
    }
});

vite.stdout.pipe(process.stdout);
vite.stderr.pipe(process.stderr);

const relaunchElectron = () => {
    if (electron) {
        if (process.platform === "win32") {
            spawn("taskkill", ["/pid", electron.pid, "/f", "/t"]);
        }
        else {
            electron.kill("SIGINT");
        }

    }
    electron = spawn("npm", ["run", "electron:start"]);
    electron.stdout.pipe(process.stdout);
    electron.stderr.pipe(process.stderr);
}

let rl = createInterface(process.stdin, process.stdout);

const reloadLoop = () => {
    const answer = rl.question("", (answer) => {
        if (answer === "rl") {
            relaunchElectron();
        }
        reloadLoop();
    });
};

reloadLoop();