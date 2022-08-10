import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService, AlertService } from '../services';
import { first, Subject, takeUntil } from 'rxjs';

//import { AccountService, AlertService } from '@app/_services';

@Component({ selector: 'login-form', templateUrl: 'login-form.component.html' })
export class LoginFormComponent implements OnInit, OnDestroy {
    form: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string = '';
    ngDestroy = new Subject();

    @Output()
    onLogin = new EventEmitter();;

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { 
        this.form = this.formBuilder.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    ngOnInit() {
        

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    ngOnDestroy(): void {
        this.ngDestroy.next(true);
        this.ngDestroy.complete();
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.value; }

    onSubmit() {
        this.submitted = true;

        // reset alerts on submit
        //this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.accountService.login(this.f.email, this.f.password)
            .pipe(takeUntil(this.ngDestroy))
            .subscribe({
                next: (data: any) => {
                    if(data && data.token) {
                        localStorage.setItem('token', data.token)
                    }
                    this.loading = false;
                    this.alertService.success('Logged in successfully!');

                    if(this.onLogin) {
                        this.onLogin.emit();
                    }
                },
                error: (err) => {
                    console.log(err.error.message);
                    this.alertService.error(err.error.message);
                    this.loading = false;
                }
            })
    }
}