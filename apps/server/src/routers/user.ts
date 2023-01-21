import { router, privateProcedure } from '../trpc';
import {
  addChildController,
  changeUserTypeController,
  getAllUserChildrenController,
  getUserController,
  getUserParentController,
  removeChildController,
  updateUserController,
} from '../controllers/user.controller';
import { AddChild, ChangeUserTypeSchema, RemoveChildSchema, UpdateUserSchema } from '../schemas/user.schema';

export const userRouter = router({
  getUser: privateProcedure.query((req) => getUserController({ ctx: req.ctx })),
  getUserParent: privateProcedure.query((req) => getUserParentController({ ctx: req.ctx })),
  getUserChildren: privateProcedure.query((req) => getAllUserChildrenController({ ctx: req.ctx })),
  updateUser: privateProcedure.input(UpdateUserSchema).mutation((req) => updateUserController({ ctx: req.ctx, input: req.input })),
  changeType: privateProcedure.input(ChangeUserTypeSchema).mutation((req) => changeUserTypeController({ ctx: req.ctx, input: req.input })),
  removeChild: privateProcedure.input(RemoveChildSchema).mutation((req) => removeChildController({ ctx: req.ctx, input: req.input })),
  addChild: privateProcedure.input(AddChild).mutation((req) => addChildController({ ctx: req.ctx, input: req.input })),
});
