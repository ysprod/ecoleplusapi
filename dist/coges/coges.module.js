"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CogesModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const coges_service_1 = require("./coges.service");
const coges_controller_1 = require("./coges.controller");
const coges_schema_1 = require("./schemas/coges.schema");
const user_schema_1 = require("../user/schemas/user.schema");
const parent_schema_1 = require("../parent/schemas/parent.schema");
let CogesModule = class CogesModule {
};
exports.CogesModule = CogesModule;
exports.CogesModule = CogesModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: coges_schema_1.Coges.name, schema: coges_schema_1.CogesSchema },
                { name: user_schema_1.User.name, schema: user_schema_1.UserSchema },
                { name: parent_schema_1.Parent.name, schema: parent_schema_1.ParentSchema },
            ]),
        ],
        controllers: [coges_controller_1.CogesController],
        providers: [coges_service_1.CogesService],
    })
], CogesModule);
//# sourceMappingURL=coges.module.js.map