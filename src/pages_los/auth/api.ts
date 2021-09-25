import { AuthSDK } from "registry/fns/auth";
import { AuthStateType } from "./type";

export const veirfyUsername = async (username: any) => {
  const { data, status } = await AuthSDK.internalFetcher(
    `./los/employee/verify`,
    {
      body: JSON.stringify({
        request_data: {
          userId: username,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data?.error_data };
  }
};

export const verifyPasswordAndLogin = async (
  transactionId,
  username,
  password
) => {
  const { data, status } = await AuthSDK.internalFetcher(
    `./los/employee/login`,
    {
      body: JSON.stringify({
        request_data: {
          transactionId: transactionId,
          password: password,
          userId: username,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return {
      status,
      data: transformAuthData(data?.response_data),
    };
  } else {
    return { status, data: data?.error_data };
  }
};

export const verifyToken = async (token) => {
  const { data, status } = await AuthSDK.internalFetcher(
    `./los/employee/token/verify`,
    {
      body: JSON.stringify({
        request_data: {
          tokenID: token,
        },
        channel: "W",
      }),
    }
  );
  if (status === "success") {
    return { status, data: data?.response_data };
  } else {
    return { status, data: data instanceof Error ? data : data?.error_data };
  }
};

const transformAuthData = (data: any): AuthStateType => {
  return {
    token: data?.token?.access_token,
    tokenType: data?.token?.token_type,
    role: data?.roleCode,
    roleName: data?.roleName,
    branchAccess: {}, //transformRoles(data?.roleDetails),
    isLoggedIn: false,
    user: {
      branch: data?.user?.baseBranchName,
      branchCode: data?.user?.baseBranchCode,
      lastLogin: data?.user?.lastLoginDate,
      type: data?.user?.flag,
      firstName: data?.user?.firstName,
      lastName: data?.user?.lastName,
      middleName: data?.user?.middleName,
      id: data?.userID,
    },
  };
};

const transformRoles = (data: any[]) => {
  let result = data.reduce((prev, current) => {
    let products = current.accessCategory as any[];
    products.reduce((prev, current) => {
      return (prev[current.categoryCode] = current.categoryName);
    }, {});

    return (prev[current?.branchCode] = { ...current, products });
  }, {});
  return result;
};
