import { createReducer, on } from '@ngrx/store';
import { orderSummaryInitState } from '../mock/order-summary-state.mock';
import * as OrderSummaryApplicationAction from './order-summary.actions';

export const ORDER_SUMMARY_FEATURE_KEY = 'orderSummaryState';

export const orderSummaryReducer = createReducer(
  orderSummaryInitState,
  on(OrderSummaryApplicationAction.getOrderSummaryDataSuccess, (state, action) => {
    return {
      ...state,
      orderSummary: {
        approvalLinkStatus: action.data.approvalLinkStatus,
        customerApprovalStatus: action.data.customerApprovalStatus,
        approvalLinkUrl: action.data.approvalLinkUrl,
        cif: action.data.cif,
        approvalStatus: action.data.approvalStatus,
        createdOn: action.data.createdOn,
        settlementAccount: action.data.settlementAccount,
        investmentAccount: action.data.investmentAccount,
        productType: action.data.productType,
        applicationId: action.data.applicationId,
        acknowledgement: action.data.acknowledgement,
        referral: action.data.referral,
        remark: action.data.remark,
        salesBranch: action.data.salesBranch,
        salesChargeDiscountApprover: action.data.salesChargeDiscountApprover,
        staffBranch: action.data.staffBranch,
        totalIndicativeAmount: action.data.totalIndicativeAmount,
        totalInvestmentAmount: action.data.totalInvestmentAmount,
        totalSalesCharge: action.data.totalSalesCharge,
        transactionType: action.data.transactionType,
        custRemark: action.data.custRemark,
        approvalRemark: action.data.approvalRemark,
        subscriberDtoList:action.data.subscriberDtoList,
        rpExpiry: action.data.rpExpiry,
        rpqApprovalStatus: action.data.rpqApprovalStatus
      }
    }
  }),

  on(OrderSummaryApplicationAction.orderActivatedApprovalLinkSuccess, (state, action) => {
    return {
      ...state,
      orderSummary: {
        approvalLinkStatus: action.data.approvalLinkUrl.length > 0 ? 'A' : 'I',
        customerApprovalStatus: state?.orderSummary?.customerApprovalStatus,
        approvalLinkUrl: action.data.approvalLinkUrl,
        cif: state?.orderSummary?.cif,
        approvalStatus: state?.orderSummary?.approvalStatus,
        rpExpiry: state?.orderSummary?.rpExpiry,
        rpqApprovalStatus: state?.orderSummary?.rpqApprovalStatus,
      }
    }
  }),

  on(OrderSummaryApplicationAction.sendingRemainderSuccess, (state, action) => {
    return {
      ...state,
      sendRemainder: action.data
    }
  })
)