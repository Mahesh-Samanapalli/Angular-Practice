import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  // BehaviorSubject to track life insurance type
  private lifeTypeSubject = new BehaviorSubject<'single' | 'joint'>('single');
  public lifeType$ = this.lifeTypeSubject.asObservable();

  paramConfig: any = [
    {
      "header": "LOAN_DETAILS",
      "paramValues":[
        {
          "paramName":"LOAN_ACCOUNT_NUMBER",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"Loan Account Number",
          "paramPlaceholder":"Enter Loan Account Number",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"LOAN_TERM",
          "paramType":"NUMBER",
          "paramValue":"",
          "paramLabel":"Loan Term",
          "paramPlaceholder":"Enter Loan Account Term",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]

        },
        {
          "paramName":"LOAN_AMOUNT",
          "paramType":"NUMBER",
          "paramValue":"",
          "paramLabel":"Loan Amount",
          "paramPlaceholder":"Enter Loan Account Amount",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]

        },
        {
          "paramName":"LOAN_DISBURSEMENT_DATE",
          "paramType":"DATE",
          "paramValue":"",
          "paramLabel":"Loan Disbursement Date",
          "paramPlaceholder":"Enter Loan Disbursement Date",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]

        },
      ]

    },
    {
      "header": "CUSTOMER_DETAILS",
      "paramValues":[
        {
          "paramName":"PAN",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"PAN",
          "paramPlaceholder":"Enter PAN Number",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"FULL_NAME",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"Full Name",
          "paramPlaceholder":"Enter Full Name",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"GENDER",
          "paramType":"SELECT",
          "paramValue":"",
          "paramLabel":"Gender",
          "paramPlaceholder":"Select Gender",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"MOBILE_NUMBER",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"Mobile Number",
          "paramPlaceholder":"Enter Mobile Number",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"EMAIL_ID",
          "paramType":"EMAIL",
          "paramValue":"",
          "paramLabel":"Email ID",
          "paramPlaceholder":"Enter Email ID",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"RELATIONSHIP",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"Relationship",
          "paramPlaceholder":"Enter Relationship",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"PIN_CODE",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"PIN Code",
          "paramPlaceholder":"Enter PIN Code",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"CITY",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"City",
          "paramPlaceholder":"Enter City",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"STATE",
          "paramType":"TEXT",
          "paramValue":"",
          "paramLabel":"State",
          "paramPlaceholder":"Enter State",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        },
        {
          "paramName":"PERMANENT_ADDRESS",
          "paramType":"TEXTAREA",
          "paramValue":"",
          "paramLabel":"Permanent Address",
          "paramPlaceholder":"Enter Permanent Address",
          "paramRequired":true,
          "isDisabled":false,
          "paramValidation":[]
        }
      ]
    }
  ]

  constructor() { }

  // Method to update life type
  updateLifeType(lifeType: 'single' | 'joint') {
    this.lifeTypeSubject.next(lifeType);
  }

  // Method to get current life type
  getCurrentLifeType(): 'single' | 'joint' {
    return this.lifeTypeSubject.value;
  }
}
