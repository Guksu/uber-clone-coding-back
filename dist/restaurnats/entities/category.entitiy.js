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
exports.Category = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const core_entity_1 = require("../../common/eentities/core.entity");
const typeorm_1 = require("typeorm");
const restaurnat_entity_1 = require("./restaurnat.entity");
let Category = class Category extends core_entity_1.CoreEntity {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(5),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, typeorm_1.Column)({ nullable: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Category.prototype, "coverImg", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, typeorm_1.Column)({ unique: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Category.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [restaurnat_entity_1.Restaurnat]),
    (0, typeorm_1.OneToMany)((type) => restaurnat_entity_1.Restaurnat, (restaurant) => restaurant.category),
    __metadata("design:type", Array)
], Category.prototype, "restaurants", void 0);
Category = __decorate([
    (0, graphql_1.InputType)('CategryInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Category);
exports.Category = Category;
//# sourceMappingURL=category.entitiy.js.map