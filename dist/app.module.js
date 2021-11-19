"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const Joi = require("joi");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const users_module_1 = require("./users/users.module");
const user_entity_1 = require("./users/entities/user.entity");
const jwt_module_1 = require("./jwt/jwt.module");
const jwt_middleware_1 = require("./jwt/jwt.middleware");
const verification_entity_1 = require("./users/entities/verification.entity");
const mail_module_1 = require("./mail/mail.module");
const restaurnat_entity_1 = require("./restaurnats/entities/restaurnat.entity");
const category_entitiy_1 = require("./restaurnats/entities/category.entitiy");
const restaurnats_module_1 = require("./restaurnats/restaurnats.module");
const auth_module_1 = require("./auth/auth.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(jwt_middleware_1.JwtMiddleware).forRoutes({
            path: '/graphql',
            method: common_1.RequestMethod.POST,
        });
    }
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
                ignoreEnvFile: process.env.NODE_ENV === 'prod',
                validationSchema: Joi.object({
                    NODE_ENV: Joi.string().valid('dev', 'prod'),
                    PASSWORD: Joi.string().required(),
                    TOKEN_SECRET: Joi.string().required(),
                    MAILGUN_API_KEY: Joi.string().required(),
                    MAILGUN_DOMAIN_NAME: Joi.string().required(),
                    MAILGIN_FROM_EMAIL: Joi.string().required(),
                }),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'root',
                password: process.env.PASSWORD,
                database: 'uber-clone',
                entities: [user_entity_1.User, verification_entity_1.Verification, restaurnat_entity_1.Restaurnat, category_entitiy_1.Category],
                synchronize: true,
            }),
            graphql_1.GraphQLModule.forRoot({
                autoSchemaFile: true,
                context: ({ req }) => ({ user: req['user'] }),
            }),
            jwt_module_1.JwtModule.forRoot({ token_secret: process.env.TOKEN_SECRET }),
            mail_module_1.MailModule.forRoot({
                apikey: process.env.MAILGUN_API_KEY,
                domain: process.env.MAILGUN_DOMAIN_NAME,
                fromEmail: process.env.MAILGIN_FROM_EMAIL,
            }),
            auth_module_1.AuthModule,
            users_module_1.UsersModule,
            restaurnats_module_1.RestaurnatsModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map