const ROLE = {
    ADMIN: "ADMIN",
    GENERAL: "GENERAL",
} as const;

export type RoleType = typeof ROLE[keyof typeof ROLE];

export default ROLE;
