import {
  Fragment,
  useState,
  useCallback,
  FC,
  useEffect,
  useContext,
} from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import Checkbox from "@material-ui/core/Checkbox";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import { ClearCacheContext, queryClient } from "cache";
import { TextField } from "components/styledComponent/textfield";
import { SelectRenderOnly } from "components/common/select";
import { SelectWithoutOptions } from "components/common/select/render2";
import * as API from "./api";
import { useQuery } from "react-query";
import { ListItemSelection } from "./listItem";
import { ShowWhen } from "./showWhen";
import { initCap } from "./utils";
import { Alert } from "components/common/alert";
import {
  BRANCH_ROLES,
  REGION_ROLES,
  ZONE_ROLES,
  COUNTRY_ROLES,
  BRANCH_MANAGER,
  VERTICALHEAD_ROLES,
  COORDINATOR_ROLES,
  BIUS,
  BDM,
  BDE,
  BDEDIRECT,
} from "pages_los/roles";
import { isValid } from "date-fns";

export const UserForm: FC<any> = ({
  initialValues = {},
  disabled = false,
  mode = "new",
  onSubmit = () => "",
  children,
  childrenAtBottom = false,
}) => {
  const removeCache = useContext(ClearCacheContext);
  const addEntry = removeCache?.addEntry;
  const [data, setData] = useState<any>(initialValues);
  const [error, setError] = useState<any>({});
  const [serverError, setServerError] = useState<string>("");
  const [touched, setTouched] = useState(false);
  const [entityType, setEntityType] = useState("");
  const [changePasswordOnNextLogin, setChangePasswordOnNextLogin] =
    useState(true);
  const [useDefaultPassword, setUseDefaultPassword] = useState(true);
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const handleVisibility = useCallback(() => {
    setPasswordVisibility((old) => !old);
  }, [setPasswordVisibility]);

  let role = data?.role;
  let base = data?.base;

  useEffect(() => {
    addEntry("getCompaniesInfo");
    addEntry("getRoles");
    return () => {
      queryClient.removeQueries("getUsers");
    };
  }, [addEntry]);

  const isCompanySelected =
    Boolean(data?.company ?? "") && data?.company !== "00";

  const branch = useQuery<any, any, any>("getBranches", API.getBranches, {
    cacheTime: 0,
  });
  const region = useQuery<any, any, any>("getRegion", API.getRegion, {
    cacheTime: 0,
  });
  const zone = useQuery<any, any, any>("getZone", API.getZone, {
    cacheTime: 0,
  });
  const country = useQuery<any, any, any>("getCountry", API.getCountry, {
    cacheTime: 0,
  });
  const cooridnator = useQuery<any, any, any>(
    ["getCoordinator", { role, base, entityType }],
    //@ts-ignore
    API.getCoordinator,
    {
      cacheTime: 0,
    }
  );

  const products = useQuery<any, any, any>(
    ["getProducts", { company: data?.company, role }],
    API.getProducts(data?.company, role),
    {
      enabled: isCompanySelected,
      cacheTime: 0,
    }
  );

  useEffect(() => {
    const baseName =
      BRANCH_ROLES.indexOf(role ?? Infinity) >= 0
        ? "branch"
        : REGION_ROLES.indexOf(role ?? Infinity) >= 0
        ? "region"
        : ZONE_ROLES.indexOf(role ?? Infinity) >= 0
        ? "zone"
        : COUNTRY_ROLES.indexOf(role ?? Infinity) >= 0
        ? "country"
        : "";
    setEntityType(baseName);
  }, [role]);

  const handleChange = useCallback((e) => {
    if (e.target.name === "role") {
      setData((old) => ({
        ...old,
        base: "",
        entity: [],
        product: [],
        coordinator: "",
        [e.target.name]: e.target.value,
      }));
    }
    if (e.target.name === "base") {
      setData((old) => ({
        ...old,
        entity: [e.target.value],
        [e.target.name]: e.target.value,
      }));
    } else {
      setData((old) => ({
        ...old,
        [e.target.name]: e.target.value,
      }));
    }
  }, []);

  const isFormValid = () => {
    let error = {};
    let { company, user, role, base, product, entity, newPassword } = data;
    if (!Boolean(company) || company === "00") {
      error["company"] = "It is a required field";
    }
    if (!Boolean(user) || user === "00") {
      error["user"] = "It is a required field";
    }
    if (!Boolean(role) || user === "00") {
      error["role"] = "It is a required field";
    }
    if (Boolean(entityType) && (!Boolean(base) || base === "00")) {
      error["base"] = "It is a required field";
    }
    if (
      Boolean(entityType) &&
      [BRANCH_MANAGER, ...BIUS, ...COORDINATOR_ROLES].indexOf(role) < 0 &&
      (!Array.isArray(product) || product.length <= 0)
    ) {
      error["product"] = "Select Atleast one product";
    }
    if (
      Boolean(entityType) &&
      !baseLoading &&
      COORDINATOR_ROLES.indexOf(role) < 0 &&
      !Array.isArray(entity) &&
      entity.length <= 0
    ) {
      error["entity"] = "Select Atlest one item";
    }
    if (useDefaultPassword === false && !Boolean(newPassword)) {
      error["newPassword"] = "Password cannot be empty";
    }
    setError(error);
    if (Object.keys(error).length > 0) {
      return false;
    }
    return true;
  };
  const entityOptions =
    entityType === "branch"
      ? branch.data
      : entityType === "region"
      ? region.data
      : entityType === "zone"
      ? zone.data
      : entityType === "country"
      ? country.data
      : [];
  let entityLabel = "";
  switch (entityType) {
    case "branch":
      entityLabel = "Branches";
      break;
    case "region":
      entityLabel = "Regions";
      break;
    case "zone":
      entityLabel = "Zones";
      break;
    case "country":
      entityLabel = "Countries";
      break;
    default:
      entityLabel = "";
      break;
  }

  const baseLoading =
    branch.isLoading ||
    branch.isFetching ||
    region.isLoading ||
    region.isFetching ||
    zone.isLoading ||
    zone.isFetching ||
    country.isLoading ||
    country.isFetching;

  const handleSubmit = () => {
    setTouched(true);
    let result = isFormValid();
    if (result) {
      if (mode === "new") {
        onSubmit(
          {
            ...data,
            useDefaultPassword,
            changePasswordOnNextLogin,
            entityType: entityType.substr(0, 1).toUpperCase(),
          },
          setServerError
        );
      } else {
        let { newPassword, ...others } = data;
        onSubmit(
          {
            ...others,
            entityType: entityType.substr(0, 1).toUpperCase(),
          },
          setServerError
        );
      }
    }
  };
  return (
    <Fragment>
      <AppBar position="relative" color="secondary">
        <Toolbar
          variant="dense"
          style={{ width: "100%", display: "flex", flexDirection: "row" }}
        >
          <Typography variant="h5">User Creation</Typography>
          <div style={{ flexGrow: 1 }} />

          {!childrenAtBottom
            ? typeof children === "function"
              ? children({ handleSubmit })
              : children
            : null}
        </Toolbar>
      </AppBar>
      {Boolean(serverError) ? (
        <Alert
          errorMsg={serverError ?? "unknown error occured"}
          errorDetail=""
          severity="error"
        />
      ) : null}
      <Container>
        <div style={{ height: "16px" }} />
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={4} key="company">
            <SelectRenderOnly
              name="company"
              options={API.getCompaniesInfo}
              _optionsKey="getCompaniesInfo"
              handleChange={handleChange}
              label="Company"
              fullWidth
              defaultValue="00"
              value={data?.company ?? ""}
              selectVariant="regular"
              defaultOptionLabel="Select Company"
              disabled={disabled}
              required
              touched={touched}
              error={error?.company ?? ""}
              readOnly={mode !== "new" ? true : false}
              handleBlur={isFormValid}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} key="user">
            {mode === "new" ? (
              <SelectRenderOnly
                name="user"
                options={API.getUsers}
                _optionsKey="getUsers"
                handleChange={handleChange}
                label="Username"
                fullWidth
                defaultValue="00"
                value={data?.user ?? ""}
                selectVariant="regular"
                defaultOptionLabel="Select User"
                disabled={disabled}
                required
                touched={touched}
                error={error?.user ?? ""}
                readOnly={mode !== "new" ? true : false}
                handleBlur={isFormValid}
              />
            ) : (
              <TextField
                name="username"
                value={data?.userName}
                label="Username"
                inputProps={{
                  readOnly: true,
                  tabIndex: -1,
                }}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                disabled={disabled}
              />
            )}
          </Grid>
          <Grid item xs={12} sm={12} md={4} key="role">
            <SelectRenderOnly
              name="role"
              options={API.getRoles}
              _optionsKey="getRoles"
              handleChange={handleChange}
              label="Role"
              fullWidth
              defaultValue="00"
              value={data?.role ?? ""}
              selectVariant="regular"
              defaultOptionLabel="Select Role"
              disabled={disabled}
              required
              touched={touched}
              error={error?.role ?? ""}
              readOnly={mode !== "new" ? true : false}
              handleBlur={isFormValid}
            />
          </Grid>
          <ShowWhen condition={Boolean(entityType)}>
            <Grid item xs={4}>
              <SelectWithoutOptions
                key={entityType}
                name="base"
                options={entityOptions ?? []}
                handleChange={handleChange}
                defaultOptionLabel={`Select ${initCap(entityType)}`}
                disabled={disabled}
                value={data?.base ?? ""}
                selectVariant="regular"
                label={`Base ${initCap(entityType)}`}
                loadingOptions={baseLoading}
                fullWidth
                touched={touched}
                error={error?.base ?? ""}
                required
                readOnly={mode !== "new" ? true : false}
                handleBlur={isFormValid}
              />
            </Grid>
          </ShowWhen>
          <ShowWhen
            condition={
              Boolean(entityType) &&
              VERTICALHEAD_ROLES.indexOf(role) >= 0 &&
              Boolean(base)
            }
          >
            <Grid item xs={4}>
              <SelectWithoutOptions
                key={`${entityType}-${role}`}
                name="coordinator"
                options={cooridnator.data ?? []}
                handleChange={handleChange}
                handleBlur={isValid}
                defaultOptionLabel={`Select ${initCap(
                  entityType
                )} Co-ordinator`}
                disabled={disabled}
                value={data?.coordinator ?? ""}
                selectVariant="regular"
                label={`${initCap(entityType)} Co-ordinator`}
                loadingOptions={cooridnator.isLoading || cooridnator.isFetching}
                fullWidth
                touched={touched}
                error={error?.coordinator ?? ""}
              />
            </Grid>
          </ShowWhen>
        </Grid>
        <br />
        <br />
        <Divider />
        <br />
        <br />
        <Grid container spacing={2}>
          <ShowWhen
            condition={
              Boolean(entityType) &&
              [BRANCH_MANAGER, ...BIUS, ...COORDINATOR_ROLES].indexOf(role) < 0
            }
          >
            <Grid item xs={4}>
              <ListItemSelection
                name="product"
                options={products.data ?? []}
                handleChange={handleChange}
                disabled={disabled}
                value={data?.product ?? []}
                label={`Select Products`}
                loading={products?.isLoading || products.isFetching}
                onlySingleSelect={
                  [BDEDIRECT, BDE, BDM].indexOf(role) >= 0 ? true : false
                }
                touched={touched}
                error={error?.product ?? ""}
              />
            </Grid>
          </ShowWhen>
          <ShowWhen
            condition={
              Boolean(entityType) &&
              !baseLoading &&
              COORDINATOR_ROLES.indexOf(role) < 0
            }
          >
            <Grid item xs={4}>
              <ListItemSelection
                name="entity"
                options={entityOptions}
                handleChange={handleChange}
                disabled={disabled}
                value={data?.entity ?? []}
                label={`Select ${entityLabel}`}
                loading={baseLoading}
                disableSelectionFor={data?.base}
                error={error?.entity ?? ""}
                touched={touched}
              />
            </Grid>
          </ShowWhen>
        </Grid>
        <br />
        <br />
        <Divider />
        <ShowWhen condition={mode === "new"}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={useDefaultPassword}
                      onChange={() => setUseDefaultPassword((old) => !old)}
                      name="useDefaultPassword"
                      disabled={disabled}
                    />
                  }
                  label="Use Default Password"
                />
                {!useDefaultPassword ? (
                  <TextField
                    type={passwordVisibility ? "text" : "password"}
                    name="newPassword"
                    label="New Password"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                    onBlur={isFormValid}
                    value={data?.newPassword ?? ""}
                    error={Boolean(error?.newPassword)}
                    helperText={error?.newPassword ?? ""}
                    disabled={disabled}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleVisibility}
                            edge="end"
                            tabIndex={-1}
                          >
                            {passwordVisibility ? (
                              <Visibility />
                            ) : (
                              <VisibilityOff />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ width: "30%" }}
                    required
                  />
                ) : null}
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={changePasswordOnNextLogin}
                      onChange={() =>
                        setChangePasswordOnNextLogin((old) => !old)
                      }
                      name="askUserToChangePassword"
                      disabled={disabled}
                    />
                  }
                  label="Require User to change password at first Sign-In"
                />
              </div>
            </Grid>
          </Grid>
        </ShowWhen>
        <br />
        <br />
      </Container>
      {childrenAtBottom ? (
        <Toolbar variant="dense">
          <div style={{ flexGrow: 1 }} />
          {typeof children === "function"
            ? children({ handleSubmit })
            : children}
        </Toolbar>
      ) : null}
    </Fragment>
  );
};
