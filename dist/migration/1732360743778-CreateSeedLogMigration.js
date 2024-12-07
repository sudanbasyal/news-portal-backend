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
                    name: "seed_name",
                    type: "varchar",
                    isUnique: true,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiMTczMjM2MDc0Mzc3OC1DcmVhdGVTZWVkTG9nTWlncmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL21pZ3JhdGlvbi8xNzMyMzYwNzQzNzc4LUNyZWF0ZVNlZWRMb2dNaWdyYXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUNBQWlFO0FBRWpFLE1BQWEsK0JBQStCO0lBQ25DLEtBQUssQ0FBQyxFQUFFLENBQUMsV0FBd0I7UUFDdEMsTUFBTSxXQUFXLENBQUMsV0FBVyxDQUMzQixJQUFJLGVBQUssQ0FBQztZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLE9BQU8sRUFBRTtnQkFDUDtvQkFDRSxJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUUsS0FBSztvQkFDWCxTQUFTLEVBQUUsSUFBSTtvQkFDZixXQUFXLEVBQUUsSUFBSTtvQkFDakIsa0JBQWtCLEVBQUUsV0FBVztpQkFDaEM7Z0JBQ0Q7b0JBQ0UsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxTQUFTO29CQUNmLFFBQVEsRUFBRSxJQUFJO2lCQUNmO2dCQUNEO29CQUNFLElBQUksRUFBRSxZQUFZO29CQUNsQixJQUFJLEVBQUUsV0FBVztvQkFDakIsT0FBTyxFQUFFLE9BQU87aUJBQ2pCO2FBQ0Y7U0FDRixDQUFDLEVBQ0YsSUFBSSxDQUNMLENBQUM7SUFDSixDQUFDO0lBRU0sS0FBSyxDQUFDLElBQUksQ0FBQyxXQUF3QjtRQUN4QyxNQUFNLFdBQVcsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUMsQ0FBQztDQUNGO0FBaENELDBFQWdDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE1pZ3JhdGlvbkludGVyZmFjZSwgUXVlcnlSdW5uZXIsIFRhYmxlIH0gZnJvbSBcInR5cGVvcm1cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDcmVhdGVTZWVkTG9nVGFibGUxNjIxNjc2NzA4MDc0IGltcGxlbWVudHMgTWlncmF0aW9uSW50ZXJmYWNlIHtcclxuICBwdWJsaWMgYXN5bmMgdXAocXVlcnlSdW5uZXI6IFF1ZXJ5UnVubmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBxdWVyeVJ1bm5lci5jcmVhdGVUYWJsZShcclxuICAgICAgbmV3IFRhYmxlKHtcclxuICAgICAgICBuYW1lOiBcInNlZWRfbG9nXCIsXHJcbiAgICAgICAgY29sdW1uczogW1xyXG4gICAgICAgICAge1xyXG4gICAgICAgICAgICBuYW1lOiBcImlkXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwiaW50XCIsXHJcbiAgICAgICAgICAgIGlzUHJpbWFyeTogdHJ1ZSxcclxuICAgICAgICAgICAgaXNHZW5lcmF0ZWQ6IHRydWUsXHJcbiAgICAgICAgICAgIGdlbmVyYXRpb25TdHJhdGVneTogXCJpbmNyZW1lbnRcIixcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwic2VlZF9uYW1lXCIsXHJcbiAgICAgICAgICAgIHR5cGU6IFwidmFyY2hhclwiLFxyXG4gICAgICAgICAgICBpc1VuaXF1ZTogdHJ1ZSxcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICB7XHJcbiAgICAgICAgICAgIG5hbWU6IFwiY3JlYXRlZF9hdFwiLFxyXG4gICAgICAgICAgICB0eXBlOiBcInRpbWVzdGFtcFwiLFxyXG4gICAgICAgICAgICBkZWZhdWx0OiBcIm5vdygpXCIsXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0pLFxyXG4gICAgICB0cnVlXHJcbiAgICApO1xyXG4gIH1cclxuXHJcbiAgcHVibGljIGFzeW5jIGRvd24ocXVlcnlSdW5uZXI6IFF1ZXJ5UnVubmVyKTogUHJvbWlzZTx2b2lkPiB7XHJcbiAgICBhd2FpdCBxdWVyeVJ1bm5lci5kcm9wVGFibGUoXCJzZWVkX2xvZ1wiKTtcclxuICB9XHJcbn1cclxuIl19