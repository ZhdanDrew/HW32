
class FormField {
  constructor(name, placeholder, required, validate) {
    this.name = name;
    this.placeholder = placeholder;
    this.required = required;
    this.validate = validate;

    return this;
  }
}

class FormBuilder {
  constructor(fields, onSubmit) {
    this.fields = fields;
    this.onSubmit = onSubmit;

    this.values = {};
    this.inputs = {};

    this.generateFormValues();
  }

  generateFormValues() {
    this.values = {};

    for (const field of this.fields) {
      console.log(field, "this is field");
      this.values[field.name] = "";
    }

    return this.values;
  }

  render(parent) {
    this.inputs = {};

    const form = document.createElement("div");
    form.classList.add("form");

    for (const field of this.fields) {
      const input = document.createElement("input");

      const { placeholder, name } = field;

      this.inputs[name] = input;

      input.placeholder = placeholder;
      input.name = name;

      form.appendChild(input);
    }

    console.log(this.inputs, "inputs");

    const formButton = document.createElement("button");
    formButton.textContent = "Submit";
    formButton.type = "submit";

    formButton.onclick = this.submit.bind(this);
    // formButton.onclick = () => this.submit();

    form.appendChild(formButton);

    parent.appendChild(form);
  }

  submit() {
    for (const name in this.inputs) {
      this.values[name] = this.inputs[name].value;
    }

    // outer function
    this.onSubmit(this.values);
  }

  showFormData() {
    console.log(this.fields);
  }
}

const loginForm = new FormBuilder(
  [
    new FormField("email", "Enter the email", true),
    new FormField("name", "Enter the name", true),
    new FormField("password", "Enter the password", true),
  ],
  function (formData) {
    console.log(formData, "FORM DATA FROM YOUR FUNCTION");
  }
);

loginForm.showFormData();
loginForm.render(document.body);

const colorForm = new FormBuilder(
  [new FormField("color", "Enter the color", true)],
  function (fileds) {
    document.body.style.background = fileds.color;
  }
);

colorForm.render(document.body);

const customForm = new FormBuilder(
  [
    new FormField("fullName", "Enter your full name", true),
    new FormField("email", "Enter your email", true),
    new FormField("message", "Type your message", true),
  ],
  function (formData) {
    console.log("Form Data:", formData);
  }
);

customForm.render(document.body);