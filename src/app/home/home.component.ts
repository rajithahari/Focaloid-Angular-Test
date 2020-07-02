import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'rajitha-angular-test';
  userForm: any = new FormControl('');
  submitted = false;
  default = true;
  router: any;
  constructor(private formBuilder: FormBuilder, private route: Router) {}

  invalidNumber() {
    return (this.submitted && this.userForm.controls.arr.errors != null);
  }

  invalidValue() {
    return (this.submitted && this.userForm.controls.value.errors != null);
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      arr: ['', [Validators.required, Validators.pattern('^[0-9]+(,[0-9]+){4}$')]],
      value: ['', [Validators.required, Validators.pattern('[0-9]+')]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.valid) {
      const data = this.userForm.value;
      data.value = +data.value;
      data.sum =  data.arr.split`,`.map(x => +x ).reduce((a, b) => a + b, 0);
      localStorage.setItem('userInput', JSON.stringify(data));
      this.route.navigate(['/users']);
    }
  }
}
