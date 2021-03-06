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
const auth_decorator_1 = require("../auth/auth-decorator");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const create_account_dto_1 = require("../users/dtos/create-account.dto");
const user_entity_1 = require("../users/entities/user.entity");
const create_restaurnat_1 = require("./dtos/create-restaurnat");
const delete_res_dto_1 = require("./dtos/delete-res.dto");
const edit_res_dto_1 = require("./dtos/edit-res.dto");
const restaurnat_entity_1 = require("./entities/restaurnat.entity");
const restaurnats_service_1 = require("./restaurnats.service");
let RestaurnatResolver = class RestaurnatResolver {
    constructor(restaurnatService) {
        this.restaurnatService = restaurnatService;
    }
    async createRestaurnat(authUser, createRestaurnatInput) {
        return await this.restaurnatService.createRestaurnat(authUser, createRestaurnatInput);
    }
    editRestaurant(owner, editRestaurantInput) {
        return this.restaurnatService.editRestaurant(owner, editRestaurantInput);
    }
    deleteRestaurant(owner, deleteRestaurantInput) {
        return this.restaurnatService.deleteRestaurant(owner, deleteRestaurantInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => create_account_dto_1.CreateAccountOutput),
    (0, auth_decorator_1.Role)(['Owner']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        create_restaurnat_1.CreateRestaurnatInput]),
    __metadata("design:returntype", Promise)
], RestaurnatResolver.prototype, "createRestaurnat", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => edit_res_dto_1.EditRestaurantOutput),
    (0, auth_decorator_1.Role)(['Owner']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        edit_res_dto_1.EditRestaurantInput]),
    __metadata("design:returntype", Promise)
], RestaurnatResolver.prototype, "editRestaurant", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => delete_res_dto_1.DeleteRestaurantOutput),
    (0, auth_decorator_1.Role)(['Owner']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        delete_res_dto_1.DeleteRestaurantInput]),
    __metadata("design:returntype", Promise)
], RestaurnatResolver.prototype, "deleteRestaurant", null);
RestaurnatResolver = __decorate([
    (0, graphql_1.Resolver)((type) => restaurnat_entity_1.Restaurnat),
    __metadata("design:paramtypes", [restaurnats_service_1.RestaurnatService])
], RestaurnatResolver);
exports.RestaurnatResolver = RestaurnatResolver;
//# sourceMappingURL=restaurnats.resolver.js.map