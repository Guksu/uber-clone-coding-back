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
exports.UpdateRestaurnatDto = exports.UpdateRestaurnatInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_restaurnat_1 = require("./create-restaurnat");
let UpdateRestaurnatInputType = class UpdateRestaurnatInputType extends (0, graphql_1.PartialType)(create_restaurnat_1.CreateRestaurnatDto) {
};
UpdateRestaurnatInputType = __decorate([
    (0, graphql_1.InputType)()
], UpdateRestaurnatInputType);
exports.UpdateRestaurnatInputType = UpdateRestaurnatInputType;
let UpdateRestaurnatDto = class UpdateRestaurnatDto {
};
__decorate([
    (0, graphql_1.Field)((type) => Number),
    __metadata("design:type", Number)
], UpdateRestaurnatDto.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => UpdateRestaurnatInputType),
    __metadata("design:type", UpdateRestaurnatInputType)
], UpdateRestaurnatDto.prototype, "data", void 0);
UpdateRestaurnatDto = __decorate([
    (0, graphql_1.ArgsType)()
], UpdateRestaurnatDto);
exports.UpdateRestaurnatDto = UpdateRestaurnatDto;
//# sourceMappingURL=update-restaurnat.dto.js.map