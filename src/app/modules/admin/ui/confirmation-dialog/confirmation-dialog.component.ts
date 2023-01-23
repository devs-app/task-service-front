import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BusinessManagerModel } from 'app/models/business.manager';
import { CompanyModel } from 'app/models/company.model';
import { PersonrModel } from 'app/models/person.model';
import { AlertService } from 'app/shared/alert.service';
import { CryptoService } from '../../dashboards/crypto/crypto.service';

@Component({
    selector: 'confirmation',
    templateUrl: './confirmation-dialog.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationDialogComponent implements OnInit {
    configForm: UntypedFormGroup;
    formFieldHelpers: string[] = [''];
    businessManagerForm: UntypedFormGroup;
    @ViewChild('businessManagerForm') signInNgForm: NgForm;

    constructor(
        public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: UntypedFormBuilder,
        private _cryptoService: CryptoService,
        public alertService: AlertService
    ) {
    }

    ngOnInit(): void {
        this.alertService.hideMessageConfigAlert()
        this.businessManagerForm = this._formBuilder.group({
            name: ['', [Validators.required]],
            lastName: ['', Validators.required],
            document: ['', Validators.required],
            email: ['', Validators.email],
        });

    }

    closeDialog(): void {
        this.dialogRef.close();
    }

    save(company: any) {
        if (this.businessManagerForm.invalid) {
            return
        }

        let person: PersonrModel = {
            name: this.businessManagerForm.value.name,
            lastName: this.businessManagerForm.value.lastName,
            document: this.businessManagerForm.value.document
        }

        let businessManagerModel: BusinessManagerModel = { email: this.businessManagerForm.value.email, person: person, companyId: company.data.id }

        this._cryptoService.saveBusinessManager(businessManagerModel).subscribe(data => {
            this.businessManagerForm.enable();
            this.businessManagerForm.reset()
            this.dialogRef.close(true)
            this.alertService.showMessageConfigAlert('success', 'Registro creado')
        }, (response: HttpErrorResponse) => {
            this.alertService.showMessageConfigAlert('error', response.error.message)
            this.businessManagerForm.enable()
        })
    }

}
