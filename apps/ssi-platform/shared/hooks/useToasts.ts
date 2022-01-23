import { useToast } from '@chakra-ui/react';

const TOAST_DURATION = 4000;
const CLOSABLE = true;
const TOAST_POSITION = 'top-right';

interface IToastInterface {
  title?: string;
  description?: string;
}

export const useToasts = () => {
  const t = useToast();

  const dangerToast = ({
    title = 'Error',
    description = 'Something went wrong!',
  }: IToastInterface) =>
    t({
      title,
      description,
      status: 'error',
      duration: TOAST_DURATION,
      isClosable: CLOSABLE,
      position: TOAST_POSITION,
    });

  const successToast = ({
    title = 'Success',
    description = 'Action completed succesfully',
  }: IToastInterface) =>
    t({
      title,
      description,
      status: 'success',
      duration: TOAST_DURATION,
      isClosable: CLOSABLE,
      position: TOAST_POSITION,
    });

  const warningToast = ({
    title = 'Warning',
    description = 'Something is not right',
  }: IToastInterface) =>
    t({
      title,
      description,
      status: 'warning',
      duration: TOAST_DURATION,
      isClosable: CLOSABLE,
      position: TOAST_POSITION,
    });

  const infoToast = ({
    title = 'Info',
    description = 'For more information please contact me admin',
  }: IToastInterface) =>
    t({
      title,
      description,
      status: 'info',
      duration: TOAST_DURATION,
      isClosable: CLOSABLE,
      position: TOAST_POSITION,
    });

  return { successToast, warningToast, infoToast, dangerToast };
};
