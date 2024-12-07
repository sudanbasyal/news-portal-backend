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
exports.Article = void 0;
const typeorm_1 = require("typeorm");
const Category_1 = require("./Category");
const Comment_1 = require("./Comment");
let Article = class Article {
};
exports.Article = Article;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Article.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "image", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Article.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Article.prototype, "viewCount", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Article.prototype, "slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ enum: ["draft", "published", "archived"] }),
    __metadata("design:type", String)
], Article.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Article.prototype, "isBreaking", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Article.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Article.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Comment_1.Comment, (comment) => comment.article),
    __metadata("design:type", Array)
], Article.prototype, "comments", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Category_1.Category, (category) => category.articles, {
        nullable: false,
    }),
    __metadata("design:type", Category_1.Category)
], Article.prototype, "category", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Article.prototype, "categoryId", void 0);
exports.Article = Article = __decorate([
    (0, typeorm_1.Entity)({ name: "articles" })
], Article);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJ0aWNsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9lbnRpdHkvQXJ0aWNsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxxQ0FRaUI7QUFDakIseUNBQXNDO0FBQ3RDLHVDQUFvQztBQUc3QixJQUFNLE9BQU8sR0FBYixNQUFNLE9BQU87Q0F5Q25CLENBQUE7QUF6Q1ksMEJBQU87QUFFbEI7SUFEQyxJQUFBLGdDQUFzQixHQUFFOzttQ0FDZDtBQUdYO0lBREMsSUFBQSxnQkFBTSxHQUFFOztzQ0FDSztBQUdkO0lBREMsSUFBQSxnQkFBTSxHQUFFOztzQ0FDSztBQUdkO0lBREMsSUFBQSxnQkFBTSxHQUFFOzt3Q0FDTztBQUdoQjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7MENBQ1M7QUFHbEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7O3FDQUNaO0FBR2I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFVBQVUsQ0FBQyxFQUFFLENBQUM7O3VDQUN0QztBQUdmO0lBREMsSUFBQSxnQkFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxDQUFDOzsyQ0FDUDtBQUdwQjtJQURDLElBQUEsMEJBQWdCLEdBQUU7OEJBQ1IsSUFBSTswQ0FBQztBQUdoQjtJQURDLElBQUEsMEJBQWdCLEdBQUU7OEJBQ1IsSUFBSTswQ0FBQztBQUdoQjtJQURDLElBQUEsbUJBQVMsRUFBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBTyxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDOzt5Q0FDbkM7QUFLcEI7SUFIQyxJQUFBLG1CQUFTLEVBQUMsR0FBRyxFQUFFLENBQUMsbUJBQVEsRUFBRSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUMxRCxRQUFRLEVBQUUsS0FBSztLQUNoQixDQUFDOzhCQUNRLG1CQUFRO3lDQUFDO0FBR25CO0lBREMsSUFBQSxnQkFBTSxHQUFFOzsyQ0FDVTtrQkF4Q1IsT0FBTztJQURuQixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7R0FDaEIsT0FBTyxDQXlDbkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xyXG4gIENvbHVtbixcclxuICBDcmVhdGVEYXRlQ29sdW1uLFxyXG4gIEVudGl0eSxcclxuICBNYW55VG9PbmUsXHJcbiAgT25lVG9NYW55LFxyXG4gIFByaW1hcnlHZW5lcmF0ZWRDb2x1bW4sXHJcbiAgVXBkYXRlRGF0ZUNvbHVtbixcclxufSBmcm9tIFwidHlwZW9ybVwiO1xyXG5pbXBvcnQgeyBDYXRlZ29yeSB9IGZyb20gXCIuL0NhdGVnb3J5XCI7XHJcbmltcG9ydCB7IENvbW1lbnQgfSBmcm9tIFwiLi9Db21tZW50XCI7XHJcblxyXG5ARW50aXR5KHsgbmFtZTogXCJhcnRpY2xlc1wiIH0pXHJcbmV4cG9ydCBjbGFzcyBBcnRpY2xlIHtcclxuICBAUHJpbWFyeUdlbmVyYXRlZENvbHVtbigpXHJcbiAgaWQ6IG51bWJlcjtcclxuXHJcbiAgQENvbHVtbigpXHJcbiAgdGl0bGU6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbigpXHJcbiAgaW1hZ2U6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbigpXHJcbiAgY29udGVudDogc3RyaW5nO1xyXG5cclxuICBAQ29sdW1uKClcclxuICB2aWV3Q291bnQ6IG51bWJlcjtcclxuXHJcbiAgQENvbHVtbih7IHVuaXF1ZTogdHJ1ZSB9KVxyXG4gIHNsdWc6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IGVudW06IFtcImRyYWZ0XCIsIFwicHVibGlzaGVkXCIsIFwiYXJjaGl2ZWRcIl0gfSlcclxuICBzdGF0dXM6IHN0cmluZztcclxuXHJcbiAgQENvbHVtbih7IGRlZmF1bHQ6IGZhbHNlIH0pXHJcbiAgaXNCcmVha2luZzogYm9vbGVhbjtcclxuXHJcbiAgQENyZWF0ZURhdGVDb2x1bW4oKVxyXG4gIGNyZWF0ZWRBdDogRGF0ZTtcclxuXHJcbiAgQFVwZGF0ZURhdGVDb2x1bW4oKVxyXG4gIHVwZGF0ZWRBdDogRGF0ZTtcclxuXHJcbiAgQE9uZVRvTWFueSgoKSA9PiBDb21tZW50LCAoY29tbWVudCkgPT4gY29tbWVudC5hcnRpY2xlKVxyXG4gIGNvbW1lbnRzOiBDb21tZW50W107XHJcblxyXG4gIEBNYW55VG9PbmUoKCkgPT4gQ2F0ZWdvcnksIChjYXRlZ29yeSkgPT4gY2F0ZWdvcnkuYXJ0aWNsZXMsIHtcclxuICAgIG51bGxhYmxlOiBmYWxzZSxcclxuICB9KVxyXG4gIGNhdGVnb3J5OiBDYXRlZ29yeTtcclxuXHJcbiAgQENvbHVtbigpXHJcbiAgY2F0ZWdvcnlJZDogbnVtYmVyO1xyXG59XHJcbiJdfQ==