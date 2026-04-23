import { Component, inject, output } from '@angular/core';
import { IRegisterCreds } from '../../../types/user';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../../core/services/account-service';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly acoountService = inject(AccountService);
  cancelRegister = output<boolean>();
  protected creds = {} as IRegisterCreds;

  register() {
    this.acoountService.register(this.creds).subscribe({
      next: response => {
        console.log(this.creds, response);
        this.cancel();
      },
      error: error => console.log(error),
    });
  }

  cancel() {
    console.log('cancelled');
    this.cancelRegister.emit(false);
  }
}
