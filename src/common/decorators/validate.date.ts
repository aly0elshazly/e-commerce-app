import { registerDecorator, ValidationArguments, ValidationOptions } from "class-validator";

export function isValidToDate(validationOptions?: ValidationOptions) {
  return function(object: any, propertyName: string) {
    registerDecorator({
      name: "isValidToDate",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const obj = args.object as any;
          const { fromDate } = obj;

          if(fromDate > value){
            return false;
          }
          

          return true
        },
        defaultMessage(args:ValidationArguments){ 
            return "invalid to date"
        }
      },
    });
  };
}
