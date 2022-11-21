export const previewText = ({
  text,
  length,
}: {
  text: string;
  length: number;
}) => {
  return text.substring(0, length) + " ...";
};
