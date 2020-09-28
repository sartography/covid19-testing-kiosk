import {formatDate} from '@angular/common';

export const createQrCodeValue = (barCode: string, initials: string, dateCreated: Date, locationId: string): string => {
  const valArray = [
    barCode,
    initials,
    formatDate(dateCreated, 'yyyyMMddHHmm', 'en-us'),
    locationId,
  ];
  return valArray.join('-');
};