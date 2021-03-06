"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateRestaurnatOutput = exports.CreateRestaurnatInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../common/dto/output.dto");
const restaurnat_entity_1 = require("../entities/restaurnat.entity");
let CreateRestaurnatInput = class CreateRestaurnatInput extends (0, graphql_1.PickType)(restaurnat_entity_1.Restaurnat, [
    'name',
    'coverImg',
    'address',
]) {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], CreateRestaurnatInput.prototype, "categoryName", void 0);
CreateRestaurnatInput = __decorate([
    (0, graphql_1.InputType)()
], CreateRestaurnatInput);
exports.CreateRestaurnatInput = CreateRestaurnatInput;
let CreateRestaurnatOutput = class CreateRestaurnatOutput extends output_dto_1.CoreOutput {
};
CreateRestaurnatOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateRestaurnatOutput);
exports.CreateRestaurnatOutput = CreateRestaurnatOutput;
//# sourceMappingURL=create-restaurnat.js.map