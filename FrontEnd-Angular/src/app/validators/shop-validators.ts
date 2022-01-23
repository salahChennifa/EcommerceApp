import { FormControl, ValidationErrors } from "@angular/forms";

export class ShopValidators {
    // whitespace validation
    static notOnlyWhitespace(control: FormControl) : ValidationErrors {
        // check if string only contains whitespce
        if ((control.value != null) && (control.value.trim()).length === 0){
            // invalid, return error object

            return {'notOnlyWhitespace': true};
        }
        else {
            // valid, return null
            return {'notOnlyWhitespace': false};
        }
        
    }
}
