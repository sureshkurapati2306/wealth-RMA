//Root Feature NgModules
export * from './lib/mint-office-feature-login/mint-office-feature-login.module';

//Shared component NgModules that we have to use as HTML tags or to inherit styling
export * from './lib/mint-office-ui-loading-indicator/mint-office-ui-loading-indicator.module';
export * from './lib/mint-office-ui-dialog/mint-office-ui-dialog.module';
export * from './lib/mint-office-table/mint-office-table.module';
export *  from './lib/core/core.module';

//Shared components that we have to use in TS files
export * from './lib/mint-office-ui-dialog/dialog-message/dialog-message.component';
export * from './lib/mint-office-ui-dialog/dialog-prompt-comment/dialog-prompt-comment.component';
export * from './lib/mint-office-ui-dialog/logout-dialog/logout-dialog.component';
export * from './lib/mint-office-ui-dialog/dialog-alert/dialog-alert.component';
export *  from './lib/mint-office-ui-dialog/fund-error-dialog/fund-error-dialog.component';


//Shared Table
export * from './lib/mint-office-table/application-status-table/application-status-table.component';
export * from './lib/mint-office-table/customer-holding/customer-holding.component';

//Shared NgRx states
export * as loadingBarActions from './lib/mint-office-ui-loading-indicator/loading-bar/+state';
export * as MintOfficeSelectors from './lib/core/+state/mint-office.selectors';
export * as MintOfficeActions from './lib/core/+state/mint-office.actions';


export * from './lib/core/+state/mint-office.reducer';
export * as AuthActions from './lib/mint-office-feature-login/+state/auth.actions';
export * as authSelectors from './lib/mint-office-feature-login/+state/auth.selectors';

// URLS
export * from './lib/core/constants/api-url';

//Interfaces
export * from './lib/core/models/environment.model';
export * from './lib/core/models/transaction-route-data.model';
export * from './lib/core/models/customer.model';
export * from './lib/mint-office-table/models/customer-holding.model';
export * from './lib/mint-office-table/models/application-status.model';

// Services
export * from './lib/core/services/core.service';
export * from './lib/core/services/storage.service';
export * from './lib/core/services/logout.service';

// Resolvers
export * from './lib/core/resolvers/index';

// Mock
export * from './lib/core/mock/data/customer-mock-data';
