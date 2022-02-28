import { createContext, useContext, useEffect, useState } from "react";
import { getProfilesForCompany } from "../../../services/profile";

const PendingForApprovalContext = createContext();
const usePendingForApprovalContext = () => useContext(PendingForApprovalContext);
const PendingForApprovalContextProvider = ({ children }) => {
  const [allMembers, setAllMembers] = useState([]);
  const fetchDataPendingForApproval = async () => {
    try {
      const listProfilesForCompany = await getProfilesForCompany();
      setAllMembers(listProfilesForCompany.data);
    } catch (error) {
      return;
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    fetchDataPendingForApproval();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <PendingForApprovalContext.Provider value={{ allMembers, setAllMembers, fetchDataPendingForApproval }}>
      {children}
    </PendingForApprovalContext.Provider>
  );
};

export { PendingForApprovalContextProvider, PendingForApprovalContext, usePendingForApprovalContext };
