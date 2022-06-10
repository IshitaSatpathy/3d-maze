import path from "path";

export default {
    root : path.join(__dirname, "src"),
    publicDir : path.join(__dirname, "static"),
    build : {
        outDir : path.join(__dirname, "dist"),
        emptyOutDir: true,
    }
}