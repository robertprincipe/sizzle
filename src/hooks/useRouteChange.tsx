import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function useRouteChange(onChange: Function) {
  const location = useLocation();

  useEffect(() => {
    onChange();
  }, [location, onChange]);
}

export default useRouteChange;
