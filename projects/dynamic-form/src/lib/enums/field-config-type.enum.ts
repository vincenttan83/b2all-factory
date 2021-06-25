export enum EFieldConfigType {
    Array = 'array', // to present the form in table mode, multiple lines, list of map
    Button = 'button', // should we even include a custom button? all form should have button, configure from form itself
    Divider = 'divider',
    Input = 'input',
    Object = 'object', // reconfirm required as this is the nested object / map
    Select = 'select', // might rename, as all type should support more than 1
    Textarea = 'textarea',
    // InputButton = 'INPUT_BUTTON' // is boostrap input with button in same row, deprecated
    // Listing = 'LISTING', // drop as initially target to chheck box list
    // Editor = 'EDITOR', // drop & introduce an 3rd party add on
    // Select = 'SELECT', // combo box
    // SelectDual = 'SELECT_DUAL', // this is deprecated, as select multiple make more sense
    // SelectBootstrapModal = 'SELECT_BOOTSTRAP_MODAL', // this shoul be replaced by dialog
}


// button: FormButtonComponent,
// color: FormColorComponent,
// input: FormInputComponent,
// select: FormSelectComponent,
// selectdual: FormSelectDualComponent,
// selectbootstrapmodal: FormSelectBootstrapModalComponent,
// textarea: FormTextareaComponent,
// editor: FormSummernoteComponent,
// listing: FormListingComponent,
// object: FormObjectComponent,
// checkbox: FormCheckboxComponent,
// number: FormNumberComponent,
// array: FormTableComponent,
// selectMultiple: FormSelectMultipleComponent,
// inputbutton: FormInputButtonComponent,
