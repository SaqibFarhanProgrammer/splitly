"use client"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface ProfileContextType {
  isUploadImageShow: boolean;
  setisUploadImageShow: Dispatch<SetStateAction<boolean>>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: ReactNode }) => {
  const [isUploadImageShow, setisUploadImageShow] = useState(false);

  const value = {
    isUploadImageShow,
    setisUploadImageShow,
  };

  return (
    <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>
  );
};

export const useProfileContext = () => {
  const context = useContext(ProfileContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
