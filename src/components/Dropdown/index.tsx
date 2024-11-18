import { ArrowDownIcon } from "@assets/svgs";
import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { Dispatch, SetStateAction } from "react";

interface DropdownProps {
  width: number;
  options: string[];
  selectedOption: string;
  setSelectedOption: Dispatch<SetStateAction<string>>;
}

const Dropdown: React.FC<DropdownProps> = ({
  width,
  options,
  selectedOption,
  setSelectedOption,
}) => {
  const selectOption = (option: string) => {
    setSelectedOption(option);
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ArrowDownIcon className="fill-neutral-700" />}
        className="border-1 border-neutral-200 py-2 pl-3 pr-2 text-left text-sm font-semibold text-title"
        sx={{
          bg: "white",
        }}
        _hover={{ bg: "#f5f5f5" }}
        _expanded={{ bg: "#f5f5f5" }}
      >
        {selectedOption}
      </MenuButton>
      <MenuList
        minW="0"
        w={width}
        sx={{
          boxShadow: "2px 2px 20px 0px rgba(0, 49, 110, 0.15)",
          border: "none",
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            px={4}
            onClick={() => selectOption(option)}
            className="font-medium"
          >
            {option}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default Dropdown;
