import CompaniesRepository from "@/repositories/company/CompanyRepository";
import AccountingService from "@/services/accounting/AccountingService";

const getCompanyDataBySiren = async (siren) => {
  const companyData1 = await CompaniesRepository.getCompanyDataBySiren(siren);
  console.log("companyData1-a", companyData1);
  const companyData2 = AccountingService.accountingTransformation1(
    companyData1
  );
  console.log("companyData2-b", companyData2);
  return companyData2;
};

export default {
  getCompanyDataBySiren,
};
