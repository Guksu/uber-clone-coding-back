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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurnatResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_restaurnat_1 = require("./dtos/create-restaurnat");
const update_restaurnat_dto_1 = require("./dtos/update-restaurnat.dto");
const restaurnat_entity_1 = require("./entities/restaurnat.entity");
const restaurnats_service_1 = require("./restaurnats.service");
let RestaurnatResolver = class RestaurnatResolver {
    constructor(restaurnatService) {
        this.restaurnatService = restaurnatService;
    }
    restaurnat() {
        return this.restaurnatService.getAll();
    }
    async createRestaurnat(CreateRestaurnatDto) {
        try {
            await this.restaurnatService.createRestaurnat(CreateRestaurnatDto);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
    async updateRestaurnat(updateRestaurantDto) {
        try {
            await this.restaurnatService.updateRestaurant(updateRestaurantDto);
            return true;
        }
        catch (error) {
            console.log(error);
            return false;
        }
    }
};
__decorate([
    (0, graphql_1.Query)((returns) => [restaurnat_entity_1.Restaurnat]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], RestaurnatResolver.prototype, "restaurnat", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => Boolean),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_restaurnat_1.CreateRestaurnatDto]),
    __metadata("design:returntype", Promise)
], RestaurnatResolver.prototype, "createRestaurnat", null);
__decorate([
    (0, graphql_1.Mutation)((retunns) => Boolean),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_restaurnat_dto_1.UpdateRestaurnatDto]),
    __metadata("design:returntype", Promise)
], RestaurnatResolver.prototype, "updateRestaurnat", null);
RestaurnatResolver = __decorate([
    (0, graphql_1.Resolver)((type) => restaurnat_entity_1.Restaurnat),
    __metadata("design:paramtypes", [restaurnats_service_1.RestaurnatService])
], RestaurnatResolver);
exports.RestaurnatResolver = RestaurnatResolver;
//# sourceMappingURL=restaurnats.resolver.js.map