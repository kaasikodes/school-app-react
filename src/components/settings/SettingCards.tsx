import SettingsCard, { ISettingCardProps } from "./SettingsCard";

interface IProps {
  items: ISettingCardProps[];
}

const SettingCards = ({ items }: IProps) => {
  return (
    <div className=" mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <SettingsCard {...item} />
      ))}
    </div>
  );
};

export default SettingCards;
