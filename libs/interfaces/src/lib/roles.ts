export enum ROLES {
  HOLDER = 'holder',
  ISSUER = 'issuer',
  VERIFICATOR = 'verificator',
}

export const AUTHORITY_ROLES = [ROLES.ISSUER, ROLES.VERIFICATOR]
export const ALL_ROLES = Object.values(ROLES)

export const hasRoleIssuer = (roles: ROLES[]) => roles.includes(ROLES.ISSUER)
export const hasRoleHolder = (roles: ROLES[]) => roles.includes(ROLES.HOLDER)
export const hasRoleVerificator = (roles: ROLES[]) => roles.includes(ROLES.VERIFICATOR)
