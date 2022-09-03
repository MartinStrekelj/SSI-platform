import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import { ICredentialRequestInput } from '@veramo/selective-disclosure'

import t, { themeBox } from '../../theme'
import { COMPARISON_TYPE, ISingleDisclosureDTO } from '@ssi-ms/interfaces'
import { handleSDRRequest } from '../../Veramo/handleSDRMessage'
import { ActivityIndicator, Avatar, Button, Colors, Divider, Headline, Subheading } from 'react-native-paper'
import { ErrorComponent } from '../Error'
import { BoxWidget } from '../widgets/BoxWidget'
import { useSDRContext } from '../../lib/SDRResponseContext'
import SdrModal from '../modals/SdrModal'
import { displayComparisonType } from '@ssi-ms/utils'

interface ISDRequestViewProps {
  sdrDTO: ISingleDisclosureDTO
}

type ISDRData = ISingleDisclosureDTO & {
  claims: ICredentialRequestInput[]
}

const HEADERS = ['Title', 'Type', 'Value']

const textEmphasis = [t.fontSansBoldItalic, t.textXl]

const SDRequestView = ({ sdrDTO }: ISDRequestViewProps) => {
  const [data, setData] = useState<ISDRData | undefined>(undefined)
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isSubmitting, setSubmitting] = useState<boolean>(false)
  const [modalOpen, setModal] = useState<boolean>(false)

  const { onSubmitRequest, verifiableData, response } = useSDRContext()

  const widgetValues = useMemo(() => {
    if (!data) {
      return [[]]
    }

    return data.claims.map((claim) => [
      claim.claimType,
      displayComparisonType(claim.reason as COMPARISON_TYPE),
      JSON.parse(claim.claimValue),
    ])
  }, [data])

  useEffect(() => {
    const handleSDR = async (dto: ISingleDisclosureDTO) => {
      setLoading(true)
      const decoded = await handleSDRRequest(dto.sdr)
      // @ts-ignore
      setData({ ...dto, claims: decoded.data.claims })
      setLoading(false)
    }
    handleSDR(sdrDTO)
  }, [sdrDTO])

  const handleSubmitCredential = async () => {
    setSubmitting(true)
    await onSubmitRequest(sdrDTO.id)
    setSubmitting(false)
  }

  const handleToggleModal = () => setModal(!modalOpen)

  if (isLoading) {
    return <ActivityIndicator color={Colors.white} />
  }

  if (!data) {
    return <ErrorComponent />
  }

  if (response !== null) {
    return <VerifyResponseComponent response={response} />
  }

  const hasSelectedSomething = verifiableData.length >= 1

  const text = hasSelectedSomething
    ? `You have selected ${verifiableData.length} credentials to submit for verification.`
    : 'To prove the claims you can provide saved credentials and/or presentations'

  return (
    <>
      <ScrollView style={themeBox}>
        <View>
          <Headline style={[t.mB4, t.fontSans, t.textCenter, t.uppercase]}>Verification request</Headline>
          <Divider />
          <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.pB5]}>
            <Avatar.Icon icon="shield-key-outline" size={84} />
          </View>
          <Subheading style={[t.textCenter]}>
            <Text style={textEmphasis}>{data.metadata.verifier}</Text> wants you to provide:{'\n'}
            <Text style={textEmphasis}>{data.metadata.title}</Text>
          </Subheading>
        </View>
        <ScrollView>
          <View style={[t.mY4]}>
            <BoxWidget head={HEADERS} body={widgetValues} title={'Requested claims'} />
          </View>

          <Subheading style={[t.textCenter, t.pB2, t.fontSans]}>{text}</Subheading>

          {hasSelectedSomething && (
            <Button
              loading={isSubmitting}
              icon={'send'}
              mode="contained"
              style={[t.p1, t.mB4]}
              onPress={handleSubmitCredential}
            >
              Submit
            </Button>
          )}

          <Button
            disabled={isSubmitting}
            icon={'wallet-plus'}
            mode={hasSelectedSomething ? 'text' : 'contained'}
            style={[t.p1, t.mB4]}
            onPress={handleToggleModal}
          >
            Select credentials
          </Button>
        </ScrollView>
        <SdrModal open={modalOpen} toggleModal={handleToggleModal} />
      </ScrollView>
    </>
  )
}

const VerifyResponseComponent = ({ response }) => {
  const title = response ? 'Success' : 'Rejected'
  const text = response ? 'You can now confirm the process in the browser' : ''

  return (
    <View style={[t.justifyCenter, t.itemsCenter, t.hFull, t.bgWhite, t.rounded]}>
      <Headline style={[t.mB4, t.fontSansBold, t.textCenter]}>{title}</Headline>
      <Divider />
      <View style={[t.flex, t.justifyCenter, t.itemsCenter, t.pB5]}>
        <Avatar.Icon
          style={{ backgroundColor: response ? Colors.green500 : Colors.red500 }}
          icon={response ? 'check' : 'close-octagon'}
          color={Colors.white}
          size={128}
        />
        <Subheading style={[t.textCenter, t.p8]}>
          <Text style={textEmphasis}>{text}</Text>
        </Subheading>
      </View>
    </View>
  )
}

export default SDRequestView
