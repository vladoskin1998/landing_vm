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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const posts_schema_1 = require("./posts.schema");
const mongoose_2 = require("mongoose");
const fs = require("fs");
const path = require("path");
let PostsService = class PostsService {
    constructor(postsModel) {
        this.postsModel = postsModel;
    }
    async getPosts() {
        return await this.postsModel.find();
    }
    async getPost(_id) {
        return await this.postsModel.findById(_id);
    }
    async addPost(post) {
        return await this.postsModel.create(post);
    }
    async changeTagPost(dto) {
        await this.postsModel.updateOne({ _id: dto.id }, { $set: { tag: dto.tag } });
        return this.getPosts();
    }
    async deletePost(id) {
        const { images, bgFolderImages } = await this.postsModel.findOneAndDelete({
            _id: id,
        });
        await this.deleteFiles([...images, bgFolderImages]);
        return this.getPosts();
    }
    async deleteFiles(arr) {
        const uploadsPath = path.join(__dirname, '../../', 'uploads');
        for (const filename of arr) {
            const filePath = path.join(uploadsPath, filename);
            if (fs.existsSync(filePath)) {
                try {
                    await fs.promises.unlink(filePath);
                    console.log(`File ${filename} deleted successfully.`);
                }
                catch (err) {
                    console.error(`Failed to delete file ${filename}: ${err}`);
                }
            }
            else {
                throw new common_1.HttpException('not found file', common_1.HttpStatus.NOT_FOUND);
            }
        }
    }
};
PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(posts_schema_1.Posts.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
exports.PostsService = PostsService;
//# sourceMappingURL=posts.service.js.map