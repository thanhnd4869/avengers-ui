import { APP_NAME } from "@constants/app";

export function Component() {
  return <h1 className="display-1 fw-bold m-0">{APP_NAME}</h1>;
}

Component.displayName = "HomePage";
