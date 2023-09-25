/* eslint-disable @typescript-eslint/unbound-method */
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RpPortfolioQuestionOptionBolderPipe } from '@cimb/core';
import { AnswerOption, RPQ, RPQuestionnaireResponse } from '../../models/risk-inquiry-detail.model';

@Component({
  selector: 'cimb-office-create-risk-profile',
  templateUrl: './create-risk-profile.component.html',
  styleUrls: ['./create-risk-profile.component.scss']
})
export class CreateRiskProfileComponent implements OnInit, OnChanges {

  riskProfileForm: FormGroup;
  answers: string[] = [];
  selectedValue: string;

  @Output() riskProfileFormChange = new EventEmitter<FormGroup>();
  @Input() riskProfileQuestionnaire: RPQuestionnaireResponse;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['riskProfileQuestionnaire']) {
      this.initiateForm();
    }
  }

  ngOnInit(): void {
    if(this.riskProfileQuestionnaire) {
      this.initiateForm();
    }
  }

  initiateForm(): void {
    if(!this.riskProfileQuestionnaire) return
    const totalQuestions: number = this.riskProfileQuestionnaire.RPQuestionaire.jsonFinal.length;
    const form: { [key: string]: FormControl } = {};
    for(let i = 1; i <= totalQuestions; i++) {
      const controlName: string = "q" + i.toString();
      form[controlName] = new FormControl('', Validators.required);
    }
    this.riskProfileForm = this.fb.group(form);
    this.transformNdPopulateAnswers();
    this.enableToEmitFormValueChanges();
    if(totalQuestions && totalQuestions != 0)
      this.riskProfileFormChange.emit(this.riskProfileForm);
  }

  transformNdPopulateAnswers(): void {
    let i = 1;
    this.riskProfileQuestionnaire.RPQuestionaire.jsonFinal.forEach((question: RPQ) => {
      if(question?.additional === 'P') {
        question.answer_options?.forEach((option: AnswerOption) => {
          option.answer_desc = new RpPortfolioQuestionOptionBolderPipe().transform(option.answer_desc);
          this.answers.push(option.answer_desc);
        });
      }
      if(question.previous_answer_selected && question.previous_answer_selected.length != 0) {
        const selectedAnswer = question.previous_answer_selected[0];
        const controlName = 'q'+i.toString();

        this.riskProfileForm?.get(controlName)?.setValue(selectedAnswer);
        if(question?.additional === 'P') {
          this.selectedValue = this.answers[(question.previous_answer_selected[0] - 1)];
        }
      }
      i++;
    });
  }

  getSelectedAnswer(qNo: number): number {
    return this.riskProfileForm?.get('q'+qNo.toString())?.value as number;
  }

  getPortfolioImage(qNo: number): string {
    const selectedAnswer = this.getSelectedAnswer(qNo);
    return 'assets/images/rpq-chart-'+selectedAnswer.toString()+'.svg';
  }

  enableToEmitFormValueChanges(): void {
    this.riskProfileForm.valueChanges.subscribe(() => {
      this.riskProfileFormChange.emit(this.riskProfileForm);
    });
  }

  activeSelectedValue(data: number): void {
    this.selectedValue = this.answers[data - 1];
  }
}
