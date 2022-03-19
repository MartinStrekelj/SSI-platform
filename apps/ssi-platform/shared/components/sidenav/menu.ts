import { MenuOptions, IMenuCategory } from '@ssi-ms/interfaces'
import { Plus, Trello, PenTool, Framer, Box } from 'react-feather'

/**
 * CREDENTIAL GENERATION
 */
const CREDENTIAL_GENERATION_CATEGORIES: IMenuCategory[] = [
  {
    category: 'Issue credentials',
    color: 'green',
    items: [
      {
        title: 'Issue new credential',
        href: '/dashboard/issue/new',
        icon: Plus,
      },
      {
        title: 'Issue credential from schema',
        href: '/dashboard/issue/schema',
        icon: Box,
      },
    ],
  },
  {
    category: 'Credential schemas',
    color: 'orange',
    items: [
      {
        title: 'Create new schema',
        href: '/dashboard/schema/new',
        icon: Framer,
      },
      // {
      //   title: 'All templates',
      //   href: '/dashboard/template/all',
      //   icon: Layout,
      // },
    ],
  },
]

/**
 * CREDENTIAL MANAGEMENT
 */
const CREDENTIAL_MANAGEMENT_CATEGORIES: IMenuCategory[] = [
  {
    category: 'Manage credentials',
    color: 'blue',
    items: [
      {
        title: 'List of credentials',
        href: '/dashboard/credentials',
        icon: Trello,
      },
    ],
  },
]

/**
 * CREDENTIAL VERIFICATION
 */
const CREDENTIAL_VERIFICATION_CATEGORIES: IMenuCategory[] = [
  {
    category: 'Credential verification',
    color: 'red',
    items: [
      {
        title: 'Create new verification policy',
        href: '/dashboard/verification/new',
        icon: PenTool,
      },
      // {
      //   title: 'All verification policies',
      //   href: '/dashboard/verification/list',
      //   icon: List,
      // },
    ],
  },
]

export const MENU_ITEMS: Record<MenuOptions, IMenuCategory[]> = {
  credential_management: CREDENTIAL_GENERATION_CATEGORIES,
  credentil_generation: CREDENTIAL_MANAGEMENT_CATEGORIES,
  credential_verification: CREDENTIAL_VERIFICATION_CATEGORIES,
}

// To get the specific menu: eg. MENU_ITEMS[MenuOptions.CREDENTIAL_GENERATION];
