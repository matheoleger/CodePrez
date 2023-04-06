const { spawn } = require("child_process");
const { createInterface } = require("readline");

const react = spawn("npm", ["run", "dev"], { cwd: process.cwd(), shell: true });
let electron;
react.stdout.on("data", (data) => {
    const str = data.toString();
    if (str.includes("You can now view code-prez in the browser.")) {
        relaunch();
    }
});

react.stdout.pipe(process.stdout);
react.stderr.pipe(process.stderr);

const relaunch = () => {
    const compileTypescript = spawn("npm", ["run", "typescript:compiled"], {
        cwd: process.cwd(),
        shell: true,
    });
    compileTypescript.stdout.pipe(process.stdout);
    compileTypescript.stderr.pipe(process.stderr);

    compileTypescript.on("exit", () => {
        relaunchElectron();
    });
};

const relaunchElectron = () => {
    if (electron) {
        if (process.platform === "win32") {
            spawn("taskkill", ["/pid", electron.pid, "/f", "/t"]);
        } else {
            electron.kill("SIGINT");
        }
    }
    electron = spawn("npm", ["run", "electron:start"], {
        cwd: process.cwd(),
        shell: true,
    });
    electron.stdout.pipe(process.stdout);
    electron.stderr.pipe(process.stderr);
};

let rl = createInterface(process.stdin, process.stdout);

const reloadLoop = () => {
    const answer = rl.question("", (answer) => {
        if (answer === "rl") {
            relaunch();
        }
        reloadLoop();
    });
};

reloadLoop();
