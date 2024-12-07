"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSeedLogTable1621676708074 = void 0;
const typeorm_1 = require("typeorm");
class CreateSeedLogTable1621676708074 {
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: "seed_log",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "seeded",
                    type: "boolean",
                    default: false,
                },
                {
                    name: "created_at",
                    type: "timestamp",
                    default: "now()",
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable("seed_log");
    }
}
exports.CreateSeedLogTable1621676708074 = CreateSeedLogTable1621676708074;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VlZGxvZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZWVkcy9zZWVkbG9nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFDQUFpRTtBQUVqRSxNQUFhLCtCQUErQjtJQUNuQyxLQUFLLENBQUMsRUFBRSxDQUFDLFdBQXdCO1FBQ3RDLE1BQU0sV0FBVyxDQUFDLFdBQVcsQ0FDM0IsSUFBSSxlQUFLLENBQUM7WUFDUixJQUFJLEVBQUUsVUFBVTtZQUNoQixPQUFPLEVBQUU7Z0JBQ1A7b0JBQ0UsSUFBSSxFQUFFLElBQUk7b0JBQ1YsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsU0FBUyxFQUFFLElBQUk7b0JBQ2YsV0FBVyxFQUFFLElBQUk7b0JBQ2pCLGtCQUFrQixFQUFFLFdBQVc7aUJBQ2hDO2dCQUNEO29CQUNFLElBQUksRUFBRSxRQUFRO29CQUNkLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLE9BQU87aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDLEVBQ0YsSUFBSSxDQUNMLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxXQUF3QjtRQUN4QyxNQUFNLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBaENELDBFQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1pZ3JhdGlvbkludGVyZmFjZSwgUXVlcnlSdW5uZXIsIFRhYmxlIH0gZnJvbSBcInR5cGVvcm1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVTZWVkTG9nVGFibGUxNjIxNjc2NzA4MDc0IGltcGxlbWVudHMgTWlncmF0aW9uSW50ZXJmYWNlIHtcclxuICBwdWJsaWMgYXN5bmMgdXAocXVlcnlSdW5uZXI6IFF1ZXJ5UnVubmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBxdWVyeVJ1bm5lci5jcmVhdGVUYWJsZShcclxuICAgICAgbmV3IFRhYmxlKHtcclxuICAgICAgICBuYW1lOiBcInNlZWRfbG9nXCIsXHJcbiAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcImlkXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW50XCIsXHJcbiAgICAgICAgICAgIGlzUHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgaXNHZW5lcmF0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGdlbmVyYXRpb25TdHJhdGVneTogXCJpbmNyZW1lbnRcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwic2VlZGVkXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiYm9vbGVhblwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBmYWxzZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiY3JlYXRlZF9hdFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcInRpbWVzdGFtcFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIm5vdygpXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pLFxyXG4gICAgICB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRvd24ocXVlcnlSdW5uZXI6IFF1ZXJ5UnVubmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBxdWVyeVJ1bm5lci5kcm9wVGFibGUoXCJzZWVkX2xvZ1wiKTtcclxuICB9XHJcbn1cclxuIl19