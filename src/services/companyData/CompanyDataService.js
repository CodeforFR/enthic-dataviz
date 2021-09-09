import CompaniesRepository from "@/repositories/company/CompanyRepository";
// import CompaniesRepository from "@/repositories/company/CompanyRepository.fake";
import AccountingService from "@/services/accounting/AccountingService";

const getCompanyDataBySiren = async (siren) => {
  const companyData1 = await CompaniesRepository.getCompanyDataBySiren(siren);
  const companyData2 = AccountingService.addAccountingCalculations(
    companyData1
  );
  return companyData2;
};

export default {
  getCompanyDataBySiren,
};
