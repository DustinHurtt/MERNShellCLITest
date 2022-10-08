"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _MernShell_instances, _MernShell_auth, _MernShell_base, _MernShell_views, _MernShell_json, _MernShell_fs, _MernShell_dryRun, _MernShell_devMode, _MernShell_verbose, _MernShell_displayHelp, _MernShell_name, _MernShell_isOutOfSync, _MernShell_isCurrentFolder, _MernShell_isPnpm, _MernShell_skipInstall, _MernShell_setDebug, _MernShell_setSkipInstall, _MernShell_setPackageManagers, _MernShell_setName, _MernShell_setDisplayHelp, _MernShell_setDryRun, _MernShell_setBase, _MernShell_setViews, _MernShell_setFs, _MernShell_setJson, _MernShell_setVerbose, _MernShell_setAuth, _MernShell_isBoolean;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const GetInputs_1 = __importDefault(require("../core/inputs/GetInputs"));
const Package_1 = require("../core/pkg/Package");
const validator_1 = require("../core/validator");
const cli_1 = require("../utils/cli");
class mernshell {
    // Constructor
    constructor(flags, inputs) {
        this.flags = flags;
        this.inputs = inputs;
        _MernShell_instances.add(this);
        // Initial Values
        _MernShell_auth.set(this, false);
        _MernShell_base.set(this, false);
        _MernShell_views.set(this, false);
        _MernShell_json.set(this, false);
        _MernShell_fs.set(this, false);
        _MernShell_dryRun.set(this, false);
        _MernShell_devMode.set(this, false);
        _MernShell_verbose.set(this, false);
        _MernShell_displayHelp.set(this, false);
        _MernShell_name.set(this, "");
        _MernShell_isOutOfSync.set(this, false);
        _MernShell_isCurrentFolder.set(this, false);
        _MernShell_isPnpm.set(this, false);
        _MernShell_skipInstall.set(this, false);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setAuth).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setBase).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setVerbose).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setJson).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setViews).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setFs).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setDryRun).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setDisplayHelp).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setName).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setPackageManagers).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setSkipInstall).call(this);
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_setDebug).call(this);
    }
    // GETTERS
    get name() {
        return __classPrivateFieldGet(this, _MernShell_name, "f");
    }
    get packageManager() {
        if (__classPrivateFieldGet(this, _MernShell_isPnpm, "f") && !this.dryRun) {
            return `pnpm`;
        }
        return "npm";
    }
    get variant() {
        if (__classPrivateFieldGet(this, _MernShell_auth, "f")) {
            return "authentication";
        }
        return "base";
    }
    get base() {
        return __classPrivateFieldGet(this, _MernShell_base, "f");
    }
    get skipInstall() {
        return __classPrivateFieldGet(this, _MernShell_skipInstall, "f");
    }
    get template() {
        if (this.fs) {
            return "fullstack";
        }
        if (this.json) {
            return "json";
        }
        return "views";
    }
    get views() {
        return __classPrivateFieldGet(this, _MernShell_views, "f");
    }
    get verbose() {
        return __classPrivateFieldGet(this, _MernShell_verbose, "f");
    }
    get isPnpm() {
        return __classPrivateFieldGet(this, _MernShell_isPnpm, "f");
    }
    get devMode() {
        return __classPrivateFieldGet(this, _MernShell_devMode, "f");
    }
    get fs() {
        return __classPrivateFieldGet(this, _MernShell_fs, "f");
    }
    get json() {
        return __classPrivateFieldGet(this, _MernShell_json, "f");
    }
    get dryRun() {
        return __classPrivateFieldGet(this, _MernShell_dryRun, "f");
    }
    get auth() {
        return __classPrivateFieldGet(this, _MernShell_auth, "f");
    }
    get displayHelp() {
        return __classPrivateFieldGet(this, _MernShell_displayHelp, "f");
    }
    get isOutOfSync() {
        return __classPrivateFieldGet(this, _MernShell_isOutOfSync, "f");
    }
    get isCurrentFolder() {
        return __classPrivateFieldGet(this, _MernShell_isCurrentFolder, "f");
    }
    // Methods
    debug() {
        console.log(`---- TEMPLATE ----`);
        console.log(`TEMPLATE: - ${this.template}`);
        console.log(`---- VARIANT ----`);
        console.log(`VARIANT: ${__classPrivateFieldGet(this, _MernShell_auth, "f") ? "auth" : __classPrivateFieldGet(this, _MernShell_base, "f") ? "base" : "not_defined"}`);
        console.log(`NAME: ${this.name}`);
        console.log(`---- DEBUG ----`);
        console.log(`DRYRUN: ${this.dryRun}`);
        console.log(`---- displayHelp ----`);
        console.log(`DISPLAY_HELP: ${this.displayHelp}`);
    }
    get variantDefined() {
        return __classPrivateFieldGet(this, _MernShell_base, "f") || __classPrivateFieldGet(this, _MernShell_auth, "f");
    }
    get templateDefined() {
        return __classPrivateFieldGet(this, _MernShell_json, "f") || __classPrivateFieldGet(this, _MernShell_fs, "f") || __classPrivateFieldGet(this, _MernShell_views, "f");
    }
    arrangeName() {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = yield GetInputs_1.default.getName();
            __classPrivateFieldSet(this, _MernShell_name, name.replace(/\s+/g, "-"), "f");
        });
    }
    arrangeVariant() {
        return __awaiter(this, void 0, void 0, function* () {
            const { variant } = yield GetInputs_1.default.getVariant();
            if (variant) {
                __classPrivateFieldSet(this, _MernShell_auth, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _MernShell_base, true, "f");
            }
        });
    }
    arrangeTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = yield GetInputs_1.default.getProject();
            if (project === "fullstack") {
                __classPrivateFieldSet(this, _MernShell_fs, true, "f");
            }
            // @ts-ignore
            if (project === "json") {
                __classPrivateFieldSet(this, _MernShell_json, true, "f");
            }
            // @ts-ignore
            if (project === "views") {
                __classPrivateFieldSet(this, _MernShell_views, true, "f");
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.devMode) {
                const isBad = yield Package_1.Package.isOutOfSync();
                __classPrivateFieldSet(this, _MernShell_isOutOfSync, isBad, "f");
                if (isBad) {
                    return;
                }
            }
            if (!this.name) {
                yield this.arrangeName();
            }
            if (!this.templateDefined) {
                yield this.arrangeTemplate();
            }
            if (!this.variantDefined) {
                yield this.arrangeVariant();
            }
        });
    }
}
_MernShell_auth = new WeakMap(), _MernShell_base = new WeakMap(), _MernShell_views = new WeakMap(), _MernShell_json = new WeakMap(), _MernShell_fs = new WeakMap(), _MernShell_dryRun = new WeakMap(), _MernShell_devMode = new WeakMap(), _MernShell_verbose = new WeakMap(), _MernShell_displayHelp = new WeakMap(), _MernShell_name = new WeakMap(), _MernShell_isOutOfSync = new WeakMap(), _MernShell_isCurrentFolder = new WeakMap(), _MernShell_isPnpm = new WeakMap(), _MernShell_skipInstall = new WeakMap(), _MernShell_instances = new WeakSet(), _MernShell_setDebug = function _MernShell_setDebug() {
    const { debug = false } = this.flags;
    const isDev = process.env.DEV === "true";
    __classPrivateFieldSet(this, _MernShell_devMode, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, isDev) || __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, debug), "f");
}, _MernShell_setSkipInstall = function _MernShell_setSkipInstall() {
    const { ["skip-install"]: skipInstall } = this.flags;
    __classPrivateFieldSet(this, _MernShell_skipInstall, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, skipInstall), "f");
}, _MernShell_setPackageManagers = function _MernShell_setPackageManagers() {
    const { p = false, pnpm = false } = this.flags;
    __classPrivateFieldSet(this, _MernShell_isPnpm, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, p) || __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, pnpm), "f");
}, _MernShell_setName = function _MernShell_setName() {
    // const {inputs, flags} = this
    let [name = ""] = this.inputs;
    const isEmpty = !validator_1.FsValidator.dirNotEmpty();
    if (name.trim() === "." && !isEmpty) {
        return;
    }
    if (name.trim() === ".") {
        __classPrivateFieldSet(this, _MernShell_name, process.cwd().split(path_1.sep).slice(-1)[0], "f");
        __classPrivateFieldSet(this, _MernShell_isCurrentFolder, true, "f");
        return;
    }
    const exists = validator_1.FsValidator.folderExists(name);
    if (exists) {
        return;
    }
    __classPrivateFieldSet(this, _MernShell_name, name, "f");
}, _MernShell_setDisplayHelp = function _MernShell_setDisplayHelp(startingValue = false) {
    const { help, h } = this.flags;
    const isHelpInFlags = Object.values(this.flags).includes("help");
    __classPrivateFieldSet(this, _MernShell_displayHelp, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, help) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, h) ||
        this.inputs.includes("help") ||
        isHelpInFlags, "f");
}, _MernShell_setDryRun = function _MernShell_setDryRun(startingValue = false) {
    const { ["dry-run"]: dryRun = false, dryRun: dryRunCommand } = this.flags;
    __classPrivateFieldSet(this, _MernShell_dryRun, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, dryRun) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, dryRunCommand), "f");
}, _MernShell_setBase = function _MernShell_setBase(startingValue = false) {
    const { base, b } = this.flags;
    __classPrivateFieldSet(this, _MernShell_base, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, base) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, b), "f");
}, _MernShell_setViews = function _MernShell_setViews(startingValue = false) {
    const { views } = this.flags;
    __classPrivateFieldSet(this, _MernShell_views, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, views), "f");
}, _MernShell_setFs = function _MernShell_setFs(startingValue = false) {
    const { fs, fullStack, fullstack } = this.flags;
    __classPrivateFieldSet(this, _MernShell_fs, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, fs) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, fullStack) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, fullstack), "f");
}, _MernShell_setJson = function _MernShell_setJson(startingValue = false) {
    const { json } = this.flags;
    __classPrivateFieldSet(this, _MernShell_json, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, json), "f");
}, _MernShell_setVerbose = function _MernShell_setVerbose(startingValue = false) {
    const { v, verbose } = this.flags;
    __classPrivateFieldSet(this, _MernShell_verbose, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, v) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, verbose), "f");
}, _MernShell_setAuth = function _MernShell_setAuth(startingValue = false) {
    const { a = false, auth = false } = this.flags;
    __classPrivateFieldSet(this, _MernShell_auth, __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, a) ||
        __classPrivateFieldGet(this, _MernShell_instances, "m", _MernShell_isBoolean).call(this, auth), "f");
}, _MernShell_isBoolean = function _MernShell_isBoolean(option = false) {
    return ((typeof option === "boolean" ||
        JSON.parse(JSON.stringify(option)) === "boolean") &&
        option == true);
};
const mernshellConfig = new mernshell(cli_1.flags, cli_1.inputs);
exports.default = mernshellConfig;
