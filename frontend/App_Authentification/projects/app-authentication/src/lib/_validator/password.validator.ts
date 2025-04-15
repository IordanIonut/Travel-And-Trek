import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

const PASSWORD_PATTERN =
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&.*()_+=[\]{};:,.<>?^|\\/-])[A-Za-z\d@$!%*?&.*()_+=[\]{};:,.<>?^|\\/-]{8,}$/;

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (control.value) {
      const isValid = PASSWORD_PATTERN.test(control.value);
      return isValid ? null : { weakPassword: true };
    }
    return null;
  };
}
export function passwordMatchValidator(
  form: FormGroup
): ValidationErrors | null {
  const password = form.get('password')?.value?.trim();
  const confirmPassword = form.get('confirmPassword')?.value?.trim();

  const comparePasswords = (password: string, confirmPassword: string) => {
    let result = true;

    for (let i = 0; i < password.length; i++) {
      const char1 = password[i];
      const char2 = confirmPassword[i];

      if (/[a-zA-Z]/.test(char1) && /[a-zA-Z]/.test(char2)) {
        if (char1!.toLowerCase() !== char2!.toLowerCase()) {
          result = false;
          break;
        }
      } else if (char1 !== char2) {
        result = false;
        break;
      }
    }

    return result;
  };

  return comparePasswords(password, confirmPassword)
    ? null
    : { passwordsDontMatch: true };
}
