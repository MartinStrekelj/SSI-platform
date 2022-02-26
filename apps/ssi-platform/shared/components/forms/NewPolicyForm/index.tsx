import { FormControl, FormHelperText, FormLabel, Input, VStack } from '@chakra-ui/react'
import { IIdentity } from '@ssi-ms/interfaces'
import { useDashboardContext } from 'apps/ssi-platform/shared/lib/DashboardContext'
import { useFormik } from 'formik'
import React from 'react'
import { ClaimsFormModule } from '../modules/Claims'
import { FormActions } from '../modules/FormActions'
import FormBody from '../modules/FormBody'

/**
 * Information we need
 * Verifier (auto completed)
 * Issuer
 * Claims requested
 * Domain where this will be used
 */

interface INewPolicyProps {
  verifier: IIdentity
  isSubmitting?: boolean
}

export const NewPolicyForm = ({ verifier, isSubmitting }: INewPolicyProps) => {
  const formik = useFormik({
    initialValues: {
      verifier: verifier.metadata.alias,
      issuer: '',
      domain: '',
      claims: [],
    },
    onSubmit: (values) => console.log(values),
  })
  return (
    <form onSubmit={formik.handleSubmit}>
      <FormBody>
        <FormControl>
          <FormLabel htmlFor="verifier">Verifier</FormLabel>
          <Input
            onChange={formik.handleChange}
            disabled
            id="verifier"
            type="text"
            value={formik.values.verifier}
            name="verifier"
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl>
          <FormLabel htmlFor="email">Issuer</FormLabel>
          <Input onChange={formik.handleChange} id="email" type="text" value={formik.values.issuer} name="issuer" />
          <FormHelperText>Specify if claims have to be issued by a specific issuer</FormHelperText>
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Domain</FormLabel>
          <Input onChange={formik.handleChange} id="email" type="text" value={formik.values.domain} name="domain" />
          <FormHelperText>Domain of the page you intend to put the verification policy</FormHelperText>
        </FormControl>
        <ClaimsFormModule formik={formik} />

        <FormActions
          handleReset={formik.resetForm}
          isSubmitting={false}
          submitLabel={'Create new verification policy'}
        />
      </FormBody>
    </form>
  )
}
