var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_vite = require("vite");
var import_dotenv = __toESM(require("dotenv"), 1);
var import_fs = __toESM(require("fs"), 1);
import_dotenv.default.config();
async function startServer() {
  const app = (0, import_express.default)();
  const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3e3;
  app.use(import_express.default.json());
  app.get("/api/backend-code", (_req, res) => {
    try {
      const codePath = import_path.default.join(process.cwd(), "Code.gs");
      const code = import_fs.default.readFileSync(codePath, "utf-8");
      res.json({ code });
    } catch (error) {
      res.status(500).json({ error: "Failed to read Code.gs" });
    }
  });
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_fs.default.existsSync(import_path.default.join(process.cwd(), "dist")) ? import_path.default.join(process.cwd(), "dist") : import_path.default.join(process.cwd(), "docs");
    app.use(import_express.default.static(distPath, {
      maxAge: "1d",
      index: false
    }));
    app.get("*", (_req, res) => {
      const indexPath = import_path.default.join(distPath, "index.html");
      if (import_fs.default.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build artifacts not found. Please run "npm run build" first.');
      }
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[SERVER] SHE Academy started on port ${PORT}`);
    console.log(`[SERVER] Environment: ${process.env.NODE_ENV || "development"}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
