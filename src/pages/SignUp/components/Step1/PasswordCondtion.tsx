import {
  CheckboxBlankIcon,
  CheckboxErrorIcon,
  CheckboxFillIcon,
} from "@assets/svg";

interface PasswordConditionProps {
  conditionMet: boolean;
  conditionText: string;
  password: string;
}

const PasswordCondition: React.FC<PasswordConditionProps> = ({
  conditionMet,
  conditionText,
  password,
}) => {
  return (
    <div className="flex items-center gap-[6px]">
      {password ? (
        conditionMet ? (
          <CheckboxFillIcon />
        ) : (
          <CheckboxErrorIcon />
        )
      ) : (
        <CheckboxBlankIcon />
      )}
      <span
        className={`${password ? (conditionMet ? "text-success-700" : "text-error") : "text-body3"}`}
      >
        {conditionText}
      </span>
    </div>
  );
};

export default PasswordCondition;
