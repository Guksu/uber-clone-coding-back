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
exports.RestaurnatService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const create_account_dto_1 = require("../users/dtos/create-account.dto");
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_2 = require("typeorm");
const restaurnat_entity_1 = require("./entities/restaurnat.entity");
const category_repository_1 = require("./repository/category.repository");
let RestaurnatService = class RestaurnatService {
    constructor(restaurants, category) {
        this.restaurants = restaurants;
        this.category = category;
    }
    async getOrCreate(name) {
        const categoryName = name.trim().toLowerCase();
        const categorySlug = categoryName.replace(/ /g, '-');
        let category = await this.category.findOne({ slug: categorySlug });
        if (!category) {
            category = await this.category.save(this.category.create({ slug: categorySlug, name: categoryName }));
        }
        return category;
    }
    async createRestaurnat(owner, createRestaurnatInput) {
        try {
            const newRestaurnat = this.restaurants.create(createRestaurnatInput);
            newRestaurnat.owner = owner;
            const category = await this.category.getOrCreate(createRestaurnatInput.categoryName);
            newRestaurnat.category = category;
            await this.restaurants.save(newRestaurnat);
            return {
                ok: true,
            };
        }
        catch (error) {
            return {
                ok: false,
                error: "Can't create restaurnat",
            };
        }
    }
    async editRestaurant(owner, editRestaurantInput) {
        try {
            const restaurnat = await this.restaurants.findOneOrFail(editRestaurantInput.restaurantId);
            if (!restaurnat) {
                return { ok: false, error: 'Restaurant not found' };
            }
            if (owner.id !== restaurnat.ownerId) {
                return {
                    ok: false,
                    error: "Can't edit restaurant",
                };
            }
            let category = null;
            if (editRestaurantInput.categoryName) {
                category = await this.category.getOrCreate(editRestaurantInput.categoryName);
            }
            await this.restaurants.save([
                Object.assign(Object.assign({ id: editRestaurantInput.restaurantId, name: editRestaurantInput.name }, editRestaurantInput), (category && { category })),
            ]);
            return {
                ok: true,
            };
        }
        catch (error) {
            return { ok: false, error: "Can't edit restaurant" };
        }
    }
};
RestaurnatService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(restaurnat_entity_1.Restaurnat)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        category_repository_1.CategoryRepository])
], RestaurnatService);
exports.RestaurnatService = RestaurnatService;
//# sourceMappingURL=restaurnats.service.js.map