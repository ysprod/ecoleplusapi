import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Permission, PermissionSchema } from './schemas/permission.schema';
import { PermissionsController } from './permissions.controller';
import { PermissionsModalController } from './permissions-modal.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionsController, PermissionsModalController],
  providers: [PermissionsService],
  exports: [PermissionsService],
})
export class PermissionsModule {}
