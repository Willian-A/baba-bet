import * as Select from "@radix-ui/react-select";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { EventInputOption } from "../_types/event";

interface SelectProps {
  options: EventInputOption[];
  placeholder: string;
  onChange: (value: string) => void;
}

export function SelectInput({ options, placeholder, onChange }: SelectProps) {
  return (
    <Select.Root onValueChange={onChange}>
      <Select.Trigger className="flex justify-between py-1 px-2 border border-background-800 rounded-md w-full max-w-[300px]">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <KeyboardArrowDownRoundedIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          className="py-1 px-2 mt-1 bg-background-800 rounded-md responsive-select"
          position="popper"
        >
          <Select.Viewport>
            <Select.Group>
              {options.map((option, index) => {
                return (
                  <Select.Item
                    key={index}
                    value={option.value}
                    className="flex flex-row items-center justify-between"
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator>
                      <CheckRoundedIcon fontSize="small" />
                    </Select.ItemIndicator>
                  </Select.Item>
                );
              })}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
