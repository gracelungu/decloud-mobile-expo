export const getInitials = (name: string): string => {
  const names = name ? name?.split(" ") : [];
  const initials = names.map((name) => name[0]).join("");
  return initials;
};
