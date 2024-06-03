import { Timer } from "@/navigation/type";
import { useEffect, useState } from "react";

const useCountdown = (targetDate: string): Timer => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  const days = Math.floor(countDown / (1000 * 60 * 60 * 24)) | 0;
  const hours =
    Math.floor((countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) | 0;
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60)) | 0;
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000) | 0;

  return { days, hours, minutes, seconds };
};

export default useCountdown;
