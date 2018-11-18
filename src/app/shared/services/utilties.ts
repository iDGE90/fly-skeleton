import {AbstractControl, FormArray, FormControl, FormGroup} from '@angular/forms';

export class Utilities {
  // Validate all form controls in a form
  static validateMixedForm(form: FormControl | FormGroup | FormArray): void {
    if (form instanceof FormArray) {
      for (const control of form.controls) {
        Utilities.updateFromControl(control);
      }
    }

    if (form instanceof FormGroup) {
      Object.keys(form.controls).forEach(field => {
        const control = form.get(field);
        Utilities.updateFromControl(control);
      });
    }

    if (form instanceof FormControl) {
      Utilities.updateFromControl(form); // If control is form control
    }
  }

  // Update form control as touched
  private static updateFromControl(control: AbstractControl) {
    if (control instanceof FormControl) {
      control.markAsTouched({onlySelf: true});
    }

    if (control instanceof FormGroup || control instanceof FormArray) {
      this.validateMixedForm(control);
    }
  }

  // Check if form control is invalid
  static isFormControlInvalid(c: AbstractControl): boolean {
    return c.invalid && (c.dirty || c.touched);
  }

  // Make random string id
  static makeStringId(): string {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < 10; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
  }

  // Make slug from string
  static slugifyString(str: string): string {
    return str.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
}
