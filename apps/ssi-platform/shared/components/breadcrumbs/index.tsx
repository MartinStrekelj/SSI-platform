import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { capitalize } from 'lodash';
import Link from 'next/link';
import React, { useMemo } from 'react';

interface BreadcrumbsProps {
  pathname: string;
}

export const Breadcrumbs = ({ pathname }: BreadcrumbsProps) => {
  const breadcrumbs = useMemo(() => handlePathname(pathname), [pathname]);
  return (
    <Breadcrumb>
      {breadcrumbs.map((b: string, i: number) => (
        <BreadcrumbItem isCurrentPage={i === b.length - 1} key={b}>
          <Link href={b}>
            <BreadcrumbLink href={b}>{handleTitle(b)}</BreadcrumbLink>
          </Link>
        </BreadcrumbItem>
      ))}
    </Breadcrumb>
  );
};

const handlePathname: (pathname: string) => string[] = (pathname: string) => {
  const splitted = pathname.trim().slice(1).split('/');
  const breacrumbs = [];
  splitted.reduce((acc: string, item: string) => {
    const value = `${acc}/${item}`;
    breacrumbs.push(value);
    return value;
  }, '');
  return breacrumbs;
};

const handleTitle: (title: string) => string = (title) => {
  const splitted = title.split('/');
  const value = splitted[splitted.length - 1];
  return capitalize(value);
};
