import {
  FormControl,
  Link,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Period } from "../../types";

export const periods = [
  "today",
  "yesterday",
  "lastSevenDays",
  "thisMonth",
] as const;

const StyledAppBar = styled(MuiAppBar)`
  padding: 12px 30px;
  flex-direction: row;
`;

export type AppBarProps = {
  title: string;
};

const isPeriod = (period: string | null): period is Period => {
  return periods.includes(period as Period);
};

export const AppBar = ({ title }: AppBarProps) => {
  const [selectedPeriod, setSelectedPeriod] = useState<Period>("today");

  const navigate = useNavigate();
  const location = useLocation();

  const handleOnChange = (event: SelectChangeEvent<string>) => {
    const newPeriod = isPeriod(event.target.value)
      ? event.target.value
      : "today";
    setSelectedPeriod(newPeriod);
    const searchParams = new URLSearchParams(location.search);
    searchParams.set("period", newPeriod);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const newPeriod = searchParams.get("period");
    const safePeriod = isPeriod(newPeriod) ? newPeriod : "today";
    searchParams.set("period", safePeriod);
    setSelectedPeriod(safePeriod);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  }, []);

  return (
    <StyledAppBar>
      <Link
        href="/"
        variant="h6"
        color="inherit"
        noWrap
        sx={{ flexGrow: 1, alignSelf: "center" }}
        underline="none"
      >
        {title}
      </Link>
      <FormControl variant="outlined">
        <Select
          id="period-select"
          value={selectedPeriod}
          onChange={handleOnChange}
          sx={{
            color: "inherit",
            borderColor: "red.500",
            "& .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "white",
            },
            "& .MuiSvgIcon-root": {
              color: "white",
            },
          }}
        >
          <MenuItem value="today" data-testid="option-today">
            Today
          </MenuItem>
          <MenuItem value="yesterday" data-testid="option-yesterday">
            Yesterday
          </MenuItem>
          <MenuItem value="lastSevenDays" data-testid="option-lastSevenDays">
            Last 7 days
          </MenuItem>
          <MenuItem value="thisMonth" data-testid="option-thisMonth">
            This month
          </MenuItem>
        </Select>
      </FormControl>
    </StyledAppBar>
  );
};
