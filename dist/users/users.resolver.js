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
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_decorator_1 = require("../auth/auth-decorator");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const auth_guard_1 = require("../auth/auth.guard");
const create_account_dto_1 = require("./dtos/create-account.dto");
const edit_profile_dto_1 = require("./dtos/edit-profile.dto");
const login_dto_1 = require("./dtos/login.dto");
const user_profile_dto_1 = require("./dtos/user-profile.dto");
const verify_email_dto_1 = require("./dtos/verify-email-dto");
const user_entity_1 = require("./entities/user.entity");
const user_service_1 = require("./user.service");
let UserResolver = class UserResolver {
    constructor(userService) {
        this.userService = userService;
    }
    async createAccount(createAccountInput) {
        return this.userService.createAccount(createAccountInput);
    }
    async login(loginInput) {
        return this.userService.login(loginInput);
    }
    me(authUser) {
        return authUser;
    }
    async userProfile(userProfileInput) {
        return this.userService.findById(userProfileInput.userId);
    }
    async editProfile(authUser, editProfileInput) {
        return this.userService.editProfile(authUser.id, editProfileInput);
    }
    async verifyEmail(verifyEmailInput) {
        return this.userService.verifiyEmail(verifyEmailInput.code);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => create_account_dto_1.CreateAccountOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_account_dto_1.CreateAccountInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createAccount", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => login_dto_1.LoginOutput),
    __param(0, (0, graphql_1.Args)('Input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_dto_1.LoginInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, graphql_1.Query)((returns) => user_entity_1.User),
    (0, auth_decorator_1.Role)(['Any']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User]),
    __metadata("design:returntype", void 0)
], UserResolver.prototype, "me", null);
__decorate([
    (0, auth_decorator_1.Role)(['Any']),
    (0, graphql_1.Query)((returns) => user_profile_dto_1.UserProfileOutput),
    __param(0, (0, graphql_1.Args)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_profile_dto_1.UserProfileInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "userProfile", null);
__decorate([
    (0, auth_decorator_1.Role)(['Any']),
    (0, graphql_1.Mutation)((returns) => edit_profile_dto_1.EditProfileOutput),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.User,
        edit_profile_dto_1.EditProfileInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "editProfile", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => verify_email_dto_1.VerifyEmailOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [verify_email_dto_1.VerifyEmailInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "verifyEmail", null);
UserResolver = __decorate([
    (0, graphql_1.Resolver)((type) => user_entity_1.User),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=users.resolver.js.map