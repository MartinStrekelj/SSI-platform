// Navigation configuration

// Main menu componets
export enum MenuOptions {
  CREDENTIAL_GENERATION = 'credential_generation',
  CREDENTIAL_MANAGEMENT = 'credential_management',
  CREDENTIAL_VERIFICATION = 'credential_verification',
}

// Card categories
export interface IMenuCategory {
  category: string // eg issue credentials
  color: string // color of badge before category name
  items: INavItem[] // all of subitems - issue credential | edit credentials
}

// Cards
export interface INavItem {
  href: string // Link to page for action
  icon: any // small icon on top of card
  title: string // title for action
}
