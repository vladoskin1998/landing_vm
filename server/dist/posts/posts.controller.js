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
exports.PostsController = void 0;
const common_1 = require("@nestjs/common");
const posts_service_1 = require("./posts.service");
const authentication_guard_1 = require("../authentication/authentication.guard");
const platform_express_1 = require("@nestjs/platform-express");
const posts_dto_1 = require("./posts.dto");
let PostsController = class PostsController {
    constructor(postsService) {
        this.postsService = postsService;
    }
    async getPosts() {
        return await this.postsService.getPosts();
    }
    async getPost(dto) {
        return await this.postsService.getPost(dto._id);
    }
    async addPost(binary, dto) {
        console.log(binary);
        console.log(dto);
        const images = binary.images.map((file) => file.filename);
        const bgFolderImages = binary.bgFolderImages[0].filename;
        await this.postsService.addPost(Object.assign(Object.assign({}, dto), { images,
            bgFolderImages }));
        return { message: 'Post successfull download' };
    }
    async ChangeTagPost(dto) {
        const currentListPost = await this.postsService.changeTagPost(dto);
        return { message: 'Post tag successfull changed', currentListPost };
    }
    async deletePost({ id }) {
        const currentListPost = await this.postsService.deletePost(id);
        return { message: 'Post successfull delete', currentListPost };
    }
};
__decorate([
    (0, common_1.Get)('get-posts'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPosts", null);
__decorate([
    (0, common_1.Post)('get-one-post'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "getPost", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('add-posts'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        {
            name: 'bgFolderImages',
            maxCount: 1,
        },
        {
            name: 'images',
            maxCount: 51,
        },
    ])),
    __param(0, (0, common_1.UploadedFiles)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, posts_dto_1.PostDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "addPost", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('change-tag-posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [posts_dto_1.ChangeTagDto]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "ChangeTagPost", null);
__decorate([
    (0, common_1.UseGuards)(authentication_guard_1.JwtAuthGuard),
    (0, common_1.Post)('delete-posts'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PostsController.prototype, "deletePost", null);
PostsController = __decorate([
    (0, common_1.Controller)('posts'),
    __metadata("design:paramtypes", [posts_service_1.PostsService])
], PostsController);
exports.PostsController = PostsController;
//# sourceMappingURL=posts.controller.js.map