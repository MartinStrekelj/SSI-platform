import React, { useState } from 'react'
import { FAB, Portal } from 'react-native-paper'

interface IFloatingMenuProps {
  onOpenScannerClick: () => void
  onCreateVPClick: () => void
  onWalletInformationClick: () => void
  visible: boolean
}

export const FloatingMenu = ({
  onOpenScannerClick,
  onCreateVPClick,
  onWalletInformationClick,
  visible = false,
}: IFloatingMenuProps) => {
  const [expanded, setExpanded] = useState<boolean>(false)
  const handleMenuClick = (callback: () => void) => {
    setExpanded(false)
    callback()
  }

  return (
    <Portal>
      <FAB.Group
        visible={visible}
        open={expanded}
        icon={expanded ? 'menu-open' : 'menu'}
        actions={[
          {
            icon: 'qrcode-scan',
            label: 'Open scanner',
            onPress: () => handleMenuClick(onOpenScannerClick),
            small: false,
          },
          {
            icon: 'card-account-details-star',
            label: 'Create presentation',
            onPress: () => handleMenuClick(onCreateVPClick),
            small: false,
          },
          {
            icon: 'wallet',
            label: 'Wallet information',
            onPress: () => handleMenuClick(onWalletInformationClick),
            small: false,
          },
        ]}
        onStateChange={() => setExpanded(!expanded)}
      />
    </Portal>
  )
}
