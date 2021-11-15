"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurnatsModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const restaurnat_entity_1 = require("./entities/restaurnat.entity");
const restaurnats_resolver_1 = require("./restaurnats.resolver");
const restaurnats_service_1 = require("./restaurnats.service");
let RestaurnatsModule = class RestaurnatsModule {
};
RestaurnatsModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([restaurnat_entity_1.Restaurnat])],
        providers: [restaurnats_resolver_1.RestaurnatResolver, restaurnats_service_1.RestaurnatService],
    })
], RestaurnatsModule);
exports.RestaurnatsModule = RestaurnatsModule;
//# sourceMappingURL=restaurnats.module.js.map