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
exports.User = exports.UserRole = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const bcrypt = require("bcrypt");
const class_validator_1 = require("class-validator");
const core_entity_1 = require("../../common/eentities/core.entity");
const restaurnat_entity_1 = require("../../restaurnats/entities/restaurnat.entity");
const typeorm_1 = require("typeorm");
var UserRole;
(function (UserRole) {
    UserRole["Client"] = "CLIENT";
    UserRole["Owner"] = "OWNER";
    UserRole["Delivery"] = "DELIVERY";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
(0, graphql_1.registerEnumType)(UserRole, { name: 'UserRole' });
let User = class User extends core_entity_1.CoreEntity {
    async hashPassword() {
        if (this.password) {
            try {
                this.password = await bcrypt.hash(this.password, 10);
            }
            catch (error) {
                console.log(error);
                throw new common_1.InternalServerErrorException();
            }
        }
    }
    async checkPassword(aPassword) {
        try {
            return await bcrypt.compare(aPassword, this.password);
        }
        catch (error) {
            console.log(error);
            throw new common_1.InternalServerErrorException();
        }
    }
};
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    (0, graphql_1.Field)((tyep) => String),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ select: false }),
    (0, graphql_1.Field)((tyep) => String),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: UserRole }),
    (0, graphql_1.Field)((tyep) => UserRole),
    (0, class_validator_1.IsEnum)(UserRole),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    (0, graphql_1.Field)((type) => Boolean),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], User.prototype, "verified", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [restaurnat_entity_1.Restaurnat]),
    (0, typeorm_1.OneToMany)((type) => restaurnat_entity_1.Restaurnat, (restaurant) => restaurant.owner, {
        onDelete: 'CASCADE',
    }),
    __metadata("design:type", Array)
], User.prototype, "restaurants", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], User.prototype, "hashPassword", null);
User = __decorate([
    (0, graphql_1.InputType)('UserInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], User);
exports.User = User;
//# sourceMappingURL=user.entity.js.map