import { Routes, Route } from "react-router-dom";
import { UserManagementWrapper } from "./userManagement";
import { AssignPincodeToBranch } from "./assignPincodeToBranch";
import { BankConfigWrapper } from "./bankConfig";
import { BankMasterWrapper } from "./bankMaster";
import {
  RegionMasterWrapper,
  ZoneMasterWrapper,
  CountryMasterWrapper,
} from "./masters";

export const Config = () => (
  <Routes>
    <Route path="bankMaster" element={<BankMasterWrapper />} />
    <Route path="banks" element={<BankConfigWrapper />} />
    <Route path="userManagement/*" element={<UserManagementWrapper />} />
    <Route path="assignPincode" element={<AssignPincodeToBranch />} />
    <Route path="region/*" element={<RegionMasterWrapper />} />
    <Route path="zone/*" element={<ZoneMasterWrapper />} />
    <Route path="country/*" element={<CountryMasterWrapper />} />
  </Routes>
);
