import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  DEFAULT_COUNTDOWN_SECONDS,
  getTimerSeconds,
} from "../utils/timerConfig.js";

const TimerContext = createContext({
  startCountdown: null,
  isActive: false,
  timeLeft: null,
});

export function useTimer() {
  return useContext(TimerContext);
}

export function TimerOverlay({ className = "" }) {
  const { isActive, timeLeft } = useTimer();
  if (!isActive || timeLeft == null) return null;

  return (
    <div
      className={`absolute inset-0 z-20 flex items-center justify-center bg-black/70 text-white text-7xl font-semibold ${className}`}
    >
      {Math.max(timeLeft, 0)}
    </div>
  );
}

export default function TimerProvider({
  children,
  defaultSeconds = getTimerSeconds(),
}) {
  const [timeLeft, setTimeLeft] = useState(null);
  const [isActive, setIsActive] = useState(false);
  const pendingActionRef = useRef(null);
  const timeoutRef = useRef(null);

  const clearCountdownTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  useEffect(() => () => clearCountdownTimeout(), []);

  useEffect(() => {
    if (!isActive || timeLeft == null) return;

    if (timeLeft <= 0) {
      clearCountdownTimeout();
      setIsActive(false);
      setTimeLeft(null);
      const action = pendingActionRef.current;
      pendingActionRef.current = null;
      if (typeof action === "function") action();
      return;
    }

    clearCountdownTimeout();
    timeoutRef.current = setTimeout(() => {
      setTimeLeft((prev) => (prev != null ? prev - 1 : prev));
    }, 1000);

    return () => clearCountdownTimeout();
  }, [isActive, timeLeft]);

  const startCountdown = (action, seconds = defaultSeconds) => {
    if (typeof action !== "function") return;
    clearCountdownTimeout();
    pendingActionRef.current = action;
    setTimeLeft(seconds);
    setIsActive(true);
  };

  const contextValue = useMemo(
    () => ({
      startCountdown,
      isActive,
      timeLeft,
    }),
    [isActive, timeLeft]
  );

  return (
    <TimerContext.Provider value={contextValue}>
      {children}
    </TimerContext.Provider>
  );
}
