"use client";
import Button from "@/components/Button";
import Input from "@/components/Input";
import useAuthStore from "@/store/AuthStore";
import LoaderSpinner from "@/tools/LoaderSpinner";
import SuccessAuthMessage from "@/tools/SuccessAuthMessage";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
const page = () => {
  const router = useRouter();
  const { checkResetPasswordPage, isLoadingAuth, isCheckingPage, resetPassowrd, error } = useAuthStore();
  const params = useParams();
  const resettoken: string = params.resettoken as string;
  const [curStatus, setCurStatus] = useState<boolean>(false);
  const [isThePage, setIsThePage] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>('');
  const [errorNewPassword, setErrorNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [errorConfirmPassword, setErrorConfirmPassword] = useState<string>('');
  const validate = () => {
    let valid = true;
    if (!newPassword) {
      setErrorNewPassword("Password is required");
      valid = false;
    } else if (newPassword.length < 6) {
      setErrorNewPassword("Password must be at least 6 characters");
      valid = false;
    } else {
      setErrorNewPassword("");
    }
    if (!confirmPassword) {
      setErrorConfirmPassword("Confirm password is required");
      valid = false;
    } else if (newPassword !== confirmPassword) {
      setErrorConfirmPassword("Passwords do not match");
      valid = false;
    } else {
      setErrorConfirmPassword("");
    }
    return valid;
  };
  const onConfirm = async () => {
    if (!validate()) return;
    const status: boolean = await resetPassowrd(newPassword, confirmPassword, resettoken);
    status === true ? setCurStatus(true) : setCurStatus(false);
  }
  const checkPage = async () => {
    const status: boolean = await checkResetPasswordPage(resettoken);
    if (status === false) {
      setIsThePage(false);
      router.replace('/404');
    }
  }
  useEffect(() => {
    checkPage();
  }, []);
  if (isCheckingPage) {
    return (
      <LoaderSpinner />
    );
  }
  if (!isThePage) {
    return null;
  }
  if (curStatus) {
    return (
      <SuccessAuthMessage
        title="THE PASSWORD HAS BEEN CHANGED"
        paragraph="Return back to auth page, your password has been changed"
      />
    );
  }
  return (
    <div className="w-screen min-h-screen flex items-center justify-center">
      <div className="flex flex-col gap-5 bg-[#090909] border-[0.3px] border-white/20 p-5 rounded-xl">
        <h1 className="text-start text-3xl font-semibold tracking-tighter bg-gradient-to-b from-neutral-50 via-neutral-300 to-neutral-700 bg-clip-text text-transparent">
          <span>Reset Your</span>
          <span> Password</span>
        </h1>
        <Input
          type="password"
          setValue={setNewPassword}
          value={newPassword}
          errorState={errorNewPassword}
          setErrorState={setErrorNewPassword}
          isPassword={true}
          placeholder="Your new password"
        />
        <Input
          type="password"
          setValue={setConfirmPassword}
          value={confirmPassword}
          errorState={errorConfirmPassword}
          setErrorState={setErrorConfirmPassword}
          isPassword={true}
          placeholder="Confirm new password"
        />
        <Button title="Confirm" onClick={onConfirm} isLoading={isLoadingAuth} />
        {
          error &&
          <p className="text-red-500 text-xs font-light">{error}</p>
        }
      </div>
    </div>
  );
};
export default page;