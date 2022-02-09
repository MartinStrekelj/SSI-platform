import { MenuOptions, IMenuCategory } from '@ssi-ms/interfaces'
import { Plus, Layout, PlusSquare, Search, FileText } from 'react-feather'

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
        href: '/dashboard/issue',
        icon: Plus,
      },
      {
        title: 'Issued credentials',
        href: '/dashboard/credentials',
        icon: Search,
      },
      {
        title: 'Issue credentials with import',
        href: 'dashboard/issue/import',
        icon: FileText,
      },
    ],
  },
  {
    category: 'Credential templates',
    color: 'orange',
    items: [
      {
        title: 'Create new template',
        href: '/dashboard/template/new',
        icon: PlusSquare,
      },
      {
        title: 'All templates',
        href: '/dashboard/template/all',
        icon: Layout,
      },
    ],
  },
]

/**
 * CREDENTIAL MANAGEMENT
 */
const CREDENTIAL_MANAGEMENT_CATEGORIES: IMenuCategory[] = []

/**
 * CREDENTIAL VERIFICATION
 */
const CREDENTIAL_VERIFICATION_CATEGORIES: IMenuCategory[] = []

export const MENU_ITEMS: Record<MenuOptions, IMenuCategory[]> = {
  credential_management: CREDENTIAL_GENERATION_CATEGORIES,
  credentil_generation: CREDENTIAL_MANAGEMENT_CATEGORIES,
  credential_verification: CREDENTIAL_VERIFICATION_CATEGORIES,
}

// To get the specific menu: eg. MENU_ITEMS[MenuOptions.CREDENTIAL_GENERATION];
