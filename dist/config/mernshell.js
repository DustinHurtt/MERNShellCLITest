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
var _mernshell_instances, _mernshell_auth, _mernshell_base, _mernshell_views, _mernshell_json, _mernshell_fs, _mernshell_dryRun, _mernshell_devMode, _mernshell_verbose, _mernshell_displayHelp, _mernshell_name, _mernshell_isOutOfSync, _mernshell_isCurrentFolder, _mernshell_isPnpm, _mernshell_skipInstall, _mernshell_setDebug, _mernshell_setSkipInstall, _mernshell_setPackageManagers, _mernshell_setName, _mernshell_setDisplayHelp, _mernshell_setDryRun, _mernshell_setBase, _mernshell_setViews, _mernshell_setFs, _mernshell_setJson, _mernshell_setVerbose, _mernshell_setAuth, _mernshell_isBoolean;
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
        _mernshell_instances.add(this);
        // Initial Values
        _mernshell_auth.set(this, false);
        _mernshell_base.set(this, false);
        _mernshell_views.set(this, false);
        _mernshell_json.set(this, false);
        _mernshell_fs.set(this, false);
        _mernshell_dryRun.set(this, false);
        _mernshell_devMode.set(this, false);
        _mernshell_verbose.set(this, false);
        _mernshell_displayHelp.set(this, false);
        _mernshell_name.set(this, "");
        _mernshell_isOutOfSync.set(this, false);
        _mernshell_isCurrentFolder.set(this, false);
        _mernshell_isPnpm.set(this, false);
        _mernshell_skipInstall.set(this, false);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setAuth).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setBase).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setVerbose).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setJson).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setViews).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setFs).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setDryRun).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setDisplayHelp).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setName).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setPackageManagers).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setSkipInstall).call(this);
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_setDebug).call(this);
    }
    // GETTERS
    get name() {
        return __classPrivateFieldGet(this, _mernshell_name, "f");
    }
    get packageManager() {
        if (__classPrivateFieldGet(this, _mernshell_isPnpm, "f") && !this.dryRun) {
            return `pnpm`;
        }
        return "npm";
    }
    get variant() {
        if (__classPrivateFieldGet(this, _mernshell_auth, "f")) {
            return "authentication";
        }
        return "base";
    }
    get base() {
        return __classPrivateFieldGet(this, _mernshell_base, "f");
    }
    get skipInstall() {
        return __classPrivateFieldGet(this, _mernshell_skipInstall, "f");
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
        return __classPrivateFieldGet(this, _mernshell_views, "f");
    }
    get verbose() {
        return __classPrivateFieldGet(this, _mernshell_verbose, "f");
    }
    get isPnpm() {
        return __classPrivateFieldGet(this, _mernshell_isPnpm, "f");
    }
    get devMode() {
        return __classPrivateFieldGet(this, _mernshell_devMode, "f");
    }
    get fs() {
        return __classPrivateFieldGet(this, _mernshell_fs, "f");
    }
    get json() {
        return __classPrivateFieldGet(this, _mernshell_json, "f");
    }
    get dryRun() {
        return __classPrivateFieldGet(this, _mernshell_dryRun, "f");
    }
    get auth() {
        return __classPrivateFieldGet(this, _mernshell_auth, "f");
    }
    get displayHelp() {
        return __classPrivateFieldGet(this, _mernshell_displayHelp, "f");
    }
    get isOutOfSync() {
        return __classPrivateFieldGet(this, _mernshell_isOutOfSync, "f");
    }
    get isCurrentFolder() {
        return __classPrivateFieldGet(this, _mernshell_isCurrentFolder, "f");
    }
    // Methods
    debug() {
        console.log(`---- TEMPLATE ----`);
        console.log(`TEMPLATE: - ${this.template}`);
        console.log(`---- VARIANT ----`);
        console.log(`VARIANT: ${__classPrivateFieldGet(this, _mernshell_auth, "f") ? "auth" : __classPrivateFieldGet(this, _mernshell_base, "f") ? "base" : "not_defined"}`);
        console.log(`NAME: ${this.name}`);
        console.log(`---- DEBUG ----`);
        console.log(`DRYRUN: ${this.dryRun}`);
        console.log(`---- displayHelp ----`);
        console.log(`DISPLAY_HELP: ${this.displayHelp}`);
    }
    get variantDefined() {
        return __classPrivateFieldGet(this, _mernshell_base, "f") || __classPrivateFieldGet(this, _mernshell_auth, "f");
    }
    get templateDefined() {
        return __classPrivateFieldGet(this, _mernshell_json, "f") || __classPrivateFieldGet(this, _mernshell_fs, "f") || __classPrivateFieldGet(this, _mernshell_views, "f");
    }
    arrangeName() {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = yield GetInputs_1.default.getName();
            __classPrivateFieldSet(this, _mernshell_name, name.replace(/\s+/g, "-"), "f");
        });
    }
    arrangeVariant() {
        return __awaiter(this, void 0, void 0, function* () {
            const { variant } = yield GetInputs_1.default.getVariant();
            if (variant) {
                __classPrivateFieldSet(this, _mernshell_auth, true, "f");
            }
            else {
                __classPrivateFieldSet(this, _mernshell_base, true, "f");
            }
        });
    }
    arrangeTemplate() {
        return __awaiter(this, void 0, void 0, function* () {
            const { project } = yield GetInputs_1.default.getProject();
            if (project === "fullstack") {
                __classPrivateFieldSet(this, _mernshell_fs, true, "f");
            }
            // @ts-ignore
            if (project === "json") {
                __classPrivateFieldSet(this, _mernshell_json, true, "f");
            }
            // @ts-ignore
            if (project === "views") {
                __classPrivateFieldSet(this, _mernshell_views, true, "f");
            }
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.devMode) {
                const isBad = yield Package_1.Package.isOutOfSync();
                __classPrivateFieldSet(this, _mernshell_isOutOfSync, isBad, "f");
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
_mernshell_auth = new WeakMap(), _mernshell_base = new WeakMap(), _mernshell_views = new WeakMap(), _mernshell_json = new WeakMap(), _mernshell_fs = new WeakMap(), _mernshell_dryRun = new WeakMap(), _mernshell_devMode = new WeakMap(), _mernshell_verbose = new WeakMap(), _mernshell_displayHelp = new WeakMap(), _mernshell_name = new WeakMap(), _mernshell_isOutOfSync = new WeakMap(), _mernshell_isCurrentFolder = new WeakMap(), _mernshell_isPnpm = new WeakMap(), _mernshell_skipInstall = new WeakMap(), _mernshell_instances = new WeakSet(), _mernshell_setDebug = function _mernshell_setDebug() {
    const { debug = false } = this.flags;
    const isDev = process.env.DEV === "true";
    __classPrivateFieldSet(this, _mernshell_devMode, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, isDev) || __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, debug), "f");
}, _mernshell_setSkipInstall = function _mernshell_setSkipInstall() {
    const { ["skip-install"]: skipInstall } = this.flags;
    __classPrivateFieldSet(this, _mernshell_skipInstall, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, skipInstall), "f");
}, _mernshell_setPackageManagers = function _mernshell_setPackageManagers() {
    const { p = false, pnpm = false } = this.flags;
    __classPrivateFieldSet(this, _mernshell_isPnpm, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, p) || __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, pnpm), "f");
}, _mernshell_setName = function _mernshell_setName() {
    // const {inputs, flags} = this
    let [name = ""] = this.inputs;
    const isEmpty = !validator_1.FsValidator.dirNotEmpty();
    if (name.trim() === "." && !isEmpty) {
        return;
    }
    if (name.trim() === ".") {
        __classPrivateFieldSet(this, _mernshell_name, process.cwd().split(path_1.sep).slice(-1)[0], "f");
        __classPrivateFieldSet(this, _mernshell_isCurrentFolder, true, "f");
        return;
    }
    const exists = validator_1.FsValidator.folderExists(name);
    if (exists) {
        return;
    }
    __classPrivateFieldSet(this, _mernshell_name, name, "f");
}, _mernshell_setDisplayHelp = function _mernshell_setDisplayHelp(startingValue = false) {
    const { help, h } = this.flags;
    const isHelpInFlags = Object.values(this.flags).includes("help");
    __classPrivateFieldSet(this, _mernshell_displayHelp, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, help) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, h) ||
        this.inputs.includes("help") ||
        isHelpInFlags, "f");
}, _mernshell_setDryRun = function _mernshell_setDryRun(startingValue = false) {
    const { ["dry-run"]: dryRun = false, dryRun: dryRunCommand } = this.flags;
    __classPrivateFieldSet(this, _mernshell_dryRun, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, dryRun) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, dryRunCommand), "f");
}, _mernshell_setBase = function _mernshell_setBase(startingValue = false) {
    const { base, b } = this.flags;
    __classPrivateFieldSet(this, _mernshell_base, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, base) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, b), "f");
}, _mernshell_setViews = function _mernshell_setViews(startingValue = false) {
    const { views } = this.flags;
    __classPrivateFieldSet(this, _mernshell_views, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, views), "f");
}, _mernshell_setFs = function _mernshell_setFs(startingValue = false) {
    const { fs, fullStack, fullstack } = this.flags;
    __classPrivateFieldSet(this, _mernshell_fs, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, fs) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, fullStack) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, fullstack), "f");
}, _mernshell_setJson = function _mernshell_setJson(startingValue = false) {
    const { json } = this.flags;
    __classPrivateFieldSet(this, _mernshell_json, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) || __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, json), "f");
}, _mernshell_setVerbose = function _mernshell_setVerbose(startingValue = false) {
    const { v, verbose } = this.flags;
    __classPrivateFieldSet(this, _mernshell_verbose, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, v) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, verbose), "f");
}, _mernshell_setAuth = function _mernshell_setAuth(startingValue = false) {
    const { a = false, auth = false } = this.flags;
    __classPrivateFieldSet(this, _mernshell_auth, __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, startingValue) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, a) ||
        __classPrivateFieldGet(this, _mernshell_instances, "m", _mernshell_isBoolean).call(this, auth), "f");
}, _mernshell_isBoolean = function _mernshell_isBoolean(option = false) {
    return ((typeof option === "boolean" ||
        JSON.parse(JSON.stringify(option)) === "boolean") &&
        option == true);
};
const mernshellConfig = new mernshell(cli_1.flags, cli_1.inputs);
exports.default = mernshellConfig;
