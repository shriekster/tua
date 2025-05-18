import strings from "../content/ui.json";

const content = (path: string): string => {
  return (
    path.split(".").reduce((obj, key) => obj?.[key], strings as any) || path
  );
};

export default content;
