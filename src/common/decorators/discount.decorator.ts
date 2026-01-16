import { DiscountType } from "@common/types";
import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function isValidDiscount(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: "isValidDiscount",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { discountType, price } = obj;

          if(discountType === DiscountType.percentage){
            return typeof value === "number" && value >= 0 && value <=100;
          }
          if(discountType === DiscountType.fixed_amount){
            return typeof value==="number" && value>=0;
          }

          return true
        },
        defaultMessage(args:ValidationArguments){
            const obj = args.object as any ;
            const {discountType} = obj;

            if(discountType === DiscountType.percentage){
                return "discount amount exceed 100 when type is percentage"
            }
            if(discountType === DiscountType.fixed_amount){
                return "discount amount must be valid positive number"
            }


            return "invalid discount amount"
        }
      },
    });
  };
}
